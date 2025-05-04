import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from './components/Dock';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [showDock, setShowDock] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    resume: useRef(null),
    contact: useRef(null)
  };

  const footerRef = useRef(null);

  // Handle scroll events with smooth dock appearance and disappearance near footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const footerElement = footerRef.current;

      // Check if footer is in viewport
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const isFooterInView = footerRect.top < viewportHeight * 0.9;

        setIsFooterVisible(isFooterInView);
      }

      if (scrollPosition > 100 && !isFooterVisible) {
        setShowDock(true);
        setShowScrollPrompt(false);
      } else {
        setShowDock(false);
        setShowScrollPrompt(scrollPosition <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFooterVisible]);

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Get all section elements
      const sections = [
        sectionRefs.home.current,
        sectionRefs.about.current,
        sectionRefs.skills.current,
        sectionRefs.projects.current,
        sectionRefs.resume.current,
        sectionRefs.contact.current
      ];

      // Filter out null refs
      const validSections = sections.filter(section => section);

      // Determine which section is currently in view
      validSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (sectionName) => {
    const sectionRef = sectionRefs[sectionName];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Main content */}
      <div className="relative z-0">
        <Home ref={sectionRefs.home} />
        <About ref={sectionRefs.about} />
        <Skills ref={sectionRefs.skills} />
        <Projects ref={sectionRefs.projects} />
        <Resume ref={sectionRefs.resume} />
        <Contact ref={sectionRefs.contact} />
        <Footer ref={footerRef} />
      </div>

      {/* Dock - positioned above everything */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <AnimatePresence>
          {showDock && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Dock
                currentSection={currentSection}
                onNavigate={scrollToSection}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll prompt */}
      <AnimatePresence>
        {showScrollPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="text-white text-sm animate-bounce">
              Scroll to explore
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;