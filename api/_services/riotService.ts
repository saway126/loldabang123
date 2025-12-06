
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

export interface FullSummonerData {
    account: AccountDto;
    summoner: SummonerDto;
    leagueEntries: LeagueEntryDto[];
    updatedAt: number;
}

const API_KEY = process.env.RIOT_API_KEY || process.env.VITE_RIOT_API_KEY;

export class RiotService {
    private static getHeaders() {
        if (!API_KEY) {
            console.error('[RiotService] Missing RIOT_API_KEY. Set it in .env.local or Vercel env.');
            throw new Error("RIOT_API_KEY not set");
        }
        return { 'X-Riot-Token': API_KEY };
    }

    static async fetchAccount(gameName: string, tagLine: string): Promise<AccountDto> {
        const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
        const res = await fetch(url, { headers: this.getHeaders() });
        if (!res.ok) throw new Error(`Account fetch failed: ${res.status}`);
        return res.json();
    }

    static async fetchSummoner(puuid: string): Promise<SummonerDto> {
        const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
        const res = await fetch(url, { headers: this.getHeaders() });
        if (!res.ok) throw new Error(`Summoner fetch failed: ${res.status}`);
        return res.json();
    }

    static async fetchLeagueEntries(summonerId: string): Promise<LeagueEntryDto[]> {
        const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
        const res = await fetch(url, { headers: this.getHeaders() });
        if (!res.ok) throw new Error(`League fetch failed: ${res.status}`);
        return res.json();
    }

    static async getFullSummonerData(gameName: string, tagLine: string): Promise<FullSummonerData> {
        const account = await this.fetchAccount(gameName, tagLine);
        const summoner = await this.fetchSummoner(account.puuid);
        const leagueEntries = await this.fetchLeagueEntries(summoner.id);

        return {
            account,
            summoner,
            leagueEntries,
            updatedAt: Date.now()
        };
    }
}
