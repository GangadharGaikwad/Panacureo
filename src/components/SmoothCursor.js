import React, { useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SmoothCursor = ({ size = 32, color = "brand.500", ringSize = 8, ringColor = "brand.200", delay = 0.08 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // Get themed colors
  const cursorColor = useColorModeValue(color, `${color.split('.')[0]}.400`);
  const cursorRingColor = useColorModeValue(ringColor, `${ringColor.split('.')[0]}.300`);

  useEffect(() => {
    // Initial hiding of the cursor (prevent flash on load)
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Track document entry/exit for visibility
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <>
      {/* Main cursor dot */}
      <MotionBox
        position="fixed"
        zIndex="9999"
        top="0"
        left="0"
        pointerEvents="none"
        boxSize={`${size / 2}px`}
        borderRadius="full"
        bg={cursorColor}
        opacity={isVisible ? 0.7 : 0}
        animate={{
          x: mousePosition.x - size / 4,
          y: mousePosition.y - size / 4
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          damping: 24,
          stiffness: 200
        }}
      />
      
      {/* Outer ring */}
      <MotionBox
        position="fixed"
        zIndex="9998"
        top="0"
        left="0"
        pointerEvents="none"
        boxSize={`${size}px`}
        borderRadius="full"
        border={`${ringSize}px solid`}
        borderColor={cursorRingColor}
        opacity={isVisible ? 0.3 : 0}
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          damping: 25,
          stiffness: 180,
          delay
        }}
      />
    </>
  );
};

export default SmoothCursor; 