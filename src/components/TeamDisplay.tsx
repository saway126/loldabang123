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
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Swords className="text-red-500" /> Matchup
                </h2>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded transition-colors"
                >
                    <Copy size={16} /> Copy
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Team 1 */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl overflow-hidden">
                    <div className="bg-blue-900/40 px-4 py-3 border-b border-blue-500/30 flex justify-between items-center">
                        <h3 className="font-bold text-blue-100">Team Blue</h3>
                        <span className="text-sm font-mono text-blue-300">Score: {score1}</span>
                    </div>
                    <div className="divide-y divide-blue-500/10">
                        {team1.map((p) => (
                            <div key={p.id} className="px-4 py-3 flex justify-between items-center hover:bg-blue-500/5">
                                <span className="font-medium text-blue-50">{p.name}</span>
                                <span className="text-xs text-blue-300/70">{p.tier} • {p.position}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team 2 */}
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl overflow-hidden">
                    <div className="bg-red-900/40 px-4 py-3 border-b border-red-500/30 flex justify-between items-center">
                        <h3 className="font-bold text-red-100">Team Red</h3>
                        <span className="text-sm font-mono text-red-300">Score: {score2}</span>
                    </div>
                    <div className="divide-y divide-red-500/10">
                        {team2.map((p) => (
                            <div key={p.id} className="px-4 py-3 flex justify-between items-center hover:bg-red-500/5">
                                <span className="font-medium text-red-50">{p.name}</span>
                                <span className="text-xs text-red-300/70">{p.tier} • {p.position}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
