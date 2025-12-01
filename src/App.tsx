
import { useState } from 'react';
import { type Player, type Tier, type Division, type BalanceMode, balanceTeams } from './utils/balancer';
import { PlayerInput } from './components/PlayerInput';
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';
import { LoginPage } from './components/LoginPage';
import { Shuffle, Trash2 } from 'lucide-react';

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
    setPlayers([...players, newPlayer]);
    // Optional: Close modal after adding, or keep open for bulk add
    // setIsAddModalOpen(false); 
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
    <div className="min-h-screen text-gray-100 font-sans flex overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 mr-[300px] h-screen overflow-y-auto custom-scrollbar p-8 relative">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <header className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-left">
                <label className="block text-xs font-bold text-[#c8aa6e] mb-1 uppercase tracking-wider">모드 선택</label>
                <select
                  value={balanceMode}
                  onChange={(e) => setBalanceMode(e.target.value as BalanceMode)}
                  className="bg-[#1e2328] border border-[#c8aa6e] text-[#cdbe91] py-1.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#1e282d] focus:border-[#f0e6d2] font-bold text-sm min-w-[160px]"
                >
                  <option value="Random">Random</option>
                  <option value="Balance">Balance</option>
                  <option value="Golden Balance">Golden Balance</option>
                  <option value="Line Balance">Line Balance</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleClear}
              className="bg-[#1e2328] hover:bg-[#2d1e1e] text-[#5c5b57] hover:text-[#c83c3c] border border-[#3c3c41] hover:border-[#c83c3c] font-bold py-2 px-4 transition-colors flex items-center gap-2 uppercase tracking-wider text-xs rounded"
            >
              <Trash2 size={16} />
              리셋
            </button>
          </header>

          {/* Teams Display */}
          <div className="grid grid-cols-2 gap-12">
            {/* Team 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#f0e6d2] text-center uppercase tracking-widest drop-shadow-md">1팀</h2>
              <div className="space-y-2 min-h-[400px]">
                {Array.from({ length: 5 }).map((_, i) => {
                  const p = team1[i];
                  return (
                    <div key={i} className="h-[72px] bg-[#010a13]/60 border-b border-[#3c3c41] flex items-center px-4 relative group">
                      {p ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-[#1e2328] border border-[#c8aa6e] mr-4 overflow-hidden">
                            {/* Placeholder Icon */}
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[#f0e6d2] font-bold text-sm">{p.name}</span>
                            <span className="text-[#5c5b57] text-xs font-mono uppercase">{p.tier} {p.division}</span>
                          </div>
                          <div className="absolute right-4 text-[#a09b8c] text-xs font-bold opacity-50">
                            {p.position}
                          </div>
                        </>
                      ) : (
                        <span className="text-[#5c5b57] text-sm font-medium italic w-full text-center opacity-50">비어 있음</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#f0e6d2] text-center uppercase tracking-widest drop-shadow-md">2팀</h2>
              <div className="space-y-2 min-h-[400px]">
                {Array.from({ length: 5 }).map((_, i) => {
                  const p = team2[i];
                  return (
                    <div key={i} className="h-[72px] bg-[#010a13]/60 border-b border-[#3c3c41] flex items-center px-4 relative group">
                      {p ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-[#1e2328] border border-[#c8aa6e] mr-4 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[#f0e6d2] font-bold text-sm">{p.name}</span>
                            <span className="text-[#5c5b57] text-xs font-mono uppercase">{p.tier} {p.division}</span>
                          </div>
                          <div className="absolute right-4 text-[#a09b8c] text-xs font-bold opacity-50">
                            {p.position}
                          </div>
                        </>
                      ) : (
                        <span className="text-[#5c5b57] text-sm font-medium italic w-full text-center opacity-50">비어 있음</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Action */}
          <div className="flex justify-center mt-12">
            <div className="relative w-[400px] h-[200px] border border-[#c8aa6e]/30 bg-[#010a13]/80 backdrop-blur flex flex-col items-center justify-center p-8">
              <h3 className="text-[#a09b8c] text-sm font-bold uppercase tracking-widest mb-6">팀 미정 인원</h3>

              <button
                onClick={handleBalance}
                disabled={players.length < 2}
                className="w-full bg-[#1e2328] hover:bg-[#1e282d] text-[#cdbe91] border border-[#c8aa6e] font-bold py-3 px-8 shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                <Shuffle size={20} />
                팀 짜기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <Sidebar
        players={players}
        onRemovePlayer={handleRemovePlayer}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Add Player Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="인원 추가"
      >
        <PlayerInput onAddPlayer={handleAddPlayer} />
      </Modal>
    </div>
  );
}

export default App;

