import { motion } from 'framer-motion';

const FloatingBalloons = ({ count = 10 }) => {
    const balloons = Array.from({ length: count }).map((_, i) => {
        const randomColor = ['#FF416C', '#FFD700', '#00C9FF', '#92FE9D', '#FF4B2B'][Math.floor(Math.random() * 5)];
        const randomDuration = 15 + Math.random() * 15;
        const randomDelay = Math.random() * 5;
        const randomLeft = Math.random() * 100;
        const size = 60 + Math.random() * 50;

        return {
            id: i,
            color: randomColor,
            duration: randomDuration,
            delay: randomDelay,
            left: randomLeft,
            size,
        };
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {balloons.map((b) => (
                <motion.div
                    key={b.id}
                    className="balloon"
                    style={{
                        left: `${b.left}%`,
                        width: `${b.size}px`,
                        height: `${b.size * 1.2}px`,
                        background: `radial-gradient(circle at 30% 30%, #fff 0%, ${b.color} 50%, #333 100%)`,
                    }}
                    initial={{ y: '120vh', x: 0 }}
                    animate={{
                        y: '-120vh',
                        x: [0, 50, -50, 0],
                    }}
                    transition={{
                        y: {
                            duration: b.duration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: b.delay,
                        },
                        x: {
                            duration: b.duration / 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingBalloons;
