
import { Player, BalanceMode, Tier } from '../_types';

const TIER_BASE_SCORES: Record<Tier, number> = {
    'Unranked': 0,
    'Iron': 1,
    'Bronze': 5,
    'Silver': 9,
    'Gold': 13,
    'Platinum': 17,
    'Emerald': 21,
    'Diamond': 25,
    'Master': 29,
    'Grandmaster': 30,
    'Challenger': 31,
};

export class TeamBalancerService {
    static calculatePlayerScore(player: Player): number {
        const base = TIER_BASE_SCORES[player.tier] || 0;
        if (['Master', 'Grandmaster', 'Challenger', 'Unranked'].includes(player.tier)) {
            return base;
        }
        return base + (4 - (player.division || 4));
    }

    static calculateTeamScore(team: Player[]): number {
        return team.reduce((acc, player) => acc + this.calculatePlayerScore(player), 0);
    }

    static balanceTeams(players: Player[], mode: BalanceMode): { team1: Player[], team2: Player[] } {
        if (mode === 'Random') {
            const shuffled = [...players].sort(() => Math.random() - 0.5);
            return { team1: shuffled.slice(0, 5), team2: shuffled.slice(5, 10) };
        }

        if (mode === 'Golden Balance' || mode === 'Balance' || mode === 'Line Balance') {
            // Use Brute Force for best balance (N=10 is small enough)
            return this.balanceBruteForce(players);
        }

        return { team1: players.slice(0, 5), team2: players.slice(5, 10) };
    }

    private static balanceBruteForce(players: Player[]): { team1: Player[], team2: Player[] } {
        const n = players.length;
        const half = Math.floor(n / 2);
        let bestDiff = Infinity;
        let bestTeam1: Player[] = [];
        let bestTeam2: Player[] = [];

        const combine = (start: number, currentTeam: Player[]) => {
            if (currentTeam.length === half) {
                const currentTeamIds = new Set(currentTeam.map(p => p.id));
                const otherTeam = players.filter(p => !currentTeamIds.has(p.id));

                const score1 = this.calculateTeamScore(currentTeam);
                const score2 = this.calculateTeamScore(otherTeam);
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
        return { team1: bestTeam1, team2: bestTeam2 };
    }
}

