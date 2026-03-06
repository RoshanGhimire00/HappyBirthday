import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart } from 'lucide-react';
import { useState } from 'react';

const photos = [
    { src: "/assets/Gallery/photo 1.jpg", message: "May all your small dreams be fulfilled, and may you always stay as happy as you were in your childhood. ✨\n\nतिम्रा साना सपना पूरा होस्, र बाल्यकालमा जस्तै खुशी सधैं रहोस्। ✨" },
    { src: "/assets/Gallery/photo 2.jpg", message: "Happy Birthday!!! May God bless you with endless joy, good health, and success in every step of life. ✨🌸\n\nजन्मदिनको शुभकामना !!!  भगवानले सधैं खुशी, राम्रो स्वास्थ्य र सफलताले भरिपूर्ण जीवन दिनुहोस्। ✨🌸" },
    { src: "/assets/Gallery/photo 3.jpg", message: "Every picture tells a story — may your journey ahead be filled with love, laughter, and countless beautiful memories. 🌸📸\n\nप्रत्येक तस्वीरले कथा बोल्छ — तिम्रो यात्रा सधैं प्रेम, हाँसो र अनगिन्ती सुन्दर सम्झनाले भरिपूर्ण रहोस्। 🌸📸" },
    { src: "/assets/Gallery/photo 4.jpg", message: "From today, let success lead your path. May every step bring growth, happiness, and fulfillment of your dreams. 🌸💫\n\nआजदेखि सफलता तिम्रो बाटो देखाओस्। प्रत्येक कदमले वृद्धि, खुशी र सपनाहरू पूरा गर्ने शक्ति ल्याओस्। 🌟✨" },
];

const PhotoGallery = ({ onClose, onFinish }) => {
    const [clickedPhotos, setClickedPhotos] = useState(new Set());
    const [activeMessage, setActiveMessage] = useState(null);

    const handlePhotoClick = (index, message) => {
        setActiveMessage(message);
        const newClicked = new Set(clickedPhotos);
        newClicked.add(index);
        setClickedPhotos(newClicked);
    };

    const handleCloseMessage = () => {
        setActiveMessage(null);
        // If all 4 photos clicked, finish the sequence after the message is dismissed
        if (clickedPhotos.size === 4) {
            setTimeout(() => {
                if (onFinish) onFinish();
            }, 6000);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Aesthetic background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px] pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white hover:text-[#FFD700] transition-all z-[110] bg-white/10 p-3 rounded-full cursor-pointer hover:bg-white/20 hover:rotate-90"
                >
                    <X size={28} />
                </button>

                <div className="max-w-7xl w-full">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-7xl fancy-text text-[#FFD700] glow-text flex items-center justify-center gap-4">
                            <Heart className="text-[#FF416C] animate-pulse" fill="#FF416C" />
                            Special Memories
                            <Heart className="text-[#FF416C] animate-pulse" fill="#FF416C" />
                        </h2>
                        <p className="text-white/60 mt-4 text-xs md:text-sm font-light tracking-[0.3em] uppercase">
                            Click Turn by turn as (1,2,3,4 ) each photo to unlock the final surprise ({clickedPhotos.size}/4)
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-2">
                        {photos.map((photo, index) => (
                            <motion.div
                                key={index}
                                className={`group relative h-60 md:h-80 rounded-2xl overflow-hidden border ${clickedPhotos.has(index) ? 'border-[#FFD700]' : 'border-white/10'} shadow-3xl cursor-pointer`}
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: (index % 2 === 0 ? -2 : 2)
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                    filter: clickedPhotos.has(index) ? 'none' : 'grayscale(50%)'
                                }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.6,
                                    type: "spring"
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    translateY: -5,
                                    borderColor: "rgba(255, 215, 0, 0.4)",
                                    zIndex: 20
                                }}
                                onClick={() => handlePhotoClick(index, photo.message)}
                            >
                                <img
                                    src={photo.src}
                                    alt={`Memory ${index + 1}`}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />

                                {clickedPhotos.has(index) && (
                                    <div className="absolute top-2 right-2 bg-[#FFD700] text-black p-1 rounded-full">
                                        <Sparkles size={16} />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div className="flex items-center gap-2 text-[#FFD700]">
                                        <Sparkles size={14} />
                                        <span className="text-xs font-bold tracking-widest uppercase">Memory {index + 1}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] tracking-widest uppercase italic">
                            Unlock all photos for the big celebration!
                        </div>
                    </motion.div>
                </div>

                {/* Custom Message Modal */}
                <AnimatePresence>
                    {activeMessage && (
                        <motion.div
                            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseMessage}
                        >
                            <motion.div
                                className="glass-panel p-8 md:p-12 rounded-3xl max-w-lg w-full text-center border border-[#FFD700]/30 shadow-[0_0_50px_rgba(255,215,0,0.2)]"
                                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.8, y: 20, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Sparkles className="mx-auto mb-6 text-[#FFD700]" size={40} />
                                <p className="text-xl md:text-2xl text-white leading-relaxed font-medium whitespace-pre-wrap">
                                    {activeMessage}
                                </p>
                                <button
                                    onClick={handleCloseMessage}
                                    className="mt-10 px-10 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full font-bold hover:scale-105 transition-transform cursor-pointer shadow-lg"
                                >
                                    Continue ✨
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};

export default PhotoGallery;
