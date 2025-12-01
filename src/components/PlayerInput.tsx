import React, { useState } from 'react';
import type { Tier } from '../utils/balancer';
import { Plus } from 'lucide-react';

interface PlayerInputProps {
    onAddPlayer: (name: string, tier: Tier, position: string) => void;
}

const TIERS: Tier[] = ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'];
const POSITIONS = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'];

export const PlayerInput: React.FC<PlayerInputProps> = ({ onAddPlayer }) => {
    const [name, setName] = useState('');
    const [tier, setTier] = useState<Tier>('Silver');
    const [position, setPosition] = useState('Fill');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddPlayer(name, tier, position);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 bg-[#010a13]/90 p-6 border border-[#c8aa6e] items-end relative before:absolute before:inset-0 before:border before:border-[#c8aa6e] before:m-1 before:pointer-events-none">
            <div className="flex-1 w-full relative z-10">
                <label className="block text-xs font-bold text-[#c8aa6e] mb-2 uppercase tracking-wider">Summoner Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0a1428] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] px-4 py-2.5 outline-none transition-colors placeholder-[#5c5b57]"
                    placeholder="Hide on bush"
                />
            </div>

            <div className="w-full md:w-48 relative z-10">
                <label className="block text-xs font-bold text-[#c8aa6e] mb-2 uppercase tracking-wider">Tier</label>
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

            <div className="w-full md:w-40 relative z-10">
                <label className="block text-xs font-bold text-[#c8aa6e] mb-2 uppercase tracking-wider">Position</label>
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

            <button
                type="submit"
                className="w-full md:w-auto bg-[#1e2328] hover:bg-[#1e282d] text-[#cdbe91] border-2 border-[#c8aa6e] font-bold py-2.5 px-8 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_10px_rgba(200,170,110,0.3)] hover:text-[#f0e6d2] relative z-10 uppercase tracking-wider"
            >
                <Plus size={18} />
                Add
            </button>
        </form>
    );
};
