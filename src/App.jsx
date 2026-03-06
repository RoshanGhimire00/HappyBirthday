import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';
import Confetti from 'react-confetti';
import { playBirthdayTune } from './utils/music';
import GiftBox from './components/GiftBox';
import GlowingTree from './components/GlowingTree';
import FloatingBalloons from './components/FloatingBalloons';
import BackgroundParticles from './components/BackgroundParticles';
import FlyingLetter from './components/FlyingLetter';
import PhotoGallery from './components/PhotoGallery';
import SideBlasts from './components/SideBlasts';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [stage, setStage] = useState('gift'); // 'gift', 'celebration', 'envelope', 'gallery', 'final'
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenGift = () => {
    setIsOpen(true);
    playBirthdayTune();

    // Show celebration content after 1.5s
    setTimeout(() => {
      setShowContent(true);
      setStage('celebration');
    }, 1500);
  };

  const startGallerySequence = () => {
    setStage('gallery');
    setShowGallery(true);
  };

  const closeGallery = useCallback(() => {
    setShowGallery(false);
  }, []);

  const finishGallerySequence = useCallback(() => {
    setShowGallery(false);
    setStage('final');
  }, []);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
      <BackgroundParticles />

      {/* Stage 1: The Initial Gift Box */}
      {(stage === 'gift') && (
        <motion.div
          className="z-50 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {!isOpen && (
            <motion.h1
              className="text-4xl md:text-6xl text-center mb-12 fancy-text glow-text text-[#FFD700]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              A Surprise Awaits...
            </motion.h1>
          )}

          <div className="relative mt-8">
            <GiftBox isOpen={isOpen} onOpen={handleOpenGift} />

            {!isOpen && (
              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xl font-semibold flex items-center gap-2 text-white/90 glass-panel px-6 py-2 rounded-full mt-10">
                  <Sparkles size={20} className="text-[#FFD700]" />
                  Click to Celebrate!
                  <Sparkles size={20} className="text-[#FFD700]" />
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Stage 2 & 5: Celebrations */}
      {(stage === 'celebration' || stage === 'final') && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={true}
            numberOfPieces={stage === 'final' ? 600 : 250}
            colors={['#FF416C', '#FF4B2B', '#FFD700', '#00C9FF', '#92FE9D']}
          />
          <SideBlasts />
          <FloatingBalloons count={stage === 'final' ? 30 : 15} />

          <motion.div
            className="z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <GlowingTree />
            <motion.div
              className="glass-panel mt-12 p-8 md:p-12 rounded-3xl border border-white/20 text-center max-w-4xl mx-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h1 className="text-5xl md:text-8xl font-bold mb-6 fancy-text bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] glow-text leading-tight pt-2 pb-4">
                {stage === 'final' ? 'Lifetime Memories' : 'Happy Birthday'}
              </h1>
              <motion.p
                className="text-3xl md:text-5xl font-semibold text-white mt-4 tracking-wide"
              >
                Wishing you joy, success, and endless happiness today and always. <br /> <span className="text-[#FF416C] font-bold">Oseen Niroula</span>
              </motion.p>

              {stage === 'celebration' && (
                <motion.button
                  onClick={() => setStage('envelope')}
                  className="mt-8 px-8 py-3 bg-[#FF416C] text-white rounded-full font-bold shadow-lg hover:bg-[#FF4B2B] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >Click me to
                  See Your Memories ✨
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Stage 3: The Blinking Envelope */}
      {stage === 'envelope' && (
        <FlyingLetter
          text="You have 4 special memories to unlock! Click me!"
          onClick={startGallerySequence}
        />
      )}

      {showGallery && (
        <PhotoGallery
          onClose={closeGallery}
          onFinish={finishGallerySequence}
        />
      )}
    </div>
  );
}

export default App;
