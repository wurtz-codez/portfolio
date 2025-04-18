import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from './components/Dock';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import GradientBackground from './components/GradientBackground';
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

  const navigation = {
    home: () => scrollToSection('home'),
    about: () => scrollToSection('about'),
    skills: () => scrollToSection('skills'),
    projects: () => scrollToSection('projects'),
    resume: () => scrollToSection('resume'),
    contact: () => scrollToSection('contact'),
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white">
      <GradientBackground />
      
      <main className="flex-grow relative z-10">
        <section id="home" ref={sectionRefs.home}>
          <Home />
        </section>
        
        <section id="about" ref={sectionRefs.about}>
          <About />
        </section>
        
        <section id="skills" ref={sectionRefs.skills}>
          <Skills />
        </section>
        
        <section id="projects" ref={sectionRefs.projects}>
          <Projects />
        </section>
        
        <section id="resume" ref={sectionRefs.resume}>
          <Resume />
        </section>
        
        <section id="contact" ref={sectionRefs.contact} className="mb-32">
          <Contact />
        </section>
      </main>

      <AnimatePresence>
        {showDock && !isFooterVisible && (
          <motion.div
            initial={{ 
              scaleX: 0.3, 
              scaleY: 0.8,
              opacity: 0 
            }}
            animate={{ 
              scaleX: 1, 
              scaleY: 1,
              opacity: 1 
            }}
            exit={{ 
              scaleX: 0.3, 
              scaleY: 0.8,
              opacity: 0 
            }}
            transition={{ 
              type: "spring",
              stiffness: 180, 
              damping: 20,    
              mass: 1.2,      
              duration: 0.8   
            }}
            className="fixed bottom-5 left-0 right-0 z-50 flex justify-center items-center"
            style={{ 
              transformOrigin: "center center"
            }}
          >
            <Dock onNavigate={navigation} currentSection={currentSection} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {showScrollPrompt && (
        <motion.div 
          className="fixed bottom-8 left-0 right-0 mx-auto w-max text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white/50 text-sm">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto mt-2 flex justify-center">
            <motion.div 
              className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}

      {/* Footer with ref for visibility detection */}
      <div className="relative z-10 mt-0" ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default App;