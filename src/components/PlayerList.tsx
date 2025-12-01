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
            <div className="text-center text-[#5c5b57] py-12 bg-[#010a13]/80 rounded border border-[#3c3c41] border-dashed">
                <p className="text-lg font-medium uppercase tracking-wider">등록된 플레이어가 없습니다</p>
                <p className="text-sm mt-2">소환사를 추가하여 내전을 시작하세요</p>
            </div>
        );
    }

    return (
        <div className="bg-[#010a13]/90 border border-[#c8aa6e] relative group">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c8aa6e] -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c8aa6e] translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c8aa6e] -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c8aa6e] translate-x-1 translate-y-1" />

            <div className="px-6 py-4 bg-[#0a1428] border-b border-[#c8aa6e]/30 flex justify-between items-center">
                <h3 className="font-bold text-[#f0e6d2] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c8aa6e] rotate-45" />
                    참가자 ({players.length})
                </h3>
                <span className="text-xs text-[#a09b8c] uppercase tracking-wide">5v5 내전을 위해 최소 10명이 필요합니다</span>
            </div>
            <div className="divide-y divide-[#1e282d] max-h-[400px] overflow-y-auto custom-scrollbar">
                {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#c8aa6e]/5 transition-colors group/item">
                        <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rotate-45 ${getTierColor(player.tier)} shadow-[0_0_8px_currentColor]`} />
                            <div>
                                <p className="font-bold text-[#f0e6d2] group-hover/item:text-[#c8aa6e] transition-colors">
                                    {player.name} <span className="text-[#5c5b57] text-xs">#{player.tagline}</span>
                                </p>
                                <p className="text-xs text-[#a09b8c] uppercase tracking-wide">{player.tier} {player.division} • {player.position}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onRemovePlayer(player.id)}
                            className="text-[#5c5b57] hover:text-[#c83c3c] transition-colors p-2 rounded hover:bg-[#c83c3c]/10"
                        >
                            <Trash2 size={18} />
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
