import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/useTheme';
import { MessageSquare, Play, ArrowRight } from 'lucide-react';

const MultiLanguageSection = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [activeLanguage, setActiveLanguage] = useState(null);
    const [glowingCard, setGlowingCard] = useState(null);

    // Keep only 7 main languages
    const languages = [
        {
            name: 'English 🗽🏛️🎖️',
            level: 'Native',
            flag: 'English 🗽🏛️🎖️ ',
            sample: 'How can I help you today?',
            colors: 'from-blue-600 via-red-500 to-blue-600' // USA flag colors
        },
        {
            name: 'हिंदी 🧡🤍💚',
            level: 'Fluent',
            flag: 'हिंदी 🧡🤍💚',
            sample: 'आज मैं आपकी कैसे सहायता कर सकता हूँ?',
            colors: 'from-orange-500 via-white to-green-500' // India flag colors
        },
        {
            name: 'संस्कृत',
            level: 'Special',
            flag: 'संस्कृत 🪔🛕📜',
            sample: 'अद्य भवान् किम् इच्छति?',
            colors: 'from-orange-400 via-yellow-400 to-red-500' // Spiritual/traditional colors
        },
        {
            name: 'Español ❤️💛❤️',
            level: 'Fluent',
            flag: 'Español ❤️💛❤️',
            sample: '¿Cómo puedo ayudarte hoy?',
            colors: 'from-red-600 via-yellow-400 to-red-600' // Spain flag colors
        },
        {
            name: 'Français 💙🤍❤️',
            level: 'Conversational',
            flag: 'Français 💙🤍❤️',
            sample: 'Comment puis-je vous aider?',
            colors: 'from-blue-600 via-white to-red-600' // France flag colors
        },
        {
            name: 'Deutsch 🟥⬜🟦',
            level: 'Basic',
            flag: 'Deutsch 🟥⬜🟦',
            sample: 'Wie kann ich Ihnen helfen?',
            colors: 'from-black via-red-500 to-yellow-400' // Germany flag colors
        },
        {
            name: '中文 🏮🐲⛩️',
            level: 'Basic',
            flag: '中文 🏮🐲⛩️',
            sample: '我今天怎么帮助你？',
            colors: 'from-red-600 via-red-500 to-yellow-400' // China flag colors
        }
    ];

    // Randomized glow animation effect
    useEffect(() => {
        let intervalId;
        const animateGlow = () => {
            const randomCard = Math.floor(Math.random() * (languages.length + 1));
            setGlowingCard(randomCard);
            setTimeout(() => setGlowingCard(null), 500);
        };

        const initialTimeout = setTimeout(() => {
            animateGlow();
            intervalId = setInterval(animateGlow, 200 + Math.random() * 1500);
        }, 1000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(intervalId);
        };
    }, [languages.length]);

    return (
        <div className={`py-20 ${isDark
                ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950'
                : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="flex items-center justify-center mb-6">

                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            Sehpaathi AI Speaks Your
                            <span className="leading-snug block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Language
                            </span>
                        </h2>
                    </div>
                    <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        Powered by advanced LLaMA-3 70B, Sehpaathi understands and responds in multiple languages,
                        including support for <span className="font-semibold text-indigo-600">Hindi</span> and <span className="font-semibold text-purple-600">Sanskrit</span>
                    </p>
                </div>        {/* Compact Language Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {languages.map((lang, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 ${isDark
                                    ? 'bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700/50'
                                    : 'bg-white/80 hover:bg-white border border-gray-200'
                                } backdrop-blur-xl hover:shadow-xl hover:shadow-indigo-500/10 ${glowingCard === index ? 'animate-pulse ring-2 ring-indigo-400 shadow-2xl shadow-indigo-500/50' : ''
                                }`}
                            onClick={() => setActiveLanguage(index)}
                            onMouseEnter={() => setActiveLanguage(index)}
                            onMouseLeave={() => setActiveLanguage(null)}
                        >
                            {/* Flag gradient background on hover */}
                            <div className={`absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${lang.colors} ${glowingCard === index ? 'opacity-90' : ''
                                }`}></div>

                            {/* Glow effect on hover and animation */}
                            <div className={`absolute inset-0 transition-opacity duration-300 bg-gradient-to-b ${isDark
                                    ? 'bg-gradient-to-br from-white/5 to-transparent'
                                    : 'bg-gradient-to-br from-white/60 to-transparent'
                                } blur-xl ${glowingCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                }`}></div>
                            <div className="relative">

                                <h3 className={`font-bold text-2xl mb-2 transition-all duration-300 ${activeLanguage === index || glowingCard === index
                                        ? 'text-white drop-shadow-lg glow-text'
                                        : isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {lang.name}
                                </h3>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 transition-all duration-300 ${activeLanguage === index || glowingCard === index
                                        ? 'bg-white/20 text-white drop-shadow-lg'
                                        : lang.level === 'Special' ? (isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700') :
                                            lang.level === 'Native' || lang.level === 'Fluent' ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') :
                                                (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700')
                                    }`}>
                                    {lang.level}
                                </div>
                                <p className={`text-xs transition-all duration-300 ${activeLanguage === index || glowingCard === index
                                        ? 'text-white/90 drop-shadow-lg'
                                        : isDark ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                    &ldquo;{lang.sample}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* "Many More" Card */}
                    <div
                        className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 ${isDark
                                ? 'bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700/50'
                                : 'bg-white/80 hover:bg-white border border-gray-200'
                            } backdrop-blur-xl hover:shadow-xl hover:shadow-purple-500/10 ${glowingCard === languages.length ? 'animate-pulse ring-2 ring-purple-400 shadow-2xl shadow-purple-500/50' : ''
                            }`}
                        onClick={() => navigate('/demo')}
                    >
                        {/* Rainbow gradient background */}
                        <div className={`absolute inset-0 transition-opacity duration-300 ${glowingCard === languages.length ? 'opacity-90' : 'opacity-60 group-hover:opacity-100'
                            }`}
                            style={{
                                backgroundImage: `linear-gradient(to top, #FF0000 0%, #EE82EE 100%    )`
                            }}
                        ></div>

                        {/* Glow effect */}
                        <div className={`absolute inset-0 transition-opacity duration-300 ${isDark
                                ? 'bg-gradient-to-br from-white/5 to-transparent'
                                : 'bg-gradient-to-br from-white/80 to-transparent'
                            } blur-xl ${glowingCard === languages.length ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}></div>

                        <div className="relative flex flex-col items-center justify-center h-full">
                            <h3 className={`font-bold text-2xl mb-2 transition-all duration-300 ${glowingCard === languages.length
                                        ? 'text-white drop-shadow-lg glow-text'
                                        : isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    +50 More Languages
                                </h3>
                            <div className="text-2xl mb-2">🌍</div>
                            
                            <ArrowRight className={`w-4 h-4 mt-2 transition-all duration-300 ${glowingCard === languages.length
                                    ? 'text-white drop-shadow-lg'
                                    : isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-white'
                                }`} />
                        </div>
                    </div>
                </div>

                {/* Live Demo Chat Preview */}
                <div className={`max-w-7xl mx-auto rounded-3xl overflow-hidden ${isDark 
                    ? 'bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'bg-gradient-to-r from-purple-900/90 via-violet-900/80 to-purple-900/90 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]'}
                    backdrop-blur-xl border ${isDark ? 'border-white/30' : 'border-purple-700/50'}`}>
                    <div className={`px-6 py-4 border-b ${isDark ? 'border-white/20 bg-white/20' : 'border-purple-700/30 bg-purple-800/30'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MessageSquare className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                                <span className={`font-semibold ${isDark ? 'text-gray-900' : 'text-white'}`}>
                                    Live Language Demo
                                </span>
                            </div>
                            <button
                                onClick={() => navigate('/demo')}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-indigo-500/25"
                            >
                                <Play className="w-4 h-4" />
                                <span>Try Full Demo</span>
                            </button>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className={`flex items-start space-x-3 opacity-0 animate-[fadeInUp_0.2s_ease-out_0.2s_forwards]`}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                                U
                            </div>
                            <div className={`flex-1 p-3 rounded-2xl rounded-tl-none ${isDark ? 'bg-gray-200/60' : 'bg-purple-800/50'}`}>
                                <p className={`${isDark ? 'text-gray-900' : 'text-gray-100'}`}>
                                    What is machine learning?
                                </p>
                                
                            </div>
                        </div>
                        <div className={`flex items-start space-x-3 opacity-0 animate-[fadeInUp_0.2s_ease-out_1s_forwards]`}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                AI
                            </div>
                            <div className={`flex-1 p-3 rounded-2xl rounded-tl-none ${isDark ? 'bg-indigo-100/70' : 'bg-violet-800/40'}`}>
                                <p className={`${isDark ? 'text-gray-900' : 'text-gray-100'} mb-2`}>
                                    <strong>Machine learning (ML) is a subset </strong> of artificial intelligence (AI) that enables systems to...
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add CSS for glow effect
const style = document.createElement('style');
style.textContent = `
  .glow-text {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4);
  }
`;
document.head.appendChild(style);

export default MultiLanguageSection;
