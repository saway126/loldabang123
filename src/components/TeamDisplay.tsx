import React from 'react';
import { type Player, calculateTeamScore } from '../utils/balancer';
import { Copy, Swords } from 'lucide-react';

interface TeamDisplayProps {
    team1: Player[];
    team2: Player[];
}

export const TeamDisplay: React.FC<TeamDisplayProps> = ({ team1, team2 }) => {
    const score1 = calculateTeamScore(team1);
    const score2 = calculateTeamScore(team2);

    const copyToClipboard = () => {
        const text = `
🟦 Team 1 (Score: ${score1})
${team1.map(p => `- ${p.name} (${p.tier}, ${p.position})`).join('\n')}

🟥 Team 2 (Score: ${score2})
${team2.map(p => `- ${p.name} (${p.tier}, ${p.position})`).join('\n')}
    `.trim();
        navigator.clipboard.writeText(text);
        alert('Teams copied to clipboard!');
    };

    if (team1.length === 0) return null;

    return (
        <div className="mt-8 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#c8aa6e]/30 pb-4">
                <h2 className="text-2xl font-bold text-[#f0e6d2] flex items-center gap-2 uppercase tracking-widest" style={{ fontFamily: 'Beaufort, serif' }}>
                    <Swords className="text-[#c8aa6e]" /> Matchup
                </h2>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-xs font-bold bg-[#1e2328] hover:bg-[#1e282d] text-[#cdbe91] border border-[#c8aa6e] px-4 py-2 transition-all hover:text-[#f0e6d2] uppercase tracking-wider"
                >
                    <Copy size={14} /> Copy Teams
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Team 1 - Blue Side */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-900/20 blur-xl group-hover:bg-blue-900/30 transition-all duration-500" />
                    <div className="relative bg-[#010a13]/90 border border-[#0ac8b9] overflow-hidden">
                        <div className="bg-[#0a1428] px-4 py-3 border-b border-[#0ac8b9] flex justify-between items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
                            <h3 className="font-bold text-[#0ac8b9] relative z-10 uppercase tracking-wider">Blue Team</h3>
                            <span className="text-xs font-mono text-blue-200 relative z-10 bg-blue-900/50 px-2 py-1 rounded border border-blue-500/30">Score: {score1}</span>
                        </div>
                        <div className="divide-y divide-[#1e282d]">
                            {team1.map((p) => (
                                <div key={p.id} className="px-4 py-3.5 flex justify-between items-center hover:bg-[#0ac8b9]/10 transition-colors group/item">
                                    <span className="font-medium text-[#f0e6d2] group-hover/item:text-white transition-colors">{p.name}</span>
                                    <span className="text-xs text-[#a09b8c] uppercase tracking-wide">{p.tier} • {p.position}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team 2 - Red Side */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-red-900/20 blur-xl group-hover:bg-red-900/30 transition-all duration-500" />
                    <div className="relative bg-[#010a13]/90 border border-[#c83c3c] overflow-hidden">
                        <div className="bg-[#0a1428] px-4 py-3 border-b border-[#c83c3c] flex justify-between items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
                            <h3 className="font-bold text-[#c83c3c] relative z-10 uppercase tracking-wider">Red Team</h3>
                            <span className="text-xs font-mono text-red-200 relative z-10 bg-red-900/50 px-2 py-1 rounded border border-red-500/30">Score: {score2}</span>
                        </div>
                        <div className="divide-y divide-[#1e282d]">
                            {team2.map((p) => (
                                <div key={p.id} className="px-4 py-3.5 flex justify-between items-center hover:bg-[#c83c3c]/10 transition-colors group/item">
                                    <span className="font-medium text-[#f0e6d2] group-hover/item:text-white transition-colors">{p.name}</span>
                                    <span className="text-xs text-[#a09b8c] uppercase tracking-wide">{p.tier} • {p.position}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
