import { motion } from 'framer-motion';
import { useState } from 'react';

function Projects() {
  // Split the title into individual letters for hover effect
  const title = "Projects";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Array of project data - replace with your actual projects
  const projects = [
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
      // demoLink: "https://koustubh.dev",
      technologies: ["React.js", "Redux", "Appwrite", "TypeScript"]
    },
    {
      title: "Expenser",
      description: "This is a Full Stack web application for recording and tracking your expenses with some more different functionalities.",
      image: "/src/assets/projects/ai-chat.jpg",
      github: "https://github.com/wurtz-codez/Expenser",
      // demoLink: "https://ai-chat-demo.vercel.app",
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
  ];
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dock-bg rounded-xl overflow-hidden backdrop-blur-lg max-w-sm mx-auto w-full"
            >
              <div 
                className="h-48 bg-gray-800 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(${project.image})`,
                  // Fallback in case image doesn't load
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
                  >
                    View on GitHub
                  </a>
                  
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500/30 px-4 py-2 rounded-lg text-sm hover:bg-opacity-50 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;