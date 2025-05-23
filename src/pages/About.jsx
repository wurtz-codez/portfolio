import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function About() {
  // Split the title into individual letters for hover effect
  const title = "About Me";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // State for the animated dots
  const [dots, setDots] = useState("");
  
  // Effect to animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 4) return "";
        return prevDots + ".";
      });
    }, 500); // Change dot every 500ms
    
    return () => clearInterval(interval);
  }, []);
  
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

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
          {/* Profile Section - Order 1 on mobile, 2 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl order-1 md:order-2"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20"
              >
                <img
                  src="/profile_ghibli.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Koustubh Pande</h2>
              <p className="text-gray-400">Developer | Designer</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📍</span>
                <span>Bhopal (M.P.), India</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">💼</span>
                <span>Sophomore, Free Lancer</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-400">🎓</span>
                <span>Vellore Institute of Technology</span>
              </div>
            </div>
          </motion.div>

          {/* Bio Section - Order 2 on mobile, 1 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl order-2 md:order-1"
          >
            <h2 className="text-2xl font-bold mb-6">
              Ayo, that's me<span className="inline-block w-[3ch]">{dots}</span>
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                A passionate Full Stack Developer with a keen interest in creating
                beautiful and functional web applications. My journey in software
                development began with a curiosity about how things work on the
                internet, which led me to explore various technologies and frameworks.
              </p>
              <p>
                I specialize in building modern web applications using React, Node.js,
                and various other cutting-edge technologies. I believe in writing clean,
                maintainable code and creating intuitive user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                participating in hackathons or sharing my knowledge through
                technical writing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;