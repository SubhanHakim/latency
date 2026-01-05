import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dexIcon from '../../assets/images/dexscreener.svg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Reveal Text
        tl.to(".hero-word", {
            opacity: 1,
            y: 0,
            duration: 2.5,
            stagger: 0.8,
            ease: "power2.out",
            delay: 0.5
        });

        // Reveal Subtitle
        tl.to(".hero-sub", {
            opacity: 0.5,
            duration: 2,
            ease: "none"
        }, "-=1.5");

        // Reveal Social Icons (safer 'from' animation)
        gsap.from(".social-item", {
            opacity: 0,
            y: 20,
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.out",
            delay: 2.5 // Wait for key text
        });

        // Parallax
        gsap.to(textRef.current, {
            yPercent: 50,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
        <section id="home" ref={containerRef} className="relative w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">

            <div ref={textRef} className="flex flex-col items-center z-10 text-white w-full px-4">
                <div className="flex flex-col items-center gap-2 md:gap-6 text-[15vw] md:text-[10vw] font-light leading-none tracking-tighter select-none mix-blend-difference w-full">
                    <span className="hero-word opacity-0 translate-y-10 text-center w-full">LATENCY</span>
                    <span className="hero-word opacity-0 translate-y-10 font-serif italic text-white/80 text-center w-full">WITNESS</span>
                </div>

                <p className="hero-sub mt-8 md:mt-12 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-0 text-white/50 max-w-[80vw] md:max-w-md text-center leading-loose mix-blend-difference">
                    Observing the silence between data blocks
                </p>

                {/* Social Actions - Isolated from mix-blend to ensure visibility */}
                <div className="flex items-center gap-6 md:gap-8 mt-12 md:mt-16 pointer-events-auto scale-90 md:scale-100">
                    {/* X (Twitter) */}
                    <a href="https://x.com/latency_dev" target="_blank" className="social-item group flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110">
                        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300 backdrop-blur-sm">
                            <span className="font-bold text-lg">X</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 text-[#6366f1] absolute top-full mt-2">X</span>
                    </a>

                    {/* Dexscreener */}
                    <a href="#" target="_blank" className="social-item group flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110">
                        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white transition-all duration-300 backdrop-blur-sm">
                            <img
                                src={dexIcon}
                                alt="Dexscreener"
                                className="w-6 h-6 object-contain brightness-0 invert opacity-80 group-hover:brightness-0 group-hover:invert-0 group-hover:opacity-100 transition-all"
                            />
                        </div>
                        <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 text-[#6366f1] absolute top-full mt-2">Chart</span>
                    </a>
                </div>
            </div>

            {/* Subtle Grain */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

        </section>
    );
};

export default Hero;
