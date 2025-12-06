
import type { VercelRequest, VercelResponse, Player, BalanceMode } from '../_types.js';
import { TeamBalancerService } from '../_services/teamBalancer.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { players, mode } = req.body as { players: Player[], mode: BalanceMode };

    if (!players || !Array.isArray(players) || players.length < 2) {
        return res.status(400).json({ error: 'Invalid players list. Need at least 2 players.' });
    }

    try {
        const result = TeamBalancerService.balanceTeams(players, mode || 'Balance');
        res.status(200).json(result);
    } catch (error) {
        console.error("Balancing error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
