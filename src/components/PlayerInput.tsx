import React, { useState } from 'react';
import { Tier } from '../utils/balancer';
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
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-lg shadow-lg items-end">
            <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-400 mb-1">Summoner Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Hide on bush"
                />
            </div>

            <div className="w-full md:w-40">
                <label className="block text-sm font-medium text-gray-400 mb-1">Tier</label>
                <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as Tier)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                    {TIERS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <div className="w-full md:w-32">
                <label className="block text-sm font-medium text-gray-400 mb-1">Position</label>
                <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                    {POSITIONS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
            >
                <Plus size={20} />
                Add
            </button>
        </form>
    );
};
