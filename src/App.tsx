import { useState } from 'react';
import { type Player, type Tier, type Division, type BalanceMode, balanceTeams } from './utils/balancer';
import { PlayerInput } from './components/PlayerInput';
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';
import { LoginPage } from './components/LoginPage';
import { Shuffle, Trash2, Snowflake } from 'lucide-react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [team1, setTeam1] = useState<Player[]>([]);
    const [team2, setTeam2] = useState<Player[]>([]);
    const [balanceMode, setBalanceMode] = useState<BalanceMode>('Balance');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleAddPlayer = (name: string, tagline: string, tier: Tier, division: Division | undefined, position: string) => {
        const newPlayer: Player = {
            id: crypto.randomUUID(),
            name,
            tagline,
            tier,
            division,
            position,
        };
        setPlayers(prev => [...prev, newPlayer]);
    };

    const handleAutoFill = () => {
        const positions = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];
        const tiers: Tier[] = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master'];

        const newPlayers: Player[] = Array.from({ length: 10 }, (_, i) => ({
            id: crypto.randomUUID(),
            name: `Player ${i + 1}`,
            tagline: 'KR1',
            tier: tiers[Math.floor(Math.random() * tiers.length)],
            division: Math.floor(Math.random() * 4 + 1) as Division,
            position: positions[i % 5], // Distribute positions evenly
        }));

        setPlayers(prev => [...prev, ...newPlayers]);
    };

    const handleRemovePlayer = (id: string) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const handleBalance = () => {
        if (players.length < 2) {
            alert('팀을 나누기 위해서는 최소 2명의 플레이어가 필요합니다.');
            return;
        }
        const [t1, t2] = balanceTeams(players, balanceMode);
        setTeam1(t1);
        setTeam2(t2);
    };

    const handleClear = () => {
        if (confirm('모든 플레이어를 삭제하시겠습니까?')) {
            setPlayers([]);
            setTeam1([]);
            setTeam2([]);
        }
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen text-gray-100 font-sans flex overflow-hidden bg-[#091428]">
            {/* Background Image - Freljord Theme */}
            <div
                className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lissandra_0.jpg")' }}
            />

            {/* Snow Effect Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://raw.githubusercontent.com/tsparticles/website/main/public/images/snow.png')] animate-pulse opacity-20" />

            {/* Main Content Area */}
            <div className="flex-1 mr-[300px] h-screen overflow-y-auto custom-scrollbar p-8 relative z-10">

                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <header className="flex justify-between items-end border-b border-[#0ac8b9]/30 pb-6">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#0ac8b9] via-[#e0f3ff] to-[#0ac8b9] drop-shadow-[0_0_10px_rgba(10,200,185,0.5)] uppercase flex items-center gap-3" style={{ fontFamily: 'Beaufort, serif' }}>
                                <Snowflake className="text-[#0ac8b9] animate-spin-slow" size={32} />
                                롤다방 내전 악귀 수용소
                                <Snowflake className="text-[#0ac8b9] animate-spin-slow" size={32} />
                            </h1>
                            <p className="text-[#a09b8c] text-sm font-medium tracking-widest mt-2 uppercase text-[#5c5b57]">
                                Civil War Demon Asylum • Winter Season
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-[#0ac8b9] mb-1 uppercase tracking-wider">Balance Mode</label>
                                <select
                                    value={balanceMode}
                                    onChange={(e) => setBalanceMode(e.target.value as BalanceMode)}
                                    className="bg-[#010a13]/80 border border-[#0ac8b9]/50 text-[#e0f3ff] py-1.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#091428] focus:border-[#0ac8b9] font-bold text-xs min-w-[140px] backdrop-blur-sm"
                                >
                                    <option value="Random">Random</option>
                                    <option value="Balance">Balance</option>
                                    <option value="Golden Balance">Golden Balance</option>
                                    <option value="Line Balance">Line Balance</option>
                                </select>
                            </div>

                            <button
                                onClick={handleClear}
                                className="bg-[#010a13]/80 hover:bg-[#2d1e1e] text-[#5c5b57] hover:text-[#c83c3c] border border-[#3c3c41] hover:border-[#c83c3c] font-bold py-2 px-4 transition-colors flex items-center gap-2 uppercase tracking-wider text-xs rounded backdrop-blur-sm h-[34px] mt-4"
                            >
                                <Trash2 size={14} />
                                Reset
                            </button>
                        </div>
                    </header>

                    {/* Teams Display */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Team 1 */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b-2 border-[#0ac8b9] pb-2">
                                <h2 className="text-2xl font-black text-[#e0f3ff] uppercase tracking-widest drop-shadow-[0_0_5px_rgba(10,200,185,0.8)]">Team 1</h2>
                                <span className="text-[#0ac8b9] font-mono text-xs">BLUE SIDE</span>
                            </div>
                            <div className="space-y-2 min-h-[400px] bg-[#010a13]/40 p-2 rounded border border-[#0ac8b9]/20 backdrop-blur-sm">
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const p = team1[i];
                                    return (
                                        <div key={i} className="h-[72px] bg-[#091428]/60 border border-[#1e2328] flex items-center px-4 relative group hover:border-[#0ac8b9]/50 transition-all">
                                            {p ? (
                                                <>
                                                    <div className="w-10 h-10 rounded-full bg-[#1e2328] border border-[#0ac8b9] mr-4 overflow-hidden shadow-[0_0_10px_rgba(10,200,185,0.3)]">
                                                        <div className="w-full h-full bg-gradient-to-br from-[#0ac8b9] to-[#091428]" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[#e0f3ff] font-bold text-sm">{p.name}</span>
                                                        <span className="text-[#5c5b57] text-xs font-mono uppercase">{p.tier} {p.division}</span>
                                                    </div>
                                                    <div className="absolute right-4 text-[#0ac8b9] text-xs font-bold opacity-70">
                                                        {p.position}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-[#5c5b57] text-sm font-medium italic w-full text-center opacity-30">Empty Slot</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Team 2 */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b-2 border-[#c83c3c] pb-2">
                                <h2 className="text-2xl font-black text-[#e0f3ff] uppercase tracking-widest drop-shadow-[0_0_5px_rgba(200,60,60,0.8)]">Team 2</h2>
                                <span className="text-[#c83c3c] font-mono text-xs">RED SIDE</span>
                            </div>
                            <div className="space-y-2 min-h-[400px] bg-[#010a13]/40 p-2 rounded border border-[#c83c3c]/20 backdrop-blur-sm">
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const p = team2[i];
                                    return (
                                        <div key={i} className="h-[72px] bg-[#091428]/60 border border-[#1e2328] flex items-center px-4 relative group hover:border-[#c83c3c]/50 transition-all">
                                            {p ? (
                                                <>
                                                    <div className="w-10 h-10 rounded-full bg-[#1e2328] border border-[#c83c3c] mr-4 overflow-hidden shadow-[0_0_10px_rgba(200,60,60,0.3)]">
                                                        <div className="w-full h-full bg-gradient-to-br from-[#c83c3c] to-[#091428]" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[#e0f3ff] font-bold text-sm">{p.name}</span>
                                                        <span className="text-[#5c5b57] text-xs font-mono uppercase">{p.tier} {p.division}</span>
                                                    </div>
                                                    <div className="absolute right-4 text-[#c83c3c] text-xs font-bold opacity-70">
                                                        {p.position}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-[#5c5b57] text-sm font-medium italic w-full text-center opacity-30">Empty Slot</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Center Action */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleBalance}
                            disabled={players.length < 2}
                            className="group relative px-12 py-4 bg-[#091428] border-2 border-[#0ac8b9] text-[#0ac8b9] font-black text-lg uppercase tracking-[0.2em] transition-all hover:bg-[#0ac8b9] hover:text-[#091428] hover:shadow-[0_0_20px_rgba(10,200,185,0.6)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <Shuffle size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                                Start Civil War
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <Sidebar
                players={players}
                onRemovePlayer={handleRemovePlayer}
                onOpenAddModal={() => setIsAddModalOpen(true)}
                onAutoFill={handleAutoFill}
            />

            {/* Add Player Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="소환사 등록"
            >
                <PlayerInput onAddPlayer={handleAddPlayer} />
            </Modal>
        </div>
    );
}

export default App;
