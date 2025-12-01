import React, { useState } from 'react';
import type { Tier, Division } from '../utils/balancer';
import { Plus, Search, Loader2 } from 'lucide-react';
import { getPlayerStats } from '../services/riotApi';

interface PlayerInputProps {
    onAddPlayer: (name: string, tagline: string, tier: Tier, division: Division | undefined, position: string) => void;
}

const TIERS: Tier[] = ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'];
const DIVISIONS: Division[] = [1, 2, 3, 4];
const POSITIONS = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'];

export const PlayerInput: React.FC<PlayerInputProps> = ({ onAddPlayer }) => {
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('KR1');
    const [tier, setTier] = useState<Tier>('Silver');
    const [division, setDivision] = useState<Division>(4);
    const [position, setPosition] = useState('Fill');
    const [isLoading, setIsLoading] = useState(false);

    const showDivision = !['Unranked', 'Master', 'Grandmaster', 'Challenger'].includes(tier);

    const handleSearch = async () => {
        if (!name.trim()) {
            alert('소환사 이름을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            const stats = await getPlayerStats(name, tagline);
            setName(stats.name);
            setTagline(stats.tagline);
            setTier(stats.tier);
            if (stats.division) {
                setDivision(stats.division as Division);
            }
        } catch (error) {
            console.error(error);
            alert('플레이어 정보를 가져오는데 실패했습니다. 이름과 태그를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddPlayer(name, tagline, tier, showDivision ? division : undefined, position);
            setName('');
            // Keep other fields for easier entry of similar players
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#010a13]/90 p-6 border border-[#c8aa6e] relative before:absolute before:inset-0 before:border before:border-[#c8aa6e] before:m-1 before:pointer-events-none">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-[#c8aa6e] mb-2 uppercase tracking-wider">소환사 이름</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-1 bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-4 py-2.5 outline-none transition-colors placeholder-[#5c5b57]"
                            placeholder="Hide on bush"
                        />
                        <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            className="w-20 bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-2 py-2.5 outline-none transition-colors placeholder-[#5c5b57] text-center"
                            placeholder="#KR1"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="bg-[#1e2328] hover:bg-[#2d3238] text-[#cdbe91] border border-[#3c3c41] hover:border-[#c8aa6e] px-3 rounded flex items-center justify-center transition-all disabled:opacity-50"
                            title="Riot 정보 불러오기"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-48">
                    <label className="block text-xs font-bold text-[#c8aa6e] mb-2 uppercase tracking-wider">티어</label>
                    <div className="flex gap-2">
                        <select
                            value={tier}
                            onChange={(e) => setTier(e.target.value as Tier)}
                            className="flex-1 bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-4 py-2.5 outline-none transition-colors appearance-none cursor-pointer"
                        >
                            {TIERS.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        {showDivision && (
                            <select
                                value={division}
                                onChange={(e) => setDivision(Number(e.target.value) as Division)}
                                className="w-16 bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-2 py-2.5 outline-none transition-colors appearance-none cursor-pointer text-center"
                            >
                                {DIVISIONS.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-40">
                    <label className="block text-xs font-bold text-[#c8aa6e] mb-2 uppercase tracking-wider">주포지션</label>
                    <select
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-4 py-2.5 outline-none transition-colors appearance-none cursor-pointer"
                    >
                        {POSITIONS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-[#1e2328] hover:bg-[#1e282d] text-[#cdbe91] border-2 border-[#c8aa6e] font-bold py-2.5 px-8 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_10px_rgba(200,170,110,0.3)] hover:text-[#f0e6d2] relative z-10 uppercase tracking-wider mt-2"
            >
                <Plus size={18} />
                인원 추가
            </button>
        </form>
    );
};
