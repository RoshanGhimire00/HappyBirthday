import { motion } from 'framer-motion';

const GlowingTree = () => {
    return (
        <div className="relative w-64 h-80 flex flex-col items-center justify-end">
            {/* Tree sparkles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-yellow-300"
                    style={{
                        top: `${Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                        boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700'
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            {/* Tree Top / Leaves */}
            <motion.div
                className="w-48 h-48 bg-gradient-to-b from-green-400 to-green-700 rounded-full absolute top-8"
                style={{
                    boxShadow: '0 0 40px rgba(74, 222, 128, 0.5), inset 0 0 20px rgba(0,0,0,0.5)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, type: 'spring' }}
            >
                {/* Some detailed leaf bumps */}
                <div className="absolute top-0 left-4 w-16 h-16 bg-green-500 rounded-full mix-blend-screen opacity-50 block blur-md"></div>
                <div className="absolute top-10 right-4 w-20 h-20 bg-green-400 rounded-full mix-blend-screen opacity-50 block blur-md"></div>
            </motion.div>

            <motion.div
                className="w-56 h-32 bg-gradient-to-b from-green-500 to-green-800 rounded-full absolute top-24"
                style={{
                    boxShadow: '0 0 50px rgba(74, 222, 128, 0.4)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, type: 'spring' }}
            />

            {/* Tree Trunk */}
            <motion.div
                className="w-12 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg relative z-0"
                style={{
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 96, opacity: 1 }}
                transition={{ duration: 1 }}
            />
        </div>
    );
};

export default GlowingTree;
