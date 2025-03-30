import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Projects() {
  // Split the title into individual letters for hover effect
  const title = "Projects";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  // Memoize the projects data to prevent unnecessary re-renders
  const projects = useMemo(() => [
    {
      title: "Bazaario",
      description: "BAZAARIO is a multi-vendor platform built with the MERN stack that allows users to create and manage multiple websites for selling products.",
      image: "/src/assets/projects/ecommerce.jpg",
      github: "https://github.com/wurtz-codez/bazaario",
      technologies: ["React.js", "Chart.js", "Node.js",  "Express.js", "MongoDB", "JWT"]
    },
    {
      title: "Escape 404",
      description: `An interactive game with a leaderboard using React, Redux, and Appwrite, boosting user
                    engagement by 30%.`,
      image: "/src/assets/projects/portfolio.jpg",
      github: "https://github.com/wurtz-codez/Escape-404",
      technologies: ["React.js", "Redux", "Appwrite", "TypeScript"]
    },
    {
      title: "Expenser",
      description: "This is a Full Stack web application for recording and tracking your expenses with some more different functionalities.",
      image: "/src/assets/projects/ai-chat.jpg",
      github: "https://github.com/wurtz-codez/Expenser",
      technologies: ["React", "Node.js", "Mongo", "JWT", "Express.js"]
    },
    {
      title: "Career Convent School",
      description: `Developed a responsive frontend for a school organization using React.js, enhancing load speed by 40%.`,
      image: "/src/assets/projects/weather.jpg",
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
        <div className="relative h-[600px] w-full overflow-hidden" 
             style={{ perspective: '1200px', willChange: 'transform' }}>
          {/* Navigation arrows - always show both arrows */}
          <button 
            onClick={prevProject}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-dock-bg p-3 rounded-full hover:bg-hover-bg transition-colors"
            aria-label="Previous project"
          >
            <FaChevronLeft size={24} />
          </button>

          <button 
            onClick={nextProject}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-dock-bg p-3 rounded-full hover:bg-hover-bg transition-colors"
            aria-label="Next project"
          >
            <FaChevronRight size={24} />
          </button>

          {/* Project cards with performance optimizations */}
          <div className="w-full h-full flex items-center justify-center" 
               style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center', willChange: 'transform' }}>
            {projects.map((project, index) => {
              // Skip rendering completely hidden items
              if (itemStyles[index].visibility === 'hidden') {
                return null;
              }

              return (
                <div
                  key={index}
                  className="absolute bg-dock-bg rounded-xl overflow-hidden backdrop-blur-lg w-[350px] max-w-full cursor-pointer"
                  style={{ 
                    ...itemStyles[index],
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    willChange: 'transform, opacity',
                  }}
                  onClick={() => handleProjectClick(index)}
                >
                  <div 
                    className="h-48 bg-gray-800 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                      backgroundColor: '#1a1a1a'
                    }}
                  ></div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">
                      {project.description}
                    </p>

                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies && project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-white/10 px-2 py-1 rounded-full"
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
                        className="inline-block bg-hover-bg px-4 py-2 rounded-lg text-sm hover:bg-opacity-80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View on GitHub
                      </a>

                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-500/30 px-4 py-2 rounded-lg text-sm hover:bg-opacity-50 transition-colors"
                          onClick={(e) => e.stopPropagation()}
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