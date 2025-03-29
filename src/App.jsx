import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from './components/Dock';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [showDock, setShowDock] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = "Hello, I'm Koustubh";
  const typingSpeed = 100; // ms per character
  const homeRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(prev => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll events with smooth dock appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 100) {
        setShowDock(true);
        setShowScrollPrompt(false);
      } else {
        setShowDock(false);
        setShowScrollPrompt(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    const sections = document.querySelectorAll('section');
    sections[section - 1]?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(section);
  };

  const navigation = {
    home: () => scrollToSection(1),
    about: () => scrollToSection(2),
    skills: () => scrollToSection(3),
    projects: () => scrollToSection(4),
    resume: () => scrollToSection(5),
    contact: () => scrollToSection(6),
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <main className="relative z-10">
        <section ref={homeRef} className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-6xl font-bold mb-8"
            >
              {typedText}
            </motion.h1>
            {showScrollPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="text-xl text-gray-400"
              >
                Scroll down to explore
              </motion.div>
            )}
          </div>
        </section>

        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <AnimatePresence>
        {showDock && (
          <motion.div
            initial={{ scale: 0.1, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.1, y: 100, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.5
            }}
            className="dock-container"
          >
            <Dock onNavigate={navigation} currentSection={currentSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;