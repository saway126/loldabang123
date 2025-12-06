
import { type FullSummonerData } from './riotService';

interface CacheEntry {
    data: FullSummonerData;
    expiresAt: number;
}

// In a real environment, use 'ioredis' or '@vercel/kv'
// const redis = new Redis(process.env.REDIS_URL);

const memoryCache = new Map<string, CacheEntry>();

export class CacheService {
    private static TTL = 1000 * 60 * 60 * 24; // 24 Hours

    static async getSummoner(gameName: string, tagLine: string): Promise<FullSummonerData | null> {
        const key = `summoner:${gameName.toLowerCase()}:${tagLine.toLowerCase()}`;
        
        // Simulation of Redis GET
        // const cached = await redis.get(key);
        const entry = memoryCache.get(key);

        if (!entry) return null;
        if (Date.now() > entry.expiresAt) {
            memoryCache.delete(key);
            return null;
        }

        return entry.data;
    }

    static async setSummoner(gameName: string, tagLine: string, data: FullSummonerData): Promise<void> {
        const key = `summoner:${gameName.toLowerCase()}:${tagLine.toLowerCase()}`;
        
        // Simulation of Redis SETEX
        // await redis.set(key, JSON.stringify(data), 'PX', this.TTL);
        
        memoryCache.set(key, {
            data,
            expiresAt: Date.now() + this.TTL
        });
    }
}
