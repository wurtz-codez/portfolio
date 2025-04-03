import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaAws, FaGithub, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiRedux, SiNextdotjs, SiTypescript, SiFirebase, SiJest, SiWebpack, SiCplusplus, SiPostman, SiJupyter, SiFramer } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [columns, setColumns] = useState(5); // Default to 5 columns
  
  // Create refs for each row
  const rowsRef = useRef([]);
  const containerRef = useRef(null);
  
  // Handle GSAP import and initialization
  useEffect(() => {
    // Dynamically import GSAP to avoid server-side rendering issues
    const loadGsap = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Update columns based on window width
        const updateColumns = () => {
          if (window.innerWidth < 640) setColumns(2);
          else if (window.innerWidth < 768) setColumns(3);
          else if (window.innerWidth < 1024) setColumns(4);
          else setColumns(5);
        };
        
        // Initial column setup
        updateColumns();
        
        // Add resize listener
        window.addEventListener('resize', updateColumns);
        
        // Clear any existing animations
        rowsRef.current.forEach(row => {
          if (row) {
            gsap.killTweensOf(row);
          }
        });
        
        // Animate each row with alternating directions
        rowsRef.current.forEach((row, index) => {
          if (!row) return;
          
          const direction = index % 2 === 0 ? -1 : 1; // Alternate direction
          
          gsap.fromTo(
            row.children,
            {
              x: direction * 50,
              opacity: 0,
              rotateY: direction * 45, // Add a 3D rotation effect
            },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom center",
                toggleActions: "play none none reverse",
                once: false,
                markers: false,
              }
            }
          );
        });
        
        // Make the title animation trigger immediately when Skills section is in view
        gsap.fromTo(
          ".skills-title-container",
          { opacity: 0, y: -50, scale: 0.8, rotateX: -30 }, // Add scale and 3D rotation
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)", // Elastic easing for a bouncy effect
            scrollTrigger: {
              trigger: ".skills-title-container",
              start: "top bottom",
              toggleActions: "play none none none",
              once: true
            }
          }
        );

        // Add a subtle floating animation to skill cards
        rowsRef.current.forEach(row => {
          if (!row) return;
          gsap.to(row.children, {
            y: "+=10",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          });
        });

        return () => {
          // Cleanup ScrollTrigger instances and event listeners
          window.removeEventListener('resize', updateColumns);
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      } catch (error) {
        console.error("Error loading GSAP:", error);
      }
    };
    
    loadGsap();
  }, [activeCategory]); // Re-run when category changes
  
  const title = "Skills";
  
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'languages', name: 'Languages' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'tools', name: 'Tools' },
    { id: 'design', name: 'Design' },
  ];

  const skillsData = [
    // Languages
    { icon: <FaJs size={40} color="#F7DF1E" />, name: 'JavaScript', category: 'languages' },
    { icon: <SiTypescript size={40} color="#3178C6" />, name: 'TypeScript', category: 'languages' },
    { icon: <FaPython size={40} color="#3776AB" />, name: 'Python', category: 'languages' },
    { icon: <FaJava size={40} color="#007396" />, name: 'Java', category: 'languages' },
    { icon: <SiCplusplus size={40} color="#00599C" />, name: 'C++', category: 'languages' },
    
    // Frontend
    { icon: <FaReact size={40} color="#61DAFB" />, name: 'React', category: 'frontend' },
    { icon: <SiRedux size={40} color="#764ABC" />, name: 'Redux', category: 'frontend' },
    { icon: <FaHtml5 size={40} color="#E34F26" />, name: 'HTML5', category: 'frontend' },
    { icon: <FaCss3Alt size={40} color="#1572B6" />, name: 'CSS3', category: 'frontend' },
    { icon: <SiTailwindcss size={40} color="#06B6D4" />, name: 'Tailwind CSS', category: 'frontend' },
    
    // Backend
    { icon: <FaNodeJs size={40} color="#339933" />, name: 'Node.js', category: 'backend' },
    
    // Database
    { icon: <SiMongodb size={40} color="#47A248" />, name: 'MongoDB', category: 'database' },
    { icon: <SiFirebase size={40} color="#FFCA28" />, name: 'Firebase', category: 'database' },
    
    // Tools
    { icon: <FaGitAlt size={40} color="#F05032" />, name: 'Git', category: 'tools' },
    { icon: <FaGithub size={40} color="#181717" />, name: 'GitHub', category: 'tools' },
    { icon: <SiPostman size={40} color="#FF6C37" />, name: 'Postman', category: 'tools' },
    { icon: <VscCode size={40} color="#007ACC" />, name: 'VS Code', category: 'tools' },
    { icon: <SiJupyter size={40} color="#F37626" />, name: 'Jupyter Notebook', category: 'tools' },
    
    // Design
    { icon: <FaFigma size={40} color="#F24E1E" />, name: 'Figma', category: 'design' },
    { icon: <SiFramer size={40} color="#0055FF" />, name: 'Framer', category: 'design' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);
    
  // Group skills into rows based on columns state
  const skillRows = [];
  for (let i = 0; i < filteredSkills.length; i += columns) {
    skillRows.push(filteredSkills.slice(i, i + columns));
  }

  // Hover animation variants for individual skill cards - Reduced intensity
  const cardVariants = {
    hover: {
      scale: 1.05, // Reduced from 1.1 to 1.05
      rotate: [0, -1, 1, -1, 0], // Reduced rotation angles from [-2, 2] to [-1, 1]
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Reduced shadow size and opacity
      borderColor: "rgba(255, 255, 255, 0.25)",
      transition: {
        scale: { duration: 0.25, ease: "easeOut" }, // Faster transition
        rotate: { duration: 0.2, ease: "easeInOut" }, // Faster rotation
      }
    }
  };

  // Icon animation variants - Reduced intensity
  const iconVariants = {
    hover: {
      scale: 1.1, // Reduced from 1.2 to 1.1
      rotate: 3, // Reduced from 5 to 3 degrees
      y: -3, // Reduced from -5 to -3
      transition: { 
        type: "spring", 
        stiffness: 250, // Reduced stiffness for gentler animation
        damping: 10 // Added damping to reduce oscillation
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto">
        {/* Added a class for the title container */}
        <div className="relative mb-12 flex justify-center skills-title-container"> 
          <motion.h1
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

        {/* Category Filter - Add a class for this section */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 skills-categories">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid - We're already accessing these rows via ref */}
        <div className="space-y-8"> {/* Increased spacing between rows for better visual separation */}
          {skillRows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              ref={el => rowsRef.current[rowIndex] = el}
            >
              {row.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  variants={cardVariants}
                  whileHover="hover"
                  className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col items-center justify-center overflow-hidden"
                >
                  <motion.div variants={iconVariants}>
                    {skill.icon}
                  </motion.div>
                  <span className="mt-3 text-center font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Skills;