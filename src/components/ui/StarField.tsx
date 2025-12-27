import { useEffect, useRef } from 'react';

const StarField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        setSize();

        // Stars
        const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
        const numStars = 300;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5,
                speed: Math.random() * 0.2 + 0.05,
                opacity: Math.random()
            });
        }

        // Nebula / Fog particles
        const nebulaParticles: { x: number; y: number; radius: number; color: string; vx: number; vy: number }[] = [];
        const numNebula = 5;
        const colors = ['rgba(99, 102, 241, 0.05)', 'rgba(79, 70, 229, 0.05)', 'rgba(168, 85, 247, 0.05)']; // Indigo/Purple low opacity

        for (let i = 0; i < numNebula; i++) {
            nebulaParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 300 + 200, // Large blobs
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2
            });
        }

        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.fillStyle = '#05050A'; // Deep background clearing
            ctx.fillRect(0, 0, width, height);

            // Draw Nebula
            nebulaParticles.forEach(p => {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < -p.radius) p.x = width + p.radius;
                if (p.x > width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = height + p.radius;
                if (p.y > height + p.radius) p.y = -p.radius;
            });

            // Draw Stars
            stars.forEach(star => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Parallax effect with mouse
                const moveX = (mouseX - width / 2) * 0.005 * star.speed;
                const moveY = (mouseY - height / 2) * 0.005 * star.speed;

                star.y -= star.speed + moveY;
                star.x -= moveX;

                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
            });

            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', setSize);
        return () => {
            window.removeEventListener('resize', setSize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

export default StarField;
