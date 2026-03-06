import { motion } from 'framer-motion';

const FlyingLetter = ({ text, onClick }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
        >
            {/* The Envelope / Letter */}
            <motion.div
                className="relative flex flex-col items-center pointer-events-auto cursor-pointer"
                initial={{ x: '-150vw', y: '50vh', rotate: -20, scale: 0.5 }}
                animate={{
                    x: 0,
                    y: '-10vh',
                    rotate: 0,
                    scale: [0.5, 1.2, 1]
                }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 10,
                    delay: 2.5,
                    duration: 3
                }}
                onClick={onClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative w-72 md:w-96 h-48 md:h-64 bg-white rounded-md shadow-2xl flex items-center justify-center p-6 border-4 border-[#FFD700]">
                    {/* Envelope flap aesthetic */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[144px] md:border-l-[192px] border-l-transparent border-r-[144px] md:border-r-[192px] border-r-transparent border-t-[90px] md:border-t-[120px] border-t-gray-200/80 drop-shadow-md z-10" />

                    <motion.div
                        className="text-center z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 4.5, duration: 1, type: "spring" }}
                    >
                        <p className="fancy-text text-2xl md:text-3xl text-[#FF416C] font-bold tracking-wider leading-relaxed bg-white/60 p-4 rounded-xl backdrop-blur-sm shadow-sm hover:bg-white/90 transition-all duration-300">
                            {text}
                        </p>
                    </motion.div>

                    <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[144px] md:border-l-[192px] border-l-transparent border-r-[144px] md:border-r-[192px] border-r-transparent border-b-[80px] md:border-b-[100px] border-b-gray-100 z-0" />
                </div>

                {/* Floating animation after arriving */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    );
};

export default FlyingLetter;
