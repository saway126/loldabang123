import React from 'react';
import type { Player, Tier } from '../utils/balancer';
import { X, UserPlus, HelpCircle, AlertCircle, Users } from 'lucide-react';

interface SidebarProps {
    players: Player[];
    onRemovePlayer: (id: string) => void;
    onOpenAddModal: () => void;
    onAutoFill: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ players, onRemovePlayer, onOpenAddModal, onAutoFill }) => {
    return (
        <div className="w-[300px] bg-[#010a13] border-l border-[#3c3c41] flex flex-col h-full absolute right-0 top-0 z-20 shadow-2xl">
            {/* User Profile Section (Mock) */}
            <div className="p-6 border-b border-[#1e2328] flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1e2328] border-2 border-[#c8aa6e] mb-3 relative overflow-hidden">
                    <img src="https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/29.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[#f0e6d2] font-bold text-sm">kks1234</h3>
                <p className="text-[#a09b8c] text-xs mt-1">즐거운 내전 되세요 :)</p>

                <button className="mt-4 px-4 py-1.5 border border-[#5c5b57] rounded text-[11px] text-[#a09b8c] hover:text-[#f0e6d2] hover:border-[#c8aa6e] transition-colors uppercase tracking-wider">
                    로그아웃
                </button>
            </div>

            {/* Action Buttons */}
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

            {/* Footer Actions */}
            <div className="p-4 border-t border-[#1e2328] grid grid-cols-3 gap-2">
                <button className="col-span-1 bg-[#1e2328] text-[#5c5b57] text-[10px] py-2 border border-[#3c3c41] hover:text-[#cdbe91] hover:border-[#c8aa6e] transition-colors rounded">문의 등록</button>
                <button className="col-span-1 bg-[#1e2328] text-[#5c5b57] text-[10px] py-2 border border-[#3c3c41] hover:text-[#cdbe91] hover:border-[#c8aa6e] transition-colors rounded">회원 탈퇴</button>
                <button className="col-span-1 bg-[#1e2328] text-[#5c5b57] text-[10px] py-2 border border-[#3c3c41] hover:text-[#cdbe91] hover:border-[#c8aa6e] transition-colors rounded">공지 사항</button>
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
