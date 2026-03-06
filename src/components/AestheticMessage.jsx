import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart } from 'lucide-react';

const messages = [
    {
        title: "To My Best Friend",
        text: "You're not just a best friend, you're the family I chose. Thank you for always being by my side through thick and thin. Life is significantly better with you in it."
    },
    {
        title: "Unforgettable Memories",
        text: "Every single memory with you is a treasure. Here's to more crazy adventures, late-night talks, and endless laughter that makes our stomachs hurt."
    },
    {
        title: "A Beautiful Soul",
        text: "May your special day be just as incredible, beautiful, and unique as your soul. Keep shining your bright light on the world.Happy Birthday!"
    }
];

const AestheticMessage = ({ onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white hover:text-[#FFD700] transition-colors z-[110] bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20"
                >
                    <X size={32} />
                </button>

                <div className="max-w-6xl w-full h-[80vh] overflow-y-auto overflow-x-hidden pt-8 pb-12 px-4 hidescrollbar">
                    <motion.h2
                        className="text-4xl md:text-6xl text-center mb-16 fancy-text text-[#FFD700] glow-text flex items-center justify-center gap-4"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <Sparkles /> A Note For You <Sparkles />
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative p-2 md:p-8">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                className="relative rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl p-8 flex flex-col items-center justify-center gap-6"
                                initial={{
                                    opacity: 0,
                                    y: 100,
                                    scale: 0.8,
                                    rotate: (index - 1) * -5
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    rotate: (index - 1) * 2
                                }}
                                transition={{
                                    delay: 0.5 + index * 0.2,
                                    duration: 0.8,
                                    type: "spring",
                                    bounce: 0.4
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 0,
                                    zIndex: 20,
                                    borderColor: "rgba(255, 215, 0, 0.5)",
                                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF416C] to-[#FFD700]"></div>

                                <Heart className="text-[#FF416C] w-12 h-12 opacity-80" />

                                <h3 className="fancy-text text-3xl md:text-4xl text-center text-[#FFD700] glow-text tracking-wide">
                                    {msg.title}
                                </h3>

                                <p className="text-white/90 text-lg md:text-xl leading-relaxed text-center font-light">
                                    "{msg.text}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AestheticMessage;
