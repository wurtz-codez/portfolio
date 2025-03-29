import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let offset = 0;
    let time = 0;
    
    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create base gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      
      // Apply base gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create moving overlay gradient
      const overlayGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Calculate color stops with smooth transitions
      const colors = [
        { color: 'rgba(0, 255, 255, 0.1)', position: 0 },
        { color: 'rgba(0, 128, 255, 0.1)', position: 0.5 },
        { color: 'rgba(0, 255, 255, 0.1)', position: 1 }
      ];
      
      colors.forEach(({ color, position }) => {
        // Add slight variation to color opacity based on time
        const opacity = 0.1 + Math.sin(time + position * Math.PI) * 0.02;
        const adjustedColor = color.replace('0.1', opacity.toFixed(2));
        overlayGradient.addColorStop(position, adjustedColor);
      });
      
      // Apply moving overlay
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(offset, 0, canvas.width, canvas.height);
      
      // Update animation parameters
      offset = (offset + 0.3) % canvas.width;
      time += 0.01;
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default GradientBackground; 