import type { Tier } from '../utils/balancer';

const API_KEY = import.meta.env.VITE_RIOT_API_KEY;

interface AccountDto {
    puuid: string;
    gameName: string;
    tagLine: string;
}

interface SummonerDto {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

interface LeagueEntryDto {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
}

// Mock Data Generators
const getRandomTier = (): string => {
    const tiers = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER'];
    const weights = [5, 15, 25, 25, 15, 10, 4, 1];
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < tiers.length; i++) {
        if (random < weights[i]) return tiers[i];
        random -= weights[i];
    }
    return 'GOLD';
};

const getRandomDivision = (): string => {
    const divisions = ['I', 'II', 'III', 'IV'];
    return divisions[Math.floor(Math.random() * divisions.length)];
};

export const fetchAccount = async (gameName: string, tagLine: string): Promise<AccountDto> => {
    try {
        const response = await fetch(`/asia/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
            headers: { 'X-Riot-Token': API_KEY }
        });
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch (error) {
        console.warn("API Failed, using Mock Data for Account");
        return {
            puuid: `mock-puuid-${Math.random()}`,
            gameName: gameName,
            tagLine: tagLine
        };
    }
};

export const fetchSummoner = async (puuid: string): Promise<SummonerDto> => {
    try {
        const response = await fetch(`/api/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
            headers: { 'X-Riot-Token': API_KEY }
        });
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch (error) {
        console.warn("API Failed, using Mock Data for Summoner");
        return {
            id: `mock-id-${Math.random()}`,
            accountId: `mock-account-${Math.random()}`,
            puuid: puuid,
            name: "Mock Summoner",
            profileIconId: Math.floor(Math.random() * 50),
            revisionDate: Date.now(),
            summonerLevel: Math.floor(Math.random() * 300) + 30
        };
    }
};

export const fetchLeagueEntries = async (summonerId: string): Promise<LeagueEntryDto[]> => {
    try {
        const response = await fetch(`/api/lol/league/v4/entries/by-summoner/${summonerId}`, {
            headers: { 'X-Riot-Token': API_KEY }
        });
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch (error) {
        console.warn("API Failed, using Mock Data for League");
        const tier = getRandomTier();
        return [{
            leagueId: `mock-league-${Math.random()}`,
            summonerId: summonerId,
            summonerName: "Mock Summoner",
            queueType: 'RANKED_SOLO_5x5',
            tier: tier,
            rank: ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(tier) ? 'I' : getRandomDivision(),
            leaguePoints: Math.floor(Math.random() * 100),
            wins: Math.floor(Math.random() * 100),
            losses: Math.floor(Math.random() * 100),
            hotStreak: false,
            veteran: false,
            freshBlood: false,
            inactive: false
        }];
    }
};

export const normalizeTier = (riotTier: string): Tier => {
    switch (riotTier) {
        case 'IRON': return 'Iron';
        case 'BRONZE': return 'Bronze';
        case 'SILVER': return 'Silver';
        case 'GOLD': return 'Gold';
        case 'PLATINUM': return 'Platinum';
        case 'EMERALD': return 'Emerald';
        case 'DIAMOND': return 'Diamond';
        case 'MASTER': return 'Master';
        case 'GRANDMASTER': return 'Grandmaster';
        case 'CHALLENGER': return 'Challenger';
        default: return 'Unranked';
    }
};

export const getPlayerStats = async (gameName: string, tagLine: string) => {
    try {
        const account = await fetchAccount(gameName, tagLine);
        const summoner = await fetchSummoner(account.puuid);
        const entries = await fetchLeagueEntries(summoner.id);

        const soloRank = entries.find(e => e.queueType === 'RANKED_SOLO_5x5');
        const flexRank = entries.find(e => e.queueType === 'RANKED_FLEX_SR');

        // Prioritize Solo Rank, then Flex, then Unranked
        const bestRank = soloRank || flexRank;

        return {
            name: account.gameName,
            tagline: account.tagLine,
            tier: bestRank ? normalizeTier(bestRank.tier) : 'Unranked',
            division: bestRank ? parseInt(bestRank.rank.replace('I', '1').replace('II', '2').replace('III', '3').replace('IV', '4')) : 4,
            lp: bestRank ? bestRank.leaguePoints : 0
        };
    } catch (error) {
        console.error("Error fetching player stats:", error);
        throw error;
    }
};
