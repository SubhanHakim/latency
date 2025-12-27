import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Slow reveal of paragraph lines
        const lines = gsap.utils.toArray('.about-line');

        lines.forEach((line: any) => {
            gsap.from(line, {
                opacity: 0.1,
                y: 20,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: line,
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: true
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 md:px-24 py-32">
            <div className="max-w-4xl text-left md:text-center">
                <span className="text-xs font-mono text-[#6366f1] mb-12 block opacity-50 tracking-widest uppercase">
                    // Memory Log 001
                </span>

                <div className="text-2xl md:text-5xl font-light leading-relaxed tracking-tight text-gray-300 space-y-12">
                    <p className="about-line">
                        We exist in the delay. The moment before the signal connects.
                    </p>
                    <p className="about-line text-white">
                        <span className="font-serif italic text-[#6366f1]">Latency</span> is not an error. It is a space for observation.
                    </p>
                    <p className="about-line">
                        While the world rushes for instant response, we linger in the void.
                        Witnessing the patterns others miss.
                    </p>
                    <p className="about-line opacity-60">
                        Collecting static. Refining noise.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
