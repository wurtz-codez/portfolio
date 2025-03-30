import { useEffect, useRef, useState } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef(null);
  const [isEntering, setIsEntering] = useState(true);
  const enteringTimeRef = useRef(0);
  const enteringDuration = 4.0; // Increased from 2.5 to 4.0 seconds for slower rotation
  const lastEnteringStateRef = useRef(true); // Track the previous state
  const transitionStartTimeRef = useRef(null); // Time when transition started
  const transitionDuration = 0.8; // Duration of transition in seconds

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let startTime = performance.now();

    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Animation loop
    const animate = (currentTime) => {
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
        // Calculate elapsed time for entrance animation
        const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
        enteringTimeRef.current = elapsedTime;

        // Check if we should still be in entering mode
        if (isEntering && elapsedTime >= enteringDuration) {
          setIsEntering(false);
          transitionStartTimeRef.current = elapsedTime; // Record when transition begins
        }

        // Detect state change
        if (lastEnteringStateRef.current !== isEntering) {
          transitionStartTimeRef.current = elapsedTime;
          lastEnteringStateRef.current = isEntering;
        }

        // Calculate transition blend factor (0 to 1)
        let transitionBlend = 0;
        if (transitionStartTimeRef.current !== null) {
          const timeSinceTransition = elapsedTime - transitionStartTimeRef.current;
          transitionBlend = Math.min(timeSinceTransition / transitionDuration, 1);
        }

        // Determine angle based on whether we're in entrance animation or normal animation
        // Always calculate both angles to enable smooth interpolation
        const entranceProgress = Math.min(elapsedTime / enteringDuration, 1);
        const entranceAngle = entranceProgress * Math.PI * 1.5; // 3/4 rotation (1.5π radians)

        // Change normal animation to start at 1/2 rotation instead of 3/4
        const entryEndAngle = Math.PI * 1.2;
        const normalAngle = entryEndAngle + time * 0.25; // Increased from 0.17 to 0.2 for faster rotation

        // Blend angles for smooth transition
        let angle;
        if (isEntering) {
          angle = entranceAngle;
        } else {
          // When exiting the entering state, blend from entrance angle to normal angle
          if (transitionBlend < 1) {
            angle = entranceAngle * (1 - transitionBlend) + normalAngle * transitionBlend;
          } else {
            angle = normalAngle;
          }
        }

        // Create more spread-out movement across the screen
        let xOffset, yOffset;

        if (isEntering) {
          // During entrance: start from edge and spiral inward
          const distanceFromCenter = 1 - entranceProgress;
          xOffset = Math.cos(angle) * canvas.width * 0.7 * distanceFromCenter;
          yOffset = Math.sin(angle) * canvas.height * 0.7 * distanceFromCenter;
        } else {
          if (transitionBlend < 1) {
            // During transition: blend from entrance position to normal position
            const distanceFromCenter = 1 - entranceProgress;
            const entranceX = Math.cos(entranceAngle) * canvas.width * 0.7 * distanceFromCenter;
            const entranceY = Math.sin(entranceAngle) * canvas.height * 0.7 * distanceFromCenter;

            const normalX = Math.cos(normalAngle) * canvas.width * 0.7;
            const normalY = Math.sin(normalAngle * 1.3) * canvas.height * 0.7;

            xOffset = entranceX * (1 - transitionBlend) + normalX * transitionBlend;
            yOffset = entranceY * (1 - transitionBlend) + normalY * transitionBlend;
          } else {
            // Normal animation
            xOffset = Math.cos(angle) * canvas.width * 0.7;
            yOffset = Math.sin(angle * 1.3) * canvas.height * 0.7;
          }
        }

        // Start and end points for the gradient
        const x1 = canvas.width * 0.5 + xOffset;
        const y1 = canvas.height * 0.5 + yOffset;
        const x2 = canvas.width * 0.5 - xOffset * 0.7;
        const y2 = canvas.height * 0.5 - yOffset * 0.7;

        const gradientOverlay = ctx.createLinearGradient(x1, y1, x2, y2);

        // Create darker color stops with much less opacity for a predominantly black theme
        gradientOverlay.addColorStop(0, 'rgba(0, 0, 0, 0.95)'); // Almost pure black
        gradientOverlay.addColorStop(0.3, 'rgba(3, 7, 18, 0.92)'); // Very dark blue, almost black
        gradientOverlay.addColorStop(0.5, 'rgba(12, 34, 59, 0.5)'); // Very dark blue, reduced opacity
        gradientOverlay.addColorStop(0.7, 'rgba(6, 55, 100, 0.3)'); // Darker blue, reduced opacity
        gradientOverlay.addColorStop(0.85, 'rgba(3, 38, 91, 0.25)'); // Darker blue, reduced opacity
        gradientOverlay.addColorStop(0.95, 'rgba(8, 45, 78, 0.2)'); // Darker cyan-blue, reduced opacity
        gradientOverlay.addColorStop(1, 'rgba(6, 82, 112, 0.15)'); // Darker cyan, further reduced opacity

        ctx.fillStyle = gradientOverlay;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      // Draw subtle accent glow that follows the main gradient
      const drawAccentGlow = () => {
        // Create wide, soft glow
        const radius = Math.min(canvas.width, canvas.height) * 1.5;

        // Calculate transition blend just like above
        const elapsedTime = (currentTime - startTime) / 1000;
        let transitionBlend = 0;
        if (transitionStartTimeRef.current !== null) {
          const timeSinceTransition = elapsedTime - transitionStartTimeRef.current;
          transitionBlend = Math.min(timeSinceTransition / transitionDuration, 1);
        }

        let angle;
        let xOffset, yOffset;

        if (isEntering) {
          // During entrance: sync with main rotation (now at 3/4)
          angle = enteringTimeRef.current * 0.3; // Slightly slower to match the 3/4 rotation
          xOffset = Math.cos(angle * 0.7) * canvas.width * 0.5 * (1 - Math.min(enteringTimeRef.current / enteringDuration, 1));
          yOffset = Math.sin(angle * 0.9) * canvas.height * 0.5 * (1 - Math.min(enteringTimeRef.current / enteringDuration, 1));
        } else {
          if (transitionBlend < 1) {
            // During transition: blend positions smoothly
            const entranceAngle = enteringTimeRef.current * 0.3;
            const normalAngle = time * 0.085; // Increased from 0.07 to 0.085 for faster movement
            angle = entranceAngle * (1 - transitionBlend) + normalAngle * transitionBlend;

            const entranceFactor = 1 - Math.min(enteringTimeRef.current / enteringDuration, 1);
            const entranceX = Math.cos(entranceAngle * 0.7) * canvas.width * 0.5 * entranceFactor;
            const entranceY = Math.sin(entranceAngle * 0.9) * canvas.height * 0.5 * entranceFactor;

            const normalX = Math.cos(normalAngle * 0.7) * canvas.width * 0.5;
            const normalY = Math.sin(normalAngle * 0.9) * canvas.height * 0.5;

            xOffset = entranceX * (1 - transitionBlend) + normalX * transitionBlend;
            yOffset = entranceY * (1 - transitionBlend) + normalY * transitionBlend;
          } else {
            // Normal animation - start immediately after entry ends
            angle = time * 0.085; // Increased from 0.07 to 0.085 for faster movement
            xOffset = Math.cos(angle * 0.7) * canvas.width * 0.5;
            yOffset = Math.sin(angle * 0.9) * canvas.height * 0.5;
          }
        }

        // Position the glow around the screen
        const centerX = canvas.width * 0.5 + xOffset;
        const centerY = canvas.height * 0.5 + yOffset;

        const radialGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius
        );

        // Determine pulse intensity based on animation state
        let pulseIntensity;

        if (isEntering) {
          // During entrance: slightly stronger glow
          pulseIntensity = 0.1 + Math.sin(enteringTimeRef.current * 0.2) * 0.02;
        } else {
          if (transitionBlend < 1) {
            // During transition: smooth blend between intensities
            const entranceIntensity = 0.1 + Math.sin(enteringTimeRef.current * 0.2) * 0.02;
            const normalIntensity = 0.08 + Math.sin(time * 0.14) * 0.03;
            pulseIntensity = entranceIntensity * (1 - transitionBlend) + normalIntensity * transitionBlend;
          } else {
            // Normal pulsing - start immediately
            pulseIntensity = 0.08 + Math.sin(time * 0.14) * 0.03;
          }
        }

        radialGradient.addColorStop(0, `rgba(14, 95, 133, ${pulseIntensity})`); // Darker cyan-blue center
        radialGradient.addColorStop(0.2, 'rgba(6, 82, 112, 0.05)'); // Darker cyan fade, reduced opacity
        radialGradient.addColorStop(0.5, 'rgba(8, 45, 78, 0.02)'); // Dimmer blue-cyan, further reduced
        radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent

        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      // Execute our drawing functions
      drawSmoothGradient();
      drawAccentGlow();

      // Increment time for normal animation - increment gradually even during transition
      if (!isEntering) {
        // Smoother time increment during transition
        if (transitionStartTimeRef.current !== null) {
          const elapsedTime = (currentTime - startTime) / 1000;
          const timeSinceTransition = elapsedTime - transitionStartTimeRef.current;
          const transitionBlend = Math.min(timeSinceTransition / transitionDuration, 1);

          // Only increment at full rate after transition is complete
          if (transitionBlend < 1) {
            time += 0.0075 * transitionBlend; // Increased from 0.006 to 0.0075 for faster animation
          } else {
            time += 0.0075; // Increased from 0.006 to 0.0075 for faster animation
          }
        } else {
          time += 0.0075; // Increased from 0.006 to 0.0075 for faster animation
        }
      }

      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEntering]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default GradientBackground;