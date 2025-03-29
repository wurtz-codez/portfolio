import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
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
      
      // Create base gradient - pure black
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(1, '#000000');
      
      // Apply base gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create moving gradient layer with smooth transitions
      const drawSmoothGradient = () => {
        // Reduce animation speed
        const angle = time * 0.28; // Decreased from 0.35 to 0.28 (20% slower)
        
        // Create more spread-out movement across the screen
        const xOffset = Math.cos(angle) * canvas.width * 0.7;
        const yOffset = Math.sin(angle * 1.3) * canvas.height * 0.7;
        
        // Start and end points for the gradient
        const x1 = canvas.width * 0.5 + xOffset;
        const y1 = canvas.height * 0.5 + yOffset;
        const x2 = canvas.width * 0.5 - xOffset * 0.7;
        const y2 = canvas.height * 0.5 - yOffset * 0.7;
        
        const gradientOverlay = ctx.createLinearGradient(x1, y1, x2, y2);
        
        // Create darker color stops with much less opacity for a predominantly black theme
        gradientOverlay.addColorStop(0, 'rgba(0, 0, 0, 0.95)');               // Almost pure black
        gradientOverlay.addColorStop(0.3, 'rgba(3, 7, 18, 0.92)');            // Very dark blue, almost black
        gradientOverlay.addColorStop(0.5, 'rgba(12, 34, 59, 0.5)');           // Very dark blue, reduced opacity
        gradientOverlay.addColorStop(0.7, 'rgba(6, 55, 100, 0.3)');           // Darker blue, reduced opacity
        gradientOverlay.addColorStop(0.85, 'rgba(3, 38, 91, 0.25)');          // Darker blue, reduced opacity
        gradientOverlay.addColorStop(0.95, 'rgba(8, 45, 78, 0.2)');           // Darker cyan-blue, reduced opacity
        gradientOverlay.addColorStop(1, 'rgba(6, 82, 112, 0.15)');            // Darker cyan, further reduced opacity
        
        ctx.fillStyle = gradientOverlay;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      
      // Draw subtle accent glow that follows the main gradient
      const drawAccentGlow = () => {
        // Create wide, soft glow
        const radius = Math.min(canvas.width, canvas.height) * 1.5;
        // Reduce animation speed for accent glow
        const angle = time * 0.12; // Decreased from 0.15 to 0.12 (20% slower)
        const xOffset = Math.cos(angle * 0.7) * canvas.width * 0.5;
        const yOffset = Math.sin(angle * 0.9) * canvas.height * 0.5;
        
        // Position the glow around the screen
        const centerX = canvas.width * 0.5 + xOffset;
        const centerY = canvas.height * 0.5 + yOffset;
        
        const radialGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius
        );
        
        // Reduce the pulse frequency
        const pulseIntensity = 0.08 + Math.sin(time * 0.24) * 0.03; // Decreased from 0.3 to 0.24 (20% slower)
        
        radialGradient.addColorStop(0, `rgba(14, 95, 133, ${pulseIntensity})`);  // Darker cyan-blue center
        radialGradient.addColorStop(0.2, 'rgba(6, 82, 112, 0.05)');              // Darker cyan fade, reduced opacity
        radialGradient.addColorStop(0.5, 'rgba(8, 45, 78, 0.02)');               // Dimmer blue-cyan, further reduced
        radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');                       // Transparent
        
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      
      // Execute our drawing functions
      drawSmoothGradient();
      drawAccentGlow();
      
      // Reduce the time increment for slower overall animation
      time += 0.01; // Decreased from 0.0125 to 0.01 (20% slower)
      
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