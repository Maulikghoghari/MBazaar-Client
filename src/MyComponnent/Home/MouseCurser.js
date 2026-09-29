import React, { useState, useEffect } from 'react';
import './MouseCurser.css'; // Make sure you import this

function MouseCurser() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div className="mousehover">
      <CustomCursor position={cursorPosition} />
    </div>
  );
}

function CustomCursor({ position }) {
  return (
    <div className="custom-cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <div className="cursor-inner"></div>
    </div>
  );
}

export default MouseCurser;
