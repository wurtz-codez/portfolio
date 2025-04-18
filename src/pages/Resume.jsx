import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Resume() {
  const resumePdfUrl = "/Koustubh_Pande_Resume.pdf";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    const checkPdf = async () => {
      try {
        const response = await fetch(resumePdfUrl);
        if (response.ok) {
          setPdfLoaded(true);
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    
    checkPdf();
  }, [resumePdfUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = "Koustubh_Pande_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const title = "Resume";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 flex items-center justify-center"
    >
      <div className="max-w-4xl w-full">
        <div className="relative mb-12 flex justify-center">
          <div className="moving-border-container">
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
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-dock-bg/50 p-8 rounded-xl backdrop-blur-md border border-white/20 shadow-xl"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mb-8 overflow-hidden rounded-lg bg-white relative"
            style={{ height: "70vh" }}
          >
            {pdfLoaded ? (
              <>
                <div className="w-full h-full relative">
                  <object
                    data={resumePdfUrl}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className="w-full h-full filter blur-md"
                  >
                    <p className="p-4 text-black text-center">
                      Your browser doesn't support PDF embedding. You can 
                      <a href={resumePdfUrl} className="text-blue-600 underline mx-1">
                        download the PDF
                      </a>
                      instead.
                    </p>
                  </object>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-6">
                    <div className="bg-cyan bg-opacity-60 p-6 rounded-lg max-w-md text-center">
                      <h3 className="text-2xl font-bold mb-2">Preview Blurred</h3>
                      <p className="mb-4">This is a blurred preview of my resume. Please download for a clear view.</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-800">Loading resume...</p>
              </div>
            )}
          </motion.div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#0284c7" }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg border border-slate-700"
              onClick={handleDownload}
            >
              Download Resume
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Resume;