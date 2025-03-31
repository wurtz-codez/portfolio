import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDiscord, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  
  // Split the title into individual letters for hover effect
  const title = "Contact Me";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    // Use EmailJS to send the email
    emailjs.sendForm(
      'service_gz3zd5u', // Service ID from EmailJS dashboard
      'template_5aisqe4', // EmailJS template ID
      formRef.current,
      'qqzfyyoYTwawQqVyV' // EmailJS public key
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setFormStatus('success');
      // Reset the form
      formRef.current.reset();
    })
    .catch((error) => {
      console.error('Failed to send email:', error.text);
      setFormStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const socialLinks = [
    {
      icon: <FaGithub size={24} />,
      text: 'GitHub',
      url: 'https://github.com/wurtz-codez',
      color: 'hover:text-gray-300'
    },
    {
      icon: <FaLinkedin size={24} />,
      text: 'LinkedIn',
      url: 'https://linkedin.com/in/koustubh-pande',
      color: 'hover:text-blue-400'
    },
    {
      icon: <FaDiscord size={24} />,
      text: 'Discord',
      url: 'https://discord.gg/koustubhpande',
      color: 'hover:text-indigo-400'
    },
    {
      icon: <FaEnvelope size={24} />,
      text: 'Email',
      url: 'mailto:koustubhpande021@gmail.com',
      color: 'hover:text-red-400'
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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.text}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ${link.color}`}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {formStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center"
          >
            Message sent successfully! I'll get back to you soon.
          </motion.div>
        )}
        
        {formStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-center"
          >
            Failed to send message. Please try again later or contact me directly at koustubhpande021@gmail.com.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Contact;