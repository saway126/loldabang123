import React from 'react';
import type { Player, Tier } from '../utils/balancer';
import { X, UserPlus, AlertCircle, Users } from 'lucide-react';

interface SidebarProps {
    players: Player[];
    onRemovePlayer: (id: string) => void;
    onOpenAddModal: () => void;
    onAutoFill: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ players, onRemovePlayer, onOpenAddModal, onAutoFill }) => {
    return (
        <div className="w-full lg:w-[240px] bg-[#010a13] border-t lg:border-t-0 lg:border-l border-[#3c3c41] flex flex-col h-[400px] lg:h-full lg:min-h-screen flex-shrink-0 lg:shadow-2xl z-20">
            {/* Quick Actions */}
            <div className="p-4 grid grid-cols-2 gap-2 border-b border-[#1e2328]">
                <button
                    onClick={onOpenAddModal}
                    className="bg-[#1e2328] hover:bg-[#2d3238] text-[#cdbe91] border border-[#3c3c41] hover:border-[#c8aa6e] py-2 px-3 rounded flex items-center justify-center gap-2 text-xs font-bold transition-all"
                >
                    <UserPlus size={14} />
                    인원 추가
                </button>
                <button
                    onClick={onAutoFill}
                    className="bg-[#1e2328] hover:bg-[#2d3238] text-[#a09b8c] border border-[#3c3c41] hover:border-[#c8aa6e] py-2 px-3 rounded flex items-center justify-center gap-2 text-xs font-bold transition-all"
                >
                    <Users size={14} />
                    10명 채우기
                </button>
            </div>

            {/* Player List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {players.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-[#5c5b57] space-y-2 opacity-50">
                        <AlertCircle size={32} />
                        <p className="text-xs">등록된 인원이 없습니다.</p>
                    </div>
                ) : (
                    players.map(player => (
                        <div key={player.id} className="group flex items-center justify-between bg-[#1e2328]/50 hover:bg-[#1e2328] p-2 rounded border border-transparent hover:border-[#c8aa6e]/50 transition-all">
                            <div className="flex items-center gap-3">
                                {/* Tier Icon (Mock or Dynamic) */}
                                <div className={`w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-[#3c3c41] relative overflow-hidden`}>
                                    {/* Placeholder for Tier Icon */}
                                    <div className={`w-full h-full bg-gradient-to-br ${getTierColor(player.tier)} opacity-50`} />
                                    <span className="absolute text-[10px] font-bold text-white shadow-black drop-shadow-md">{player.tier[0]}</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[#f0e6d2] text-xs font-bold truncate max-w-[120px]">{player.name}</span>
                                    <span className="text-[#5c5b57] text-[10px] uppercase tracking-wider">{player.tier} {player.division}</span>
                                    <span className="text-[#a09b8c] text-[10px] truncate max-w-[120px]">
                                        {getPositionLabel(player)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => onRemovePlayer(player.id)}
                                className="text-[#5c5b57] hover:text-[#c83c3c] p-1.5 rounded hover:bg-[#c83c3c]/10 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const getTierColor = (tier: Tier) => {
    switch (tier) {
        case 'Iron': return 'from-gray-600 to-gray-800';
        case 'Bronze': return 'from-amber-700 to-amber-900';
        case 'Silver': return 'from-slate-400 to-slate-600';
        case 'Gold': return 'from-yellow-400 to-yellow-600';
        case 'Platinum': return 'from-cyan-400 to-cyan-600';
        case 'Emerald': return 'from-emerald-400 to-emerald-600';
        case 'Diamond': return 'from-blue-400 to-blue-600';
        case 'Master': return 'from-purple-400 to-purple-600';
        case 'Grandmaster': return 'from-red-400 to-red-600';
        case 'Challenger': return 'from-yellow-200 to-blue-400';
        default: return 'from-gray-800 to-black';
    }
};

const getPositionLabel = (player: { primaryPosition?: string; secondaryPosition?: string; position?: string; }) => {
    const primary = player.primaryPosition || player.position || 'Fill';
    const secondary = player.secondaryPosition && player.secondaryPosition !== primary ? ` / ${player.secondaryPosition}` : '';
    return `${primary}${secondary}`;
};
