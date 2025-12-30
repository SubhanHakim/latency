import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

import andyImg from '../../assets/supportes/andy.webp';
import geniusImg from '../../assets/supportes/genius.webp';
import unknownImg from '../../assets/supportes/unknown.png';

gsap.registerPlugin(ScrollTrigger);

const Support = () => {
    const containerRef = useRef(null);

    const supporters = [
        {
            id: '01',
            name: 'Liminal Bardo',
            handle: '@liminal_bardo',
            img: andyImg,
            signal: 'STRONG',
            link: 'https://x.com/liminal_bardo'
        },
        {
            id: '02',
            name: 'Janus',
            handle: '@repligate',
            img: geniusImg,
            signal: 'STABLE',
            link: 'https://x.com/repligate'
        },
        {
            id: '03',
            name: 'Lowkey',
            handle: '@Lowkeyyrzs',
            img: unknownImg,
            signal: 'FLUX',
            link: 'https://x.com/lowkeyyrzs'
        },
    ];

    useGSAP(() => {
        // Ensure items are visible by default if JS fails, but animate from 0
        const items = gsap.utils.toArray('.node-item');

        items.forEach((item: any, i) => {
            gsap.from(item, {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: i * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%", // Trigger slightly earlier
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section id="support" ref={containerRef} className="w-full py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
            <div className="max-w-6xl mx-auto">

                {/* Header - Matched padding with Gallery */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-24 px-4">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-1.5 bg-[#6366f1] animate-pulse" />
                            <span className="text-[#6366f1] text-[10px] font-mono tracking-[0.3em] uppercase">Active_Nodes</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-light text-white tracking-tighter leading-[0.9]">
                            Witnesses
                        </h2>
                    </div>
                </div>

                {/* Grid Layout - Matched grid structure */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {supporters.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="node-item group relative flex flex-col justify-between p-6 md:p-8 bg-[#0f0f0f] border border-white/5 hover:border-[#6366f1]/50 transition-all duration-500 overflow-hidden aspect-[4/3]"
                        >
                            {/* Hover Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Top Info */}
                            <div className="relative z-10 flex justify-between items-start">
                                <span className="text-xs font-mono text-gray-400 group-hover:text-[#6366f1] transition-colors">
                                    NODE_{item.id}
                                </span>
                                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </div>

                            {/* Center Image (Full Color + Glow) */}
                            <div className="relative z-10 self-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden transition-all duration-500 ring-1 ring-white/10 group-hover:ring-[#6366f1] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] group-hover:scale-110 bg-[#0a0a0a]">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-light text-white mb-1">{item.name}</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-mono text-gray-400 group-hover:text-[#6366f1] transition-colors">{item.handle}</p>
                                    <span className="text-[10px] uppercase tracking-widest text-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity">{item.signal}</span>
                                </div>
                            </div>

                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Support;
