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

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [showDock, setShowDock] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    resume: useRef(null),
    contact: useRef(null)
  };

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
    <div className="relative min-h-screen text-white">
      <GradientBackground />
      
      <main className="relative z-10">
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
        
        <section id="contact" ref={sectionRefs.contact}>
          <Contact />
        </section>
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
      
      {showScrollPrompt && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
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
    </div>
  );
}

export default App;