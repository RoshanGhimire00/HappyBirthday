import { useEffect, useRef } from 'react';

const SideBlasts = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let particles = [];
        const colors = [
            '#FFD700', // Gold
            '#FF416C', // Pink
            '#FF4B2B', // Orange/Red
            '#00C9FF', // Cyan
            '#92FE9D', // Light Green
            '#FFFFFF', // White
            '#FF00E4', // Magenta
        ];

        class Particle {
            constructor(x, y, isLeft) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 6 + 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];

                // Shoot upwards and towards the center
                const angle = isLeft
                    ? (Math.random() * (Math.PI / 3) + Math.PI / 12) // 15 to 75 degrees
                    : (Math.PI - (Math.random() * (Math.PI / 3) + Math.PI / 12)); // 105 to 165 degrees

                const force = Math.random() * 25 + 15;
                this.vx = Math.cos(angle) * force;
                this.vy = -Math.sin(angle) * force;

                this.gravity = 0.45;
                this.friction = 0.985;
                this.life = 1.0;
                this.decay = Math.random() * 0.015 + 0.005;

                // For trail effect
                this.history = [];
                this.maxHistory = 5;
            }

            update() {
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxHistory) {
                    this.history.shift();
                }

                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vy += this.gravity;

                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;

                // Draw trail
                if (this.history.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let p of this.history) {
                        ctx.lineTo(p.x, p.y);
                    }
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = this.size / 2;
                    ctx.stroke();
                }

                // Draw particle head
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;

                // Glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;

                ctx.fill();
                ctx.restore();
            }
        }

        const fireBomb = () => {
            // Create a massive burst
            const burstSize = 250; // Increased
            for (let i = 0; i < burstSize; i++) {
                particles.push(new Particle(0, height, true));
                particles.push(new Particle(width, height, false));
            }
        };

        // Fire immediately on mount
        fireBomb();

        // track how many blasts have been triggered
        let blastCount = 1; // first shot above

        // Occasional smaller bursts with a 5‑second gap
        const interval = setInterval(() => {
            // on mobile, only allow two total blasts
            if (isMobile && blastCount >= 2) {
                clearInterval(interval);
                return;
            }
            fireBomb();
            blastCount++;
        }, 5000);

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        const animate = () => {

            ctx.clearRect(0, 0, width, height);

            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[60]"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))' }}
        />
    );
};

export default SideBlasts;
