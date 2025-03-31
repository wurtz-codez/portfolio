import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDiscord, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';

// Final adjustment for the StyledButton component
const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 25px;
    border: 0;
    position: relative;
    overflow: hidden;
    border-radius: 20px; /* Exactly matching the GlassMorphCard border radius */
    transition: all 0.8s ease;
    font-weight: bold;
    cursor: pointer;
    color: white;
    z-index: 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    width: 85%; /* Further reduced width for better proportion */
    /* Using the hover design for normal state */
    background: ${props => props.disabled ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.9)'};
    backdrop-filter: blur(5px);
    opacity: ${props => props.disabled ? '0.7' : '1'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .button:hover {
    /* Using the normal design for hover state */
    background: ${props => props.disabled ? 'rgba(30, 41, 59, 0.7)' : 'rgba(30, 41, 59, 0.8)'};
    color: white;
    transition-delay: 0.2s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  .button:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.97)'};
  }

  .hoverEffect {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
  }

  .hoverEffect div {
    /* Using the hover gradient for normal state */
    background: linear-gradient(
      90deg, 
      rgba(15, 23, 42, 1) 0%, 
      rgba(29, 78, 216, 1) 50%, 
      rgba(15, 23, 42, 1) 100%
    );
    border-radius: 40rem;
    width: 10rem;
    height: 10rem;
    transition: 1.5s ease;
    filter: blur(20px);
    animation: effect infinite 10s linear;
    opacity: 0.8;
  }

  .button:hover .hoverEffect div {
    /* Using the normal gradient for hover state */
    width: 12rem;
    height: 12rem;
    background: linear-gradient(
      90deg,
      rgba(14, 16, 21, 1) 0%,
      rgba(30, 58, 138, 1) 50%,
      rgba(15, 23, 42, 1) 100%
    );
    transition-delay: 0.3s;
    filter: blur(25px);
    opacity: 0.7;
  }

  @keyframes effect {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Enhanced glassmorphism style for cards
const GlassMorphCard = styled(motion.div)`
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 15px rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.4),
      inset 0 0 20px rgba(255, 255, 255, 0.07);
    transform: translateY(-5px);
  }
`;

function Contact() {
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  
  const title = "Contact Me";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null); // Fixed missing closing parenthesis here
    
    emailjs.sendForm(
      'service_gz3zd5u',
      'template_5aisqe4',
      formRef.current,
      'qqzfyyoYTwawQqVyV'
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setFormStatus('success');
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
          {/* Contact Form - Using enhanced glassmorphism */}
          <GlassMorphCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full px-4 py-2 bg-slate-900/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-2 bg-slate-900/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-slate-900/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              {/* Updated styled button */}
              <StyledButton disabled={isSubmitting}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <div className="hoverEffect">
                    <div />
                  </div>
                </button>
              </StyledButton>
            </form>
          </GlassMorphCard>

          {/* Social Links - Using enhanced glassmorphism */}
          <GlassMorphCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8"
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
                  className={`flex items-center space-x-4 p-4 rounded-lg bg-slate-900/30 hover:bg-slate-800/50 transition-all duration-300 ${link.color} border border-white/5 hover:border-white/10`}
                  whileHover={{ scale: 1.02 }}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </motion.a>
              ))}
            </div>
          </GlassMorphCard>
        </div>

        {formStatus === 'success' && (
          <GlassMorphCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 border-green-500/30 text-center"
          >
            Message sent successfully! I'll get back to you soon.
          </GlassMorphCard>
        )}
        
        {formStatus === 'error' && (
          <GlassMorphCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 border-red-500/30 text-center"
          >
            Failed to send message. Please try again later or contact me directly at koustubhpande021@gmail.com.
          </GlassMorphCard>
        )}
      </div>
    </motion.div>
  );
}

export default Contact;