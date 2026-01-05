import dexIcon from '../../assets/images/dexscreener.svg';

const Footer = () => {
    return (
        <footer className="w-full py-12 bg-[#0a0a0a] text-gray-400 text-xs font-mono uppercase tracking-widest border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#6366f1]" />
                    <span>Latency Witness</span>
                </div>

                <div className="flex items-center gap-8">
                    {/* X (Twitter) */}
                    <a href="https://x.com/latency_dev" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors group">
                        <span className="font-bold text-lg leading-none">X</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 text-[#6366f1]">Twitter</span>
                    </a>

                    {/* Dexscreener */}
                    <a href="https://pump.fun/coin/DUw5jusXchdDQKd4gmBktCMSA8G9p5cAUFnjRAsPpump" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors group">
                        <img
                            src={dexIcon}
                            alt="Dexscreener"
                            className="w-4 h-4 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 text-[#6366f1]">Chart</span>
                    </a>
                </div>

                <div className="text-gray-600">
                    © {new Date().getFullYear()} Observer
                </div>
            </div>
        </footer>
    );
};

export default Footer;
