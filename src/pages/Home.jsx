import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SparklesCore from '../components/SparklesCore';

function Home() {
  const text = `Welcome to Koustubh's Portfolio`;
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  // Typing effect logic
  useEffect(() => {
    if (charIndex < text.length) {
      // Check if we're at the end of a word (space character or last character)
      const isEndOfWord = 
        charIndex === text.length - 1 || 
        text[charIndex] === ' ' || 
        (charIndex > 0 && text[charIndex - 1] === ' ');
      
      // Use different delays based on whether we're at the end of a word
      const delay = isEndOfWord ? 100 : 50; 

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowCursor(false), 500); // Remove cursor after typing finishes
    }
  }, [charIndex, text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center p-8 pt-16 bg-black"
    >
      <div className="flex-grow flex flex-col items-center justify-center relative w-full">
        <h1 className="text-6xl font-bold mb-6 text-white relative z-20">
          {displayedText}
          {showCursor && <span className="animate-blink">|</span>}
        </h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-xl text-gray-400 relative z-20 mb-8"
        >
          Full-stack Developer • UI/UX Designer • AI/ML Enthusiast
        </motion.p>

        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      <style jsx>{`
        .border-theme-glass {
          border-color: rgba(59, 130, 246, 0.5);
        }
        .bg-glass {
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </motion.div>
  );
}

export default Home;