import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Home() {
  const text = `Welcome to Koustubh's Portfolio`;
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [quote, setQuote] = useState(null);
  
  // Collection of developer/coder quotes
  const developerQuotes = [
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
    { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
    { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
    { text: "The most important property of a program is whether it accomplishes the intention of its user.", author: "C.A.R. Hoare" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  ];
  
  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * developerQuotes.length);
    return developerQuotes[randomIndex];
  };
  
  // Set initial quote on component mount and when refreshing
  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);
  
  // Handle click to change quote
  const handleQuoteClick = () => {
    setQuote(getRandomQuote());
  };

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
      {quote && (
        <div
          className="relative self-center mb-10 mt-2"
          style={{ width: "500px", height: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal" }} // Reduced width and height
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
            onClick={handleQuoteClick}
            className="p-3 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border border-theme-glass relative z-10 bg-glass backdrop-blur-md h-full flex flex-col justify-center"
          >
            <motion.p 
              className="italic text-gray-300 mb-1"
              key={quote.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: "calc(0.8rem + 0.3vw)", lineHeight: "1.2", wordWrap: "break-word" }} // Reduced font size
            >
              "{quote.text}"
            </motion.p>
            <motion.p 
              className="text-gray-400 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: "calc(0.65rem + 0.25vw)", lineHeight: "1.2", wordWrap: "break-word" }} // Reduced font size
            >
              — {quote.author}
            </motion.p>
            <p 
              className="text-xs text-gray-500 mt-1 text-center"
              style={{ fontSize: "calc(0.55rem + 0.15vw)", lineHeight: "1.2", wordWrap: "break-word" }} // Reduced font size
            >
              Click to see another quote
            </p>
          </motion.div>
        </div>
      )}
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