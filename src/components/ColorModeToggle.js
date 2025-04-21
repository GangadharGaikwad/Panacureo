import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue('brand.500', 'yellow.400');
  
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      color={iconColor}
      _hover={{ 
        bg: useColorModeValue('gray.100', 'gray.700') 
      }}
      size="md"
    />
  );
};

export default ColorModeToggle; 