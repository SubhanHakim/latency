import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.5
        });
    }, []);

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Art', href: '#art' },
        { name: 'Support', href: '#support' }
    ];

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 py-8 flex justify-center items-center pointer-events-none text-white">

            {/* Unified Centered Floating Dock */}
            <div className="pointer-events-auto flex items-center gap-2 p-2 pl-6 bg-[#0f0f0f]/80 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] supports-[backdrop-filter]:bg-black/50">

                {/* Logo Section (Integrated) */}
                <div className="flex items-center gap-3 mr-2 pr-6 border-r border-white/10 group cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#6366f1] rounded-full absolute animate-ping opacity-75" />
                        <div className="w-2 h-2 bg-[#6366f1] rounded-full relative" />
                    </div>
                    <span className="font-bold tracking-tight text-sm group-hover:text-[#6366f1] transition-colors">LATENCY</span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-1">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative px-5 py-2.5 rounded-full overflow-hidden group"
                        >
                            {/* Hover Pill Background */}
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />

                            {/* Text */}
                            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 group-hover:text-black transition-colors duration-300">
                                {link.name}
                            </span>
                        </a>
                    ))}
                </div>

            </div>

        </nav>
    );
};

export default Navbar;
