import { useState, useEffect } from 'react';

interface CursorProps {
  color?: string;
}

const Cursor = ({ color = '#ff5e00' }: CursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .hover-target').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleLinkHoverEvents);
    
    // Run once after first render to add listeners to existing elements
    handleLinkHoverEvents();

    const mouseLeaveHandler = () => setHidden(true);
    const mouseEnterHandler = () => setHidden(false);

    document.body.addEventListener('mouseleave', mouseLeaveHandler);
    document.body.addEventListener('mouseenter', mouseEnterHandler);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', mouseLeaveHandler);
      document.body.removeEventListener('mouseenter', mouseEnterHandler);
    };
  }, []);

  const cursorStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : linkHovered ? 2 : 1})`,
    borderColor: linkHovered ? 'transparent' : color,
    backgroundColor: linkHovered ? `${color}33` : 'transparent', // 33 is 20% opacity in hex
  };

  return (
    <>
      {/* Main cursor */}
      <div 
        className="custom-cursor fixed pointer-events-none z-50 w-7 h-7 rounded-full border-2 transition-all duration-100 ease-out"
        style={cursorStyles}
      />
      {/* Cursor dot */}
      <div 
        className="custom-cursor-dot fixed pointer-events-none z-50 w-1 h-1 rounded-full transition-all duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1,
          transform: 'translate(-50%, -50%)',
          backgroundColor: color,
        }}
      />
    </>
  );
};

export default Cursor;