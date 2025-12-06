
export type VercelRequest = {
    body: any;
    query: Record<string, string | string[] | undefined>;
    method: string;
};

export type VercelResponse = {
    status: (code: number) => VercelResponse;
    json: (body: any) => void;
    send: (body: any) => void;
    setHeader: (name: string, value: string) => void;
};

export type Tier = 'Unranked' | 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond' | 'Master' | 'Grandmaster' | 'Challenger';
export type Division = 1 | 2 | 3 | 4;

export interface Player {
    id: string;
    name: string;
    tagline?: string;
    tier: Tier;
    division?: Division;
    position: string;
    primaryPosition?: string;
    secondaryPosition?: string;
}

export type BalanceMode = 'Random' | 'Balance' | 'Golden Balance' | 'Line Balance';
