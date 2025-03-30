import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Projects() {
  // Split the title into individual letters for hover effect
  const title = "Projects";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  // Add state to track touch/drag events
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef(null);

  // Minimum distance to trigger a swipe (in pixels)
  const SWIPE_THRESHOLD = 50;

  // Memoize the projects data to prevent unnecessary re-renders
  const projects = useMemo(() => [
    {
      title: "Bazaario",
      description: "BAZAARIO is a multi-vendor platform built with the MERN stack that allows users to create and manage multiple websites for selling products.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      github: "https://github.com/wurtz-codez/bazaario",
      technologies: ["React.js", "Chart.js", "Node.js",  "Express.js", "MongoDB", "JWT"]
    },
    {
      title: "Escape 404",
      description: `An interactive game with a leaderboard using React, Redux, and Appwrite, boosting user
                    engagement by 30%.`,
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      github: "https://github.com/wurtz-codez/Escape-404",
      technologies: ["React.js", "Redux", "Appwrite", "TypeScript"]
    },
    {
      title: "Expenser",
      description: "This is a Full Stack web application for recording and tracking your expenses with some more different functionalities.",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      github: "https://github.com/wurtz-codez/Expenser",
      technologies: ["React", "Node.js", "Mongo", "JWT", "Express.js"]
    },
    {
      title: "Career Convent School",
      description: `Developed a responsive frontend for a school organization using React.js, enhancing load speed by 40%.`,
      image: "https://images.unsplash.com/photo-1600869009498-8d429f88d4f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      github: "https://github.com/wurtz-codez/Career-Convent-School-Rajgarh",
      demoLink: "https://ccsr.vercel.app",
      technologies: ["React.js", "Tailwind"]
    }
  ], []);

  const nextProject = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Handle keyboard navigation - optimized with useCallback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  // Handle touch/mouse start
  const handleDragStart = useCallback((clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  }, []);

  // Handle touch/mouse move
  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  }, [isDragging]);

  // Handle touch/mouse end
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const diff = currentX - startX;

    // Check if swipe distance exceeds threshold
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // Swiped right, go to previous
        prevProject();
      } else {
        // Swiped left, go to next
        nextProject();
      }
    }

    setIsDragging(false);
  }, [isDragging, currentX, startX, prevProject, nextProject]);

  // Handle wheel events for trackpad scrolling
  const handleWheel = useCallback((e) => {
    // Only prevent default and handle carousel navigation for horizontal scrolls
    // or when vertical scroll is significant and we're not scrolling the page
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    if (isHorizontalScroll) {
      // Handle horizontal scrolling for carousel
      if (e.deltaX > 70) {
        nextProject();
      } else if (e.deltaX < -70) {
        prevProject();
      }
      return true; // Handled horizontal scroll
    } else {
      // For vertical scrolls, only handle if they're intentional carousel interactions
      // Use a higher threshold for vertical to avoid interfering with normal page scrolling
      if (e.deltaY > 100) {
        nextProject();
        return true;
      } else if (e.deltaY < -100) {
        prevProject();
        return true;
      }
    }
    
    // Return false if we didn't handle the scroll
    return false;
  }, [nextProject, prevProject]);

  // Handle touch/mouse events - simplified approach
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Trackpad/mouse wheel events only
    const wheelHandler = (e) => {
      // Only prevent default if our handler actually used the scroll event
      if (handleWheel(e)) {
        e.preventDefault();
      }
    };

    // Touch events only (not interfering with mouse clicks)
    const touchStartHandler = (e) => handleDragStart(e.touches[0].clientX);
    const touchMoveHandler = (e) => handleDragMove(e.touches[0].clientX);
    const touchEndHandler = () => handleDragEnd();

    // Add event listeners - removing mouse drag events
    container.addEventListener('wheel', wheelHandler, { passive: false });
    container.addEventListener('touchstart', touchStartHandler);
    container.addEventListener('touchmove', touchMoveHandler);
    container.addEventListener('touchend', touchEndHandler);
    
    // Clean up
    return () => {
      container.removeEventListener('wheel', wheelHandler);
      container.removeEventListener('touchstart', touchStartHandler);
      container.removeEventListener('touchmove', touchMoveHandler);
      container.removeEventListener('touchend', touchEndHandler);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd, handleWheel]);

  // Optimize the carousel item style calculation with memoization
  const getCarouselItemStyles = useCallback((index) => {
    const totalProjects = projects.length;

    // Calculate the shortest path around the circle
    let angleDegree;
    const rawDiff = index - currentIndex;

    // Handle wrapping around the circle in the most efficient direction
    if (Math.abs(rawDiff) > totalProjects / 2) {
      // If the difference is more than half the number of projects,
      // it's shorter to go the other way around the circle
      angleDegree = rawDiff > 0 
        ? (rawDiff - totalProjects) * (360 / totalProjects) 
        : (rawDiff + totalProjects) * (360 / totalProjects);
    } else {
      angleDegree = rawDiff * (360 / totalProjects);
    }

    const angleRad = (angleDegree * Math.PI) / 180;

    // Optimized circular path calculations
    const radius = 300;
    const absoluteAngleDiff = Math.abs(angleDegree);

    // Only render items that are visible to the user (within 120 degrees)
    if (absoluteAngleDiff > 120) {
      return {
        visibility: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
      };
    }

    // Convert circular coordinates to Cartesian with fewer calculations
    const x = radius * Math.sin(angleRad);
    const z = radius * Math.cos(angleRad) - radius;

    // Simplified visual effect calculations
    const isActive = index === currentIndex;
    const isInFrontHalf = absoluteAngleDiff < 90;

    // Use simpler calculations for performance
    const opacity = isActive ? 1 : isInFrontHalf ? 0.8 - (absoluteAngleDiff / 180) : 0.2;
    const scale = isActive ? 1 : 0.85 - (absoluteAngleDiff / 360);

    // Reduce blur precision for better performance
    const blur = isActive ? 'none' : `blur(${Math.floor(absoluteAngleDiff / 15)}px)`;

    const rotationY = -angleDegree;
    const zIndex = 100 - Math.floor(absoluteAngleDiff);

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotationY}deg) scale(${scale})`,
      opacity,
      filter: blur,
      zIndex,
      visibility: 'visible',
    };
  }, [currentIndex, projects.length]);

  // Pre-calculate styles for visible items to avoid recalculation during render
  const itemStyles = useMemo(() => {
    return projects.map((_, index) => getCarouselItemStyles(index));
  }, [projects, getCarouselItemStyles]);

  // Handle click on project item - optimized with useCallback
  const handleProjectClick = useCallback((index) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-12 flex justify-center">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold text-center py-3 px-10 relative z-10 cursor-pointer"
          >
            {title.split('').map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: hoveredIndex === index ? 1.4 : 1,
                  y: hoveredIndex === index ? -5 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Optimized 3D Circular Carousel */}
        <div className="flex items-center justify-center w-full relative">
          {/* Navigation button - left side */}
          <button 
            onClick={prevProject}
            className="absolute left-0 md:left-2 top-1/2 transform -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors flex items-center justify-center z-20 border border-white/20"
            aria-label="Previous project"
          >
            <FaChevronLeft size={18} />
          </button>
          
          <div 
            ref={containerRef}
            className="relative h-[500px] sm:h-[600px] w-full max-w-[85%] sm:max-w-[90%] mx-auto overflow-hidden touch-pan-x" 
            style={{ 
              perspective: '1200px', 
              willChange: 'transform',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {/* Project cards with performance optimizations */}
            <div 
              className="w-full h-full flex items-center justify-center" 
              style={{ 
                transformStyle: 'preserve-3d', 
                transformOrigin: 'center center', 
                willChange: 'transform',
              }}
            >
              {projects.map((project, index) => {
                // Skip rendering completely hidden items
                if (itemStyles[index].visibility === 'hidden') {
                  return null;
                }

                return (
                  <div
                    key={index}
                    className="absolute glass-card rounded-xl overflow-hidden w-[300px] sm:w-[350px] max-w-[85%] sm:max-w-full"
                    style={{ 
                      ...itemStyles[index],
                      transformStyle: 'preserve-3d',
                      transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      willChange: 'transform, opacity',
                      pointerEvents: isDragging ? 'none' : 'auto',
                      cursor: isDragging ? 'grabbing' : 'pointer',
                      background: 'rgba(20, 20, 35, 0.5)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    onClick={() => !isDragging && handleProjectClick(index)}
                  >
                    <div 
                      className="h-40 sm:h-52 bg-cover bg-center relative overflow-hidden" 
                      style={{ 
                        backgroundImage: `url(${project.image})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,35,0.9)] to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <h3 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{project.title}</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-200 mb-4 text-sm">
                        {project.description}
                      </p>

                      {/* Technology tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies && project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#24292F] backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2F363D] transition-all transform hover:scale-105 shadow-lg shadow-black/30 text-center"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          View on GitHub
                        </a>

                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual indicator for swipe direction on mobile */}
            {isDragging && (
              <div 
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
                style={{ 
                  opacity: Math.min(1, Math.abs(currentX - startX) / 100) * 0.5 
                }}
              >
                <div 
                  className="text-white text-6xl" 
                  style={{ 
                    transform: `translateX(${(currentX - startX) / 3}px)`,
                    opacity: Math.min(0.8, Math.abs(currentX - startX) / 200)
                  }}
                >
                  {currentX - startX > 0 ? <FaChevronLeft /> : <FaChevronRight />}
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation button - right side */}
          <button 
            onClick={nextProject}
            className="absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors flex items-center justify-center z-20 border border-white/20"
            aria-label="Next project"
          >
            <FaChevronRight size={18} />
          </button>
        </div>

        {/* Optimized pagination indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {projects.map((_, index) => (
            <button 
              key={index}
              onClick={() => handleProjectClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;