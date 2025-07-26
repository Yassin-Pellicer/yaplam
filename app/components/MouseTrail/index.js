import React, { useState, useEffect, useCallback } from 'react';

const PixelatedMouseTrail = ({ maxDots = 1000, dotSize = 40, fadeSpeed = 0.3 }) => {
  const [dots, setDots] = useState([]);

  const handleMouseMove = useCallback((e) => {
    const newDot = {
      id: Date.now() + Math.random(),
      x: Math.floor(e.clientX / dotSize) * dotSize,
      y: Math.floor(e.clientY / dotSize) * dotSize,
      opacity: 1,
      scale: 1
    };

    setDots(prevDots => {
      const updatedDots = [newDot, ...prevDots].slice(0, maxDots);
      return updatedDots;
    });
  }, [dotSize, maxDots]);

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setDots(prevDots => 
        prevDots
          .map(dot => ({
            ...dot,
            opacity: dot.opacity * fadeSpeed,
            scale: dot.scale * 0.98
          }))
          .filter(dot => dot.opacity > 0.05)
      );
    }, 50);

    return () => clearInterval(fadeInterval);
  }, [fadeSpeed]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 h-[100px]">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute bg-blue-700"
          style={{
            zIndex: -1,
            left: dot.x,
            top: dot.y,
            width: dotSize,
            height: dotSize,
            opacity: dot.opacity,
            transform: `scale(${dot.scale})`,
            imageRendering: 'pixelated',
            imageRendering: '-moz-crisp-edges',
            imageRendering: 'crisp-edges',
            transition: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default PixelatedMouseTrail;