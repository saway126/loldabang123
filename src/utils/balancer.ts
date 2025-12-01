export type Tier = 'Unranked' | 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond' | 'Master' | 'Grandmaster' | 'Challenger';

export interface Player {
    id: string;
    name: string;
    tier: Tier;
    position: string; // 'Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'
}

const TIER_WEIGHTS: Record<Tier, number> = {
    'Unranked': 0,
    'Iron': 1,
    'Bronze': 2,
    'Silver': 3,
    'Gold': 4,
    'Platinum': 5,
    'Emerald': 6,
    'Diamond': 7,
    'Master': 8,
    'Grandmaster': 9,
    'Challenger': 10,
};

export const balanceTeams = (players: Player[]): [Player[], Player[]] => {
    // Sort players by weight descending
    const sortedPlayers = [...players].sort((a, b) => TIER_WEIGHTS[b.tier] - TIER_WEIGHTS[a.tier]);

    const team1: Player[] = [];
    const team2: Player[] = [];
    let team1Score = 0;
    let team2Score = 0;

    // Snake draft / Greedy balance
    sortedPlayers.forEach((player) => {
        if (team1.length < 5 && (team2.length >= 5 || team1Score <= team2Score)) {
            team1.push(player);
            team1Score += TIER_WEIGHTS[player.tier];
        } else {
            team2.push(player);
            team2Score += TIER_WEIGHTS[player.tier];
        }
    });

    return [team1, team2];
};

export const calculateTeamScore = (team: Player[]): number => {
    return team.reduce((acc, player) => acc + TIER_WEIGHTS[player.tier], 0);
};
