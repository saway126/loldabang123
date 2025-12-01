import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation as requested
        if ((username === 'kks1234' && password === 'kks1234') || username === 'admin') {
            onLogin();
        } else {
            alert('Invalid credentials. Try kks1234 / kks1234');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-start px-8 md:px-24 lg:px-32 relative overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="w-full max-w-[400px] space-y-0 bg-[#1e2328] p-0 rounded-sm border-2 border-[#3c3c41] relative z-10 shadow-2xl">
                {/* Header Section */}
                <div className="text-center pt-10 pb-6 relative overflow-hidden">
                    {/* Golden Glow behind logo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#c8aa6e]/20 blur-3xl rounded-full pointer-events-none" />

                    <h1 className="relative z-10">
                        <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#c8aa6e] via-[#f0e6d2] to-[#c8aa6e] tracking-tighter uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'Beaufort, serif' }}>
                            CIVIL WAR
                        </span>
                        <span className="block text-2xl font-bold text-[#f0e6d2] tracking-[0.2em] uppercase mt-1 drop-shadow-md" style={{ fontFamily: 'Beaufort, serif' }}>
                            HELPER
                        </span>
                    </h1>
                </div>

                {/* Login Form Section */}
                <div className="bg-[#1e2328] p-8 pt-2">
                    <h2 className="text-[#f0e6d2] text-sm font-bold mb-6 border-l-4 border-[#c8aa6e] pl-3 flex items-center h-4">
                        계정 로그인
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold text-[#a09b8c] mb-1.5">계정 이름</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-[#f0f0f0] text-gray-900 px-3 py-2.5 border-2 border-gray-300 focus:border-[#c8aa6e] outline-none transition-colors font-bold text-sm placeholder-gray-400"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-[#a09b8c] mb-1.5">비밀번호</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#f0f0f0] text-gray-900 px-3 py-2.5 border-2 border-gray-300 focus:border-[#c8aa6e] outline-none transition-colors font-bold text-sm"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onLogin}
                                className="flex-1 bg-gradient-to-b from-[#ffae00] to-[#cd6e00] hover:from-[#ffbe33] hover:to-[#e67e00] text-[#1a1a1a] font-bold py-2.5 px-4 rounded-[2px] shadow-lg transition-all uppercase text-[11px] tracking-wide border border-[#c8aa6e] hover:brightness-110 active:translate-y-[1px]"
                            >
                                샘플 계정으로 로그인
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-b from-[#5c5b57] to-[#1e2328] hover:from-[#6e6d68] hover:to-[#2d3238] text-[#cdbe91] font-bold py-2.5 px-4 rounded-[2px] shadow-lg transition-all uppercase text-[11px] tracking-wide border border-[#3c3c41] hover:border-[#c8aa6e] active:translate-y-[1px]"
                            >
                                로그인
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 space-y-2.5 text-[11px]">
                        <a href="#" className="block text-[#0ac8b9] hover:underline hover:text-[#4ffceb] transition-colors">아직 계정이 없으신가요? <span className="text-[#0ac8b9]">지금 가입하세요!</span></a>
                        <a href="#" className="block text-[#005a82] hover:underline hover:text-[#0ac8b9] transition-colors font-medium">계정이름을 잊으셨나요?</a>
                        <a href="#" className="block text-[#005a82] hover:underline hover:text-[#0ac8b9] transition-colors font-medium">비밀번호를 잊으셨나요?</a>
                        <a href="#" className="block text-[#005a82] hover:underline hover:text-[#0ac8b9] transition-colors font-medium">문의사항이 있나요?</a>
                    </div>
                </div>
            </div>

            {/* Footer Disclaimer */}
            <div className="absolute bottom-8 left-8 md:left-24 lg:left-32 text-[10px] text-[#a09b8c] max-w-2xl leading-relaxed opacity-80 z-10">
                <p>- 롤 내전 도우미는 롤 내전 팀짜기에 대한 서비스를 무료로 제공하며, Riot Games의 공식 서비스가 아닌 2차 창작물임을 밝힙니다.</p>
                <p>- 현재 모바일 환경은 지원하지 않습니다. PC 크롬 브라우저에서 이용을 권장합니다.</p>
            </div>
        </div>
    );
};
