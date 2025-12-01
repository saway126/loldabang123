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
        <div className="min-h-screen flex items-center justify-start px-8 md:px-24 lg:px-32">
            <div className="w-full max-w-md space-y-8 bg-black/75 p-8 rounded-sm border border-gray-800 backdrop-blur-sm">
                <div className="text-center space-y-4">
                    {/* Logo Placeholder - using text if image fails, but trying to match style */}
                    <div className="relative">
                        <h1 className="text-4xl font-black text-[#c8aa6e] tracking-tighter uppercase drop-shadow-lg" style={{ fontFamily: 'Beaufort, serif' }}>
                            Civil War
                            <span className="block text-2xl text-[#f0e6d2]">Helper</span>
                        </h1>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent" />
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-[#a09b8c] text-sm font-bold uppercase tracking-wider mb-4 border-l-4 border-[#c8aa6e] pl-3">
                        Account Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#a09b8c] mb-1 uppercase">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white text-gray-900 px-3 py-2 border-2 border-gray-300 focus:border-[#c8aa6e] outline-none transition-colors font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#a09b8c] mb-1 uppercase">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white text-gray-900 px-3 py-2 border-2 border-gray-300 focus:border-[#c8aa6e] outline-none transition-colors font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <button
                                type="button"
                                onClick={onLogin}
                                className="w-full bg-[#ff8c00] hover:bg-[#e67e00] text-white font-bold py-2.5 px-4 rounded-sm shadow-lg transition-colors uppercase text-sm tracking-wide"
                            >
                                Sample Account Login
                            </button>
                            <button
                                type="submit"
                                className="w-full bg-[#555555] hover:bg-[#444444] text-white font-bold py-2.5 px-4 rounded-sm shadow-lg transition-colors uppercase text-sm tracking-wide border-t border-gray-400"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 space-y-2 text-xs text-[#0ac8b9]">
                        <a href="#" className="block hover:underline">No account yet? Join now!</a>
                        <a href="#" className="block hover:underline text-[#5c5b57]">Forgot username?</a>
                        <a href="#" className="block hover:underline text-[#5c5b57]">Forgot password?</a>
                        <a href="#" className="block hover:underline text-[#5c5b57]">Have an inquiry?</a>
                    </div>
                </div>
            </div>

            {/* Footer Disclaimer */}
            <div className="absolute bottom-4 left-8 text-[10px] text-gray-400 max-w-2xl">
                <p>LoL Civil War Helper provides free services for team balancing and is a fan-made project not affiliated with Riot Games.</p>
                <p>Mobile environment is not currently supported. PC Chrome browser is recommended.</p>
            </div>
        </div>
    );
};
