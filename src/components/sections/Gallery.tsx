import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { artWorks } from '../../data/content';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // "Scanline" Reveal Effect (Downloading/Loading visual)
        const cards = gsap.utils.toArray('.gallery-card');

        cards.forEach((card: any) => {
            gsap.fromTo(card,
                {
                    clipPath: "inset(0% 0% 100% 0%)", // Hidden (masked from bottom)
                    opacity: 0
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",   // Fully revealed
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section id="art" ref={containerRef} className="relative w-full py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 px-4">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-1.5 bg-[#6366f1] animate-pulse" />
                            <span className="text-[#6366f1] text-[10px] font-mono tracking-[0.3em] uppercase">Visual_Stream</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-[0.9]">
                            Latent <br /> <span className="text-gray-500 font-serif italic">Perception</span>
                        </h2>
                    </div>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
                    {artWorks.map((work, index) => (
                        <div
                            key={index}
                            className="gallery-card group relative aspect-[4/5] overflow-hidden bg-[#0f0f0f] border border-white/5 cursor-pointer"
                        >
                            {/* Image: Blur to Sharp Effect */}
                            <div className="w-full h-full overflow-hidden">
                                <img
                                    src={work.img}
                                    alt={work.title}
                                    className="w-full h-full object-cover transition-all duration-700 ease-out
                                    brightness-75 blur-[2px] scale-100
                                    group-hover:brightness-110 group-hover:blur-0 group-hover:scale-105"
                                />
                            </div>

                            {/* Info Overlay (Always visible but dimmed, brightens on hover) */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[#6366f1] text-[10px] font-mono tracking-widest uppercase">
                                            {work.category}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>

                                    <h3 className="text-2xl font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                                        {work.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Scanline Overlay (Decor) */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(99,102,241,0.05)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Gallery;
