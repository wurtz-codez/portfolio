import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Ayo, that's me...</h2>
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
                participating in hackathons, or sharing my knowledge through
                technical writing.
              </p>
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20"
              >
                <img
                  src="src/assets/logos/profile_ghibli.jpg"
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
                <span>Indore (M.P.), India</span>
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
        </div>
      </div>
    </motion.div>
  );
}

export default About;