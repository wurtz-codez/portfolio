import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
      className="min-h-screen flex flex-col items-center p-8 pt-16"
    >
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-6">
          {displayedText}
          {showCursor && <span className="animate-blink">|</span>}
        </h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-xl text-gray-400"
        >
          Full-stack Developer • UI/UX Designer • AI/ML Enthusiast
        </motion.p>
      </div>
      <style jsx>{`
        .border-theme-glass {
          border-color: rgba(59, 130, 246, 0.5); /* Themed border color (blue with transparency) */
        }
        .bg-glass {
          background: rgba(255, 255, 255, 0.1); /* Semi-transparent white background */
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        }
      `}</style>
    </motion.div>
  );
}

export default Home;