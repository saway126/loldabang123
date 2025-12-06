import React, { useState } from 'react';
import type { Tier, Division } from '../utils/balancer';
import { Plus, Search, Loader2 } from 'lucide-react';
import { serverClient } from '../services/serverClient';

interface PlayerInputProps {
    onAddPlayer: (name: string, tagline: string, tier: Tier, division: Division | undefined, primaryPosition: string, secondaryPosition?: string) => void;
}

const TIERS: Tier[] = ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'];
const DIVISIONS: Division[] = [1, 2, 3, 4];
const POSITIONS = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'];

export const PlayerInput: React.FC<PlayerInputProps> = ({ onAddPlayer }) => {
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('KR1');
    const [tier, setTier] = useState<Tier>('Silver');
    const [division, setDivision] = useState<Division>(4);
    const [primaryPosition, setPrimaryPosition] = useState('Fill');
    const [secondaryPosition, setSecondaryPosition] = useState('Fill');
    const [isLoading, setIsLoading] = useState(false);

    const showDivision = !['Unranked', 'Master', 'Grandmaster', 'Challenger'].includes(tier);

    const handleSearch = async () => {
        if (!name.trim()) {
            alert('소환사 이름을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            // Updated to use serverClient
            const stats = await serverClient.fetchSummoner(name, tagline);
            
            setName(stats.name);
            setTagline(stats.tagline);
            setTier(stats.tier);
            if (stats.division) {
                setDivision(stats.division);
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
            onAddPlayer(
                name,
                tagline,
                tier,
                showDivision ? division : undefined,
                primaryPosition,
                secondaryPosition
            );
            setName('');
            // Keep other fields for easier entry of similar players
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#010a13]/95 p-6 border border-[#c8aa6e]/60 shadow-xl max-w-[560px] mx-auto w-full">
            {/* Summoner Info */}
            <div className="space-y-2">
                <label className="block text-xs font-bold text-[#c8aa6e] uppercase tracking-wider">소환사 이름 / 태그</label>
                <div className="flex flex-col sm:flex-row gap-2">
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
                        className="w-full sm:w-24 bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-3 py-2.5 outline-none transition-colors placeholder-[#5c5b57] text-center"
                        placeholder="KR1"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-[#1e2328] hover:bg-[#2d3238] text-[#cdbe91] border border-[#3c3c41] hover:border-[#c8aa6e] px-4 py-2.5 rounded flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        title="Riot 정보 불러오기"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Search size={18} /> 불러오기</>}
                    </button>
                </div>
                <p className="text-[#5c5b57] text-[11px]">예: 이름=Hide on bush, 태그=KR1</p>
            </div>

            {/* Tier / Division */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#c8aa6e] uppercase tracking-wider">티어</label>
                    <select
                        value={tier}
                        onChange={(e) => setTier(e.target.value as Tier)}
                        className="w-full bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-4 py-2.5 outline-none transition-colors appearance-none cursor-pointer"
                    >
                        {TIERS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                {showDivision && (
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-[#c8aa6e] uppercase tracking-wider">디비전</label>
                        <select
                            value={division}
                            onChange={(e) => setDivision(Number(e.target.value) as Division)}
                            className="w-full bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-4 py-2.5 outline-none transition-colors appearance-none cursor-pointer"
                        >
                            {DIVISIONS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Positions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#c8aa6e] uppercase tracking-wider">1지망 포지션</label>
                    <select
                        value={primaryPosition}
                        onChange={(e) => setPrimaryPosition(e.target.value)}
                        className="w-full bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-4 py-2.5 outline-none transition-colors appearance-none cursor-pointer"
                    >
                        {POSITIONS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#c8aa6e] uppercase tracking-wider">2지망 포지션</label>
                    <select
                        value={secondaryPosition}
                        onChange={(e) => setSecondaryPosition(e.target.value)}
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
                className="w-full bg-[#1e2328] hover:bg-[#1e282d] text-[#cdbe91] border-2 border-[#c8aa6e] font-bold py-3 px-8 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_10px_rgba(200,170,110,0.3)] hover:text-[#f0e6d2] uppercase tracking-wider"
            >
                <Plus size={18} />
                인원 추가
            </button>
        </form>
    );
};
