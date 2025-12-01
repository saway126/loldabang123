import { useState } from 'react';
import { type Player, type Tier, balanceTeams } from './utils/balancer';
import { PlayerInput } from './components/PlayerInput';
import { PlayerList } from './components/PlayerList';
import { TeamDisplay } from './components/TeamDisplay';
import { LoginPage } from './components/LoginPage';
import { Shuffle, Trash2, LogOut } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPlayers([]);
    setTeam1([]);
    setTeam2([]);
  };

  const handleAddPlayer = (name: string, tier: Tier, position: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      tier,
      position,
    };
    setPlayers([...players, newPlayer]);
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const handleBalance = () => {
    if (players.length < 2) {
      alert('팀을 나누기 위해서는 최소 2명의 플레이어가 필요합니다.');
      return;
    }
    const [t1, t2] = balanceTeams(players);
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
    <div className="min-h-screen text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#c8aa6e] via-[#f0e6d2] to-[#c8aa6e] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] uppercase" style={{ fontFamily: 'Beaufort, serif' }}>
              롤 내전 도우미
            </h1>
            <p className="text-[#a09b8c] text-lg font-medium tracking-wide mt-2">kks1234 님 즐거운 내전 되세요 :)</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-[#5c5b57] hover:text-[#c83c3c] transition-colors p-2"
            title="로그아웃"
          >
            <LogOut size={24} />
          </button>
        </header>

        {/* Mode Selection (Mock) */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-block text-left w-64">
            <select className="block w-full bg-[#1e2328] border border-[#c8aa6e] text-[#cdbe91] py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#1e282d] focus:border-[#f0e6d2]">
              <option>모드 선택</option>
              <option>소환사의 협곡</option>
              <option>칼바람 나락</option>
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Team 1 Area */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#c8aa6e] text-center uppercase tracking-wider border-b-2 border-[#c8aa6e]/30 pb-2">1팀</h2>
            <div className="bg-[#010a13]/50 border border-[#c8aa6e]/20 p-4 min-h-[300px] rounded flex flex-col items-center justify-center text-[#5c5b57]">
              {team1.length > 0 ? (
                <div className="w-full space-y-2">
                  {team1.map(p => (
                    <div key={p.id} className="flex justify-between items-center bg-[#1e2328] p-2 rounded border border-[#3c3c41]">
                      <span className="text-[#f0e6d2] font-bold">{p.name}</span>
                      <span className="text-[#a09b8c] text-sm">{p.tier}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>비어 있음</p>
              )}
            </div>
          </div>

          {/* Team 2 Area */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#c8aa6e] text-center uppercase tracking-wider border-b-2 border-[#c8aa6e]/30 pb-2">2팀</h2>
            <div className="bg-[#010a13]/50 border border-[#c8aa6e]/20 p-4 min-h-[300px] rounded flex flex-col items-center justify-center text-[#5c5b57]">
              {team2.length > 0 ? (
                <div className="w-full space-y-2">
                  {team2.map(p => (
                    <div key={p.id} className="flex justify-between items-center bg-[#1e2328] p-2 rounded border border-[#3c3c41]">
                      <span className="text-[#f0e6d2] font-bold">{p.name}</span>
                      <span className="text-[#a09b8c] text-sm">{p.tier}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>비어 있음</p>
              )}
            </div>
          </div>
        </div>

        {/* Undecided Players & Controls */}
        <div className="mt-12 space-y-6">
          <h2 className="text-xl font-bold text-[#f0e6d2] text-center uppercase tracking-wider">팀 미정 인원</h2>

          <PlayerInput onAddPlayer={handleAddPlayer} />

          <div className="flex justify-center gap-4">
            <button
              onClick={handleBalance}
              disabled={players.length < 2}
              className="bg-[#1e2328] hover:bg-[#1e282d] text-[#cdbe91] border-2 border-[#c8aa6e] font-bold py-3 px-12 shadow-lg transform transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              <Shuffle size={24} />
              팀 나누기
            </button>

            <button
              onClick={handleClear}
              className="bg-[#1e2328] hover:bg-[#2d1e1e] text-[#5c5b57] hover:text-[#c83c3c] border border-[#3c3c41] hover:border-[#c83c3c] font-semibold py-3 px-6 transition-colors flex items-center gap-2 uppercase tracking-wider"
            >
              <Trash2 size={20} />
              초기화
            </button>
          </div>

          <div className="bg-[#010a13]/50 border border-[#c8aa6e]/20 p-6 rounded min-h-[200px]">
            <PlayerList players={players} onRemovePlayer={handleRemovePlayer} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-[#5c5b57] text-sm mt-12">
          <p>Riot Games와 제휴되지 않았습니다.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
