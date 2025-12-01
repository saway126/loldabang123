import { useState } from 'react';
import { type Player, type Tier, balanceTeams } from './utils/balancer';
import { PlayerInput } from './components/PlayerInput';
import { PlayerList } from './components/PlayerList';
import { TeamDisplay } from './components/TeamDisplay';
import { Users, Shuffle, Trash2 } from 'lucide-react';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);

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
      alert('Need at least 2 players to balance.');
      return;
    }
    const [t1, t2] = balanceTeams(players);
    setTeam1(t1);
    setTeam2(t2);
  };

  const handleClear = () => {
    if (confirm('Clear all players?')) {
      setPlayers([]);
      setTeam1([]);
      setTeam2([]);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#c8aa6e] via-[#f0e6d2] to-[#c8aa6e] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] uppercase" style={{ fontFamily: 'Beaufort, serif' }}>
            Civil War Helper
          </h1>
          <p className="text-[#a09b8c] text-lg font-medium tracking-wide uppercase">Fair team balancing for your custom games</p>
        </header>

        {/* Controls */}
        <div className="space-y-6">
          <PlayerInput onAddPlayer={handleAddPlayer} />

          <div className="flex gap-4">
            <button
              onClick={handleBalance}
              disabled={players.length < 2}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Shuffle size={24} />
              Balance Teams
            </button>

            <button
              onClick={handleClear}
              className="bg-gray-700 hover:bg-red-900/50 text-gray-300 hover:text-red-200 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 size={20} />
              Clear
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-3">
            <PlayerList players={players} onRemovePlayer={handleRemovePlayer} />
          </div>
        </div>

        {/* Results */}
        {(team1.length > 0 || team2.length > 0) && (
          <div className="border-t border-gray-800 pt-8">
            <TeamDisplay team1={team1} team2={team2} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm mt-12">
          <p>Not affiliated with Riot Games.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
