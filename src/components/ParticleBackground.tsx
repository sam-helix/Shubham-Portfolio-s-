import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface ParticleBackgroundProps {
  count?: number;
  colorPalette?: string[];
  connectParticles?: boolean;
  maxDistance?: number;
  responsive?: boolean;
}

const ParticleBackground = ({
  count = 80,
  colorPalette = ['#ff5e00', '#fbae3c', '#04e762', '#89fc00', '#15616d'],
  connectParticles = true,
  maxDistance = 120,
  responsive = true,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  const init = (canvas: HTMLCanvasElement) => {
    particlesRef.current = [];
    
    // Create particles
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = Math.random() * 1 - 0.5;
      const speedY = Math.random() * 1 - 0.5;
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      
      particlesRef.current.push({ x, y, size, speedX, speedY, color });
    }
  };

  // Animation loop
  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particlesRef.current.forEach((p, i) => {
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Boundary check
      if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
      if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
      
      // Mouse interaction - particles move away from cursor
      const dx = mouseRef.current.x - p.x;
      const dy = mouseRef.current.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 80) {
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * 1;
        p.y -= Math.sin(angle) * 1;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Connect particles
      if (connectParticles) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    });
    
    frameRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      if (responsive) {
        // Adjust particle count for smaller screens
        init(canvas);
      }
    };
    
    setCanvasSize();
    init(canvas);
    animate(canvas, ctx);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, colorPalette, connectParticles, maxDistance, responsive]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;