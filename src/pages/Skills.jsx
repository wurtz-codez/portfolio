import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiRedux, SiNextdotjs, SiTypescript, SiFirebase, SiJest, SiWebpack } from 'react-icons/si';

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Split the title into individual letters for hover effect
  const title = "Skills";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'tools', name: 'Tools' },
    { id: 'cloud', name: 'Cloud' }
  ];

  const skillsData = [
    // Frontend
    { icon: <FaReact size={40} color="#61DAFB" />, name: 'React', category: 'frontend' },
    { icon: <SiRedux size={40} color="#764ABC" />, name: 'Redux', category: 'frontend' },
    { icon: <FaHtml5 size={40} color="#E34F26" />, name: 'HTML5', category: 'frontend' },
    { icon: <FaCss3Alt size={40} color="#1572B6" />, name: 'CSS3', category: 'frontend' },
    { icon: <FaJs size={40} color="#F7DF1E" />, name: 'JavaScript', category: 'frontend' },
    { icon: <SiTypescript size={40} color="#3178C6" />, name: 'TypeScript', category: 'frontend' },
    { icon: <SiTailwindcss size={40} color="#06B6D4" />, name: 'Tailwind CSS', category: 'frontend' },
    { icon: <SiNextdotjs size={40} color="#000000" />, name: 'Next.js', category: 'frontend' },
    
    // Backend
    { icon: <FaNodeJs size={40} color="#339933" />, name: 'Node.js', category: 'backend' },
    { icon: <FaPython size={40} color="#3776AB" />, name: 'Python', category: 'backend' },
    { icon: <FaJava size={40} color="#007396" />, name: 'Java', category: 'backend' },
    
    // Database
    { icon: <SiMongodb size={40} color="#47A248" />, name: 'MongoDB', category: 'database' },
    { icon: <SiPostgresql size={40} color="#4169E1" />, name: 'PostgreSQL', category: 'database' },
    { icon: <SiFirebase size={40} color="#FFCA28" />, name: 'Firebase', category: 'database' },
    
    // Tools
    { icon: <FaGitAlt size={40} color="#F05032" />, name: 'Git', category: 'tools' },
    { icon: <FaDocker size={40} color="#2496ED" />, name: 'Docker', category: 'tools' },
    { icon: <SiWebpack size={40} color="#8DD6F9" />, name: 'Webpack', category: 'tools' },
    { icon: <SiJest size={40} color="#C21325" />, name: 'Jest', category: 'tools' },
    
    // Cloud
    { icon: <FaAws size={40} color="#FF9900" />, name: 'AWS', category: 'cloud' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8"
    >
      <div className="max-w-6xl mx-auto">
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill.icon}
              </motion.div>
              <span className="mt-3 text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Icons */}
        <div className="mt-16 overflow-hidden">
          <motion.div
            className="flex space-x-8"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear"
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-16 mx-8">
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={`${index}-${i}`}
                    className="text-4xl opacity-60"
                    whileHover={{ opacity: 1, scale: 1.2 }}
                  >
                    {skill.icon}
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Skills;