import React from 'react';
import type { Player } from '../utils/balancer';
import { Trash2 } from 'lucide-react';

interface PlayerListProps {
    players: Player[];
    onRemovePlayer: (id: string) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({ players, onRemovePlayer }) => {
    if (players.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8 bg-gray-800/50 rounded-lg border border-gray-700 border-dashed">
                No players added yet. Add players to start.
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 py-3 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-gray-200">Roster ({players.length})</h3>
                <span className="text-xs text-gray-500">Min 10 players for 5v5</span>
            </div>
            <div className="divide-y divide-gray-700 max-h-[400px] overflow-y-auto">
                {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-750 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${getTierColor(player.tier)}`} />
                            <div>
                                <p className="font-medium text-gray-200">{player.name}</p>
                                <p className="text-xs text-gray-400">{player.tier} • {player.position}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onRemovePlayer(player.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded hover:bg-gray-700"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const getTierColor = (tier: string) => {
    switch (tier) {
        case 'Challenger': return 'bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.6)]';
        case 'Grandmaster': return 'bg-red-500';
        case 'Master': return 'bg-purple-500';
        case 'Diamond': return 'bg-blue-400';
        case 'Emerald': return 'bg-emerald-400';
        case 'Platinum': return 'bg-cyan-300';
        case 'Gold': return 'bg-yellow-500';
        case 'Silver': return 'bg-gray-400';
        case 'Bronze': return 'bg-orange-600';
        case 'Iron': return 'bg-gray-600';
        default: return 'bg-gray-500';
    }
};
