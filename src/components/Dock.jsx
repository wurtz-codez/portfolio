import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

function Dock({ onNavigate, currentSection }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false); // New state for very small screens
  const [dockLoaded, setDockLoaded] = useState(false);
  const circleRef = useRef(null);
  
  // Animation states
  const circleSize = useMotionValue(0);
  const borderProgress = useMotionValue(0);
  const dockWidth = useMotionValue(0);
  const dockOpacity = useMotionValue(0);
  
  // Spring animations for faster transitions - ADJUSTED FOR 1.5 SECOND TOTAL
  const springCircleSize = useSpring(circleSize, { stiffness: 70, damping: 20 }); // increased stiffness for faster animation
  const springBorderProgress = useSpring(borderProgress, { stiffness: 45, damping: 15 }); // increased stiffness
  const springDockWidth = useSpring(dockWidth, { stiffness: 60, damping: 20 }); // increased stiffness
  const springDockOpacity = useSpring(dockOpacity, { stiffness: 70, damping: 15 }); // increased stiffness
  
  // Scroll progress tracking
  const { scrollY } = useScroll();
  
  // Animation thresholds based on scroll position - ADJUSTED FOR FASTER 1.5 SECOND ANIMATION
  const circleAppearThreshold = 150; // Reduced from 200 to 150
  const borderCompleteThreshold = 400; // Reduced from 600 to 400
  const expansionCompleteThreshold = 550; // Reduced from 800 to 550
  
  // Calculate final sizes based on mobile/desktop
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsSmallMobile(width <= 380); // For very narrow phone screens
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Setup animation sequence based on scroll
  useEffect(() => {
    const updateAnimationProgress = () => {
      const currentScroll = scrollY.get();
      
      // Step 1: Circle appears and grows (0-150px scroll)
      if (currentScroll <= circleAppearThreshold) {
        const progress = Math.max(0, currentScroll) / circleAppearThreshold;
        circleSize.set(progress * 60); // Max circle size is 60px
        borderProgress.set(0);
        dockWidth.set(0);
        dockOpacity.set(0);
        
        if (dockLoaded) setDockLoaded(false);
      }
      // Step 2: Border animation completes (150-400px scroll)
      else if (currentScroll <= borderCompleteThreshold) {
        const progress = (currentScroll - circleAppearThreshold) / 
                        (borderCompleteThreshold - circleAppearThreshold);
        circleSize.set(60); // Circle is full size
        borderProgress.set(progress);
        dockWidth.set(60); // Still just a circle
        dockOpacity.set(0);
        
        if (dockLoaded) setDockLoaded(false);
      }
      // Step 3: Dock expands (400-550px scroll)
      else if (currentScroll <= expansionCompleteThreshold) {
        const progress = (currentScroll - borderCompleteThreshold) / 
                        (expansionCompleteThreshold - borderCompleteThreshold);
        circleSize.set(60);
        borderProgress.set(1); // Border is complete
        
        // Responsive final width based on screen size
        let finalWidth;
        if (isSmallMobile) {
          finalWidth = 280; // Even smaller width for very narrow screens
        } else if (isMobile) {
          finalWidth = 320; // Smaller width for mobile
        } else {
          finalWidth = 400; // Regular width for desktop
        }
        
        dockWidth.set(60 + (progress * (finalWidth - 60))); // Expand from circle to full width
        dockOpacity.set(progress);
        
        if (progress >= 0.9 && !dockLoaded) {
          setDockLoaded(true); // Show icons once dock is nearly expanded
        }
      }
      // Beyond threshold: maintain full dock
      else {
        circleSize.set(60);
        borderProgress.set(1);
        
        // Responsive final width based on screen size
        if (isSmallMobile) {
          dockWidth.set(280);
        } else if (isMobile) {
          dockWidth.set(320);
        } else {
          dockWidth.set(400);
        }
        
        dockOpacity.set(1);
        
        if (!dockLoaded) {
          setDockLoaded(true);
        }
      }
    };
    
    const unsubscribe = scrollY.onChange(updateAnimationProgress);
    updateAnimationProgress(); // Initial call
    
    return () => unsubscribe();
  }, [scrollY, circleSize, borderProgress, dockWidth, dockOpacity, isMobile, isSmallMobile, dockLoaded]);
  
  // Dock items with responsive icon sizing
  const dockItems = [
    { icon: <FaHome size={isSmallMobile ? 16 : isMobile ? 18 : 22} />, label: 'Home', onClick: onNavigate.home },
    { icon: <FaUser size={isSmallMobile ? 16 : isMobile ? 18 : 22} />, label: 'About', onClick: onNavigate.about },
    { icon: <FaCode size={isSmallMobile ? 16 : isMobile ? 18 : 22} />, label: 'Skills', onClick: onNavigate.skills },
    { icon: <FaProjectDiagram size={isSmallMobile ? 16 : isMobile ? 18 : 22} />, label: 'Projects', onClick: onNavigate.projects },
    { icon: <FaFileAlt size={isSmallMobile ? 16 : isMobile ? 18 : 22} />, label: 'Resume', onClick: onNavigate.resume },
    { icon: <FaEnvelope size={isSmallMobile ? 16 : isMobile ? 18 : 22} />, label: 'Contact', onClick: onNavigate.contact },
  ];

  // Use this scale for subtle pop effect on the circle
  const popScale = useTransform(
    springCircleSize,
    [0, 30, 60],
    [0.8, 1.1, 1]
  );

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        ref={circleRef}
        style={{
          width: springDockWidth,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'rgba(15, 23, 42, 0.3)', // Changed back to original semi-transparent dark blue
          backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          scale: popScale,
          // Conditional rendering based on size to control visibility
          opacity: useTransform(springCircleSize, [0, 20], [0, 1])
        }}
      >
        {/* Circle border animation */}
        <motion.div
          className="absolute inset-0 z-0 border-3 border-transparent rounded-full"
          style={{
            borderTopColor: '#3b82f6', // Vibrant blue border
            borderRadius: 30,
            width: '100%',
            height: '100%',
            borderWidth: '3px',
            rotate: useTransform(
              springBorderProgress, 
              [0, 1], 
              [0, 360]
            ),
            opacity: useTransform(
              springBorderProgress,
              [0, 0.1, 1],
              [0.3, 0.8, 1]
            ),
            boxShadow: useTransform(
              springBorderProgress,
              [0, 0.5, 1],
              ['0 0 5px rgba(59, 130, 246, 0.3)', '0 0 15px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.7)']
            )
          }}
        />

        {/* Inner content/icons container */}
        <motion.div 
          className={`relative z-10 flex items-center justify-center ${
            isSmallMobile ? 'gap-2' : isMobile ? 'gap-3' : 'gap-6'
          }`}
          style={{ 
            opacity: springDockOpacity,
            scale: useTransform(
              springDockOpacity,
              [0, 1],
              [0.8, 1]
            )
          }}
        >
          <AnimatePresence>
            {dockLoaded && dockItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="relative flex flex-col items-center group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.25,
                  type: "spring",
                  stiffness: 400
                }}
                whileHover={{ scale: isSmallMobile ? 1.05 : isMobile ? 1.1 : 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.onClick}
              >
                <div className={`${
                  isSmallMobile ? 'p-1.5' : isMobile ? 'p-2' : 'p-2.5'
                } rounded-full cursor-pointer hover:bg-white/10 transition-colors`}>
                  {item.icon}
                </div>
                
                {/* Visible label only on mobile screens - smaller font for very small screens */}
                {isMobile && (
                  <span className={`${
                    isSmallMobile ? 'text-[8px]' : 'text-[10px]'
                  } mt-1 text-white/80 font-medium`}>
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip on hover - only on desktop/laptop */}
                <motion.span 
                  className={`absolute -bottom-6 ${isMobile ? 'hidden' : ''} text-xs whitespace-nowrap bg-black/70 px-2 py-1 rounded-md`}
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
                
                {/* Enhanced active indicator */}
                {currentSection === index + 1 && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 ${
                      isSmallMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'
                    } bg-blue-400 rounded-full`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)'
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dock;