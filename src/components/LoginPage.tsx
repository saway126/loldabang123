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
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#010a13]">
            <style>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active{
                    -webkit-box-shadow: 0 0 0 30px #010a13 inset !important;
                    -webkit-text-fill-color: #cdbe91 !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>

            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt2a8d492ef6265c16/5db05fa86af6e9662b699806/RiotX_ChampionList_stage_bottom.png')] bg-cover bg-center opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#010a13]/80 via-[#010a13]/50 to-[#010a13]" />
            </div>

            <div className="w-full max-w-[420px] relative z-10 flex flex-col items-center">
                {/* Logo Section */}
                <div className="mb-12 text-center relative group cursor-default">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#c8aa6e]/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#c8aa6e]/20 transition-all duration-700" />

                    <h1 className="relative flex flex-col items-center">
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] via-[#c8aa6e] to-[#8c7335] tracking-tighter uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'Beaufort, serif' }}>
                            롤다방
                        </span>
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent my-2 opacity-70" />
                        <span className="text-xl font-bold text-[#a09b8c] tracking-[0.3em] uppercase drop-shadow-md" style={{ fontFamily: 'Beaufort, serif' }}>
                            내전 악귀 수용소
                        </span>
                    </h1>
                </div>

                {/* Login Container */}
                <div className="w-full bg-[#010a13]/90 backdrop-blur-sm p-[2px] rounded-sm border border-[#3c3c41] shadow-2xl relative overflow-hidden">
                    {/* Border Gradients */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent opacity-50" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent opacity-50" />

                    <div className="bg-[#091428] p-8 relative">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c8aa6e]" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c8aa6e]" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c8aa6e]" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c8aa6e]" />

                        <h2 className="text-[#f0e6d2] text-lg font-bold mb-8 text-center tracking-widest uppercase">
                            로그인
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div className="group">
                                    <label className="block text-[11px] font-bold text-[#a09b8c] mb-2 uppercase tracking-wider group-focus-within:text-[#c8aa6e] transition-colors">아이디</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-[#010a13] text-[#f0e6d2] px-4 py-3 border border-[#3c3c41] focus:border-[#c8aa6e] outline-none transition-all font-medium text-sm placeholder-[#5c5b57] shadow-inner"
                                            placeholder="아이디를 입력하세요"
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-[11px] font-bold text-[#a09b8c] mb-2 uppercase tracking-wider group-focus-within:text-[#c8aa6e] transition-colors">비밀번호</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-[#010a13] text-[#f0e6d2] px-4 py-3 border border-[#3c3c41] focus:border-[#c8aa6e] outline-none transition-all font-medium text-sm placeholder-[#5c5b57] shadow-inner"
                                            placeholder="비밀번호를 입력하세요"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-b from-[#1e2328] to-[#1e2328] hover:from-[#1e2328] hover:to-[#2d3238] text-[#cdbe91] font-bold py-3.5 px-4 rounded-[2px] shadow-lg transition-all uppercase text-xs tracking-[0.1em] border border-[#c8aa6e] hover:brightness-125 active:scale-[0.98] relative overflow-hidden group"
                                >
                                    <span className="relative z-10">로그인</span>
                                    <div className="absolute inset-0 bg-[#c8aa6e]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>

                                <button
                                    type="button"
                                    onClick={onLogin}
                                    className="w-full bg-transparent text-[#a09b8c] hover:text-[#f0e6d2] font-medium py-2 px-4 text-[11px] transition-colors flex items-center justify-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-[#a09b8c] rounded-full group-hover:bg-[#c8aa6e]" />
                                    샘플 계정으로 빠르게 시작하기
                                    <span className="w-1 h-1 bg-[#a09b8c] rounded-full group-hover:bg-[#c8aa6e]" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-[#1e2328] flex justify-between text-[11px] text-[#5c5b57]">
                            <a href="#" className="hover:text-[#c8aa6e] transition-colors">회원가입</a>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-[#c8aa6e] transition-colors">아이디 찾기</a>
                                <a href="#" className="hover:text-[#c8aa6e] transition-colors">비밀번호 찾기</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-12 text-center px-4">
                    <p className="text-[10px] text-[#5c5b57] leading-relaxed">
                        롤다방은 Riot Games의 공식 제품이 아니며, Riot Games 또는 League of Legends의 제작 및 관리에 공식적으로 관여하는 사람들의 승인을 받지 않았습니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

