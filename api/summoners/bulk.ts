
import type { VercelRequest, VercelResponse } from '../_types.js';
import { RiotService } from '../_services/riotService.js';
import { CacheService } from '../_services/cacheService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const players = req.body.players as Array<{ name: string; tag: string }>;
    if (!players || !Array.isArray(players)) {
        return res.status(400).json({ error: 'Invalid body. Expected { players: [{name, tag}] }' });
    }

    if (!process.env.RIOT_API_KEY && !process.env.VITE_RIOT_API_KEY) {
        console.error('[bulk] Missing RIOT_API_KEY. Set in .env.local or Vercel env.');
        return res.status(500).json({ error: 'Server missing RIOT_API_KEY. Configure env.' });
    }

    try {
        const results = await Promise.all(players.map(async (p) => {
            // 1. Check Cache
            const cached = await CacheService.getSummoner(p.name, p.tag);
            if (cached) return cached;

            // 2. Fetch from Riot
            try {
                const data = await RiotService.getFullSummonerData(p.name, p.tag);
                
                // 3. Save to Cache
                await CacheService.setSummoner(p.name, p.tag, data);
                return data;
            } catch (err) {
                console.error(`Failed to fetch ${p.name}#${p.tag}:`, err);
                return null; // Or handle partial failure
            }
        }));

        res.status(200).json(results.filter(r => r !== null));
    } catch (error) {
        console.error("Bulk fetch error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
