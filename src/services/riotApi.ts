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

export const fetchAccount = async (gameName: string, tagLine: string): Promise<AccountDto> => {
    const response = await fetch(`/asia/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch account');
    }
    return response.json();
};

export const fetchSummoner = async (puuid: string): Promise<SummonerDto> => {
    const response = await fetch(`/api/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch summoner');
    }
    return response.json();
};

export const fetchLeagueEntries = async (summonerId: string): Promise<LeagueEntryDto[]> => {
    const response = await fetch(`/api/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch league entries');
    }
    return response.json();
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
