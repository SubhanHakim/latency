import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorOutline = cursorOutlineRef.current;

        if (!cursorDot || !cursorOutline) return;

        // Center the cursor initially
        gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Instant movement for dot
            gsap.to(cursorDot, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            // Smooth lag for outline
            gsap.to(cursorOutline, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className="cursor-dot mobile:hidden pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-white transition-opacity duration-300 mobile:opacity-0" />
            <div ref={cursorOutlineRef} className="cursor-outline mobile:hidden pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 rounded-full border border-white/50 transition-opacity duration-300 mobile:opacity-0" />
        </>
    );
};

export default CustomCursor;
