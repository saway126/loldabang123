
import type { Player, BalanceMode, Tier, Division } from '../utils/balancer';

// Shared types (frontend version)
export interface AccountDto {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export interface SummonerDto {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

export interface LeagueEntryDto {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
}

export interface FullSummonerData {
    account: AccountDto;
    summoner: SummonerDto;
    leagueEntries: LeagueEntryDto[];
    updatedAt: number;
}

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

export const serverClient = {
    fetchSummoner: async (gameName: string, tagLine: string) => {
        const response = await fetch('/api/summoners/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ players: [{ name: gameName, tag: tagLine }] })
        });

        if (!response.ok) throw new Error('Failed to fetch summoner');
        const data: FullSummonerData[] = await response.json();
        if (data.length === 0) throw new Error('Summoner not found');
        
        const fullData = data[0];
        
        // Process rank similar to old getPlayerStats
        const entries = fullData.leagueEntries;
        const soloRank = entries.find(e => e.queueType === 'RANKED_SOLO_5x5');
        const flexRank = entries.find(e => e.queueType === 'RANKED_FLEX_SR');
        const bestRank = soloRank || flexRank;

        return {
            name: fullData.account.gameName,
            tagline: fullData.account.tagLine,
            tier: bestRank ? normalizeTier(bestRank.tier) : 'Unranked' as Tier,
            division: bestRank ? parseInt(bestRank.rank.replace('I', '1').replace('II', '2').replace('III', '3').replace('IV', '4')) as Division : 4 as Division,
            lp: bestRank ? bestRank.leaguePoints : 0
        };
    },

    makeTeams: async (players: Player[], mode: BalanceMode) => {
        const response = await fetch('/api/teams/make', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ players, mode })
        });

        if (!response.ok) throw new Error('Failed to balance teams');
        return await response.json() as { team1: Player[], team2: Player[] };
    }
};
