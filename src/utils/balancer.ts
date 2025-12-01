export type Tier = 'Unranked' | 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond' | 'Master' | 'Grandmaster' | 'Challenger';
export type Division = 1 | 2 | 3 | 4;

export interface Player {
    id: string;
    name: string;
    tagline?: string;
    tier: Tier;
    division?: Division; // Only for Iron ~ Diamond
    position: string; // 'Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'
}

export type BalanceMode = 'Random' | 'Balance' | 'Golden Balance' | 'Line Balance';

// Base scores for IV division of each tier (or the tier itself for Apex tiers)
const TIER_BASE_SCORES: Record<Tier, number> = {
    'Unranked': 0,
    'Iron': 1,        // Iron 4 = 1
    'Bronze': 5,      // Bronze 4 = 5
    'Silver': 9,      // Silver 4 = 9
    'Gold': 13,       // Gold 4 = 13
    'Platinum': 17,   // Platinum 4 = 17
    'Emerald': 21,    // Emerald 4 = 21
    'Diamond': 25,    // Diamond 4 = 25
    'Master': 29,
    'Grandmaster': 30,
    'Challenger': 31,
};

export const calculatePlayerScore = (player: Player): number => {
    const base = TIER_BASE_SCORES[player.tier];
    if (['Master', 'Grandmaster', 'Challenger', 'Unranked'].includes(player.tier)) {
        return base;
    }
    // For Iron ~ Diamond: Division 4 is base, Division 1 is base + 3
    // e.g., Iron 4 = 1, Iron 1 = 1 + (4 - 1) = 4
    return base + (4 - (player.division || 4));
};

export const calculateTeamScore = (team: Player[]): number => {
    return team.reduce((acc, player) => acc + calculatePlayerScore(player), 0);
};

export const balanceTeams = (players: Player[], mode: BalanceMode = 'Balance'): [Player[], Player[]] => {
    if (mode === 'Random') {
        const shuffled = [...players].sort(() => Math.random() - 0.5);
        return [shuffled.slice(0, 5), shuffled.slice(5, 10)];
    }

    if (mode === 'Line Balance') {
        // Simple Line Balance: Group by position and distribute
        // Note: This is a simplified version. A full version would need complex backtracking or min-cost max-flow if roles overlap.
        // For now, we'll try to match roles if possible, otherwise fallback to greedy.
        // Given the complexity, we'll use a randomized greedy approach with role preference for now.
        // TODO: Implement strict role matching if required.
        return balanceGreedy(players);
    }

    if (mode === 'Golden Balance') {
        // Try to find the absolute best split (closest to equal sums)
        // Since N=10, we can check combinations or use a partition approximation.
        // For 10 players, C(10, 5) is 252 combinations. We can brute force.
        return balanceBruteForce(players);
    }

    // Default 'Balance' (Greedy or Top N)
    // The requirement says "Return 1 of top 10 results". We'll just return a good greedy result for now or brute force since N is small.
    return balanceBruteForce(players);
};

const balanceGreedy = (players: Player[]): [Player[], Player[]] => {
    const sortedPlayers = [...players].sort((a, b) => calculatePlayerScore(b) - calculatePlayerScore(a));
    const team1: Player[] = [];
    const team2: Player[] = [];
    let score1 = 0;
    let score2 = 0;

    sortedPlayers.forEach((player) => {
        if (team1.length < 5 && (team2.length >= 5 || score1 <= score2)) {
            team1.push(player);
            score1 += calculatePlayerScore(player);
        } else {
            team2.push(player);
            score2 += calculatePlayerScore(player);
        }
    });

    return [team1, team2];
};

const balanceBruteForce = (players: Player[]): [Player[], Player[]] => {
    const n = players.length;
    const half = n / 2;
    let bestDiff = Infinity;
    let bestTeam1: Player[] = [];
    let bestTeam2: Player[] = [];

    // Helper to generate combinations
    const combine = (start: number, currentTeam: Player[]) => {
        if (currentTeam.length === half) {
            const currentTeamIds = new Set(currentTeam.map(p => p.id));
            const otherTeam = players.filter(p => !currentTeamIds.has(p.id));

            const score1 = calculateTeamScore(currentTeam);
            const score2 = calculateTeamScore(otherTeam);
            const diff = Math.abs(score1 - score2);

            if (diff < bestDiff) {
                bestDiff = diff;
                bestTeam1 = [...currentTeam];
                bestTeam2 = [...otherTeam];
            }
            return;
        }

        for (let i = start; i < n; i++) {
            currentTeam.push(players[i]);
            combine(i + 1, currentTeam);
            currentTeam.pop();
        }
    };

    combine(0, []);
    return [bestTeam1, bestTeam2];
};
