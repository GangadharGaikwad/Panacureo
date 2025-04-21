import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const SignOutButton = ({ variant = "outline", size = "md", iconOnly = false }) => {
  const { signout } = useAuth();
  const hoverBgColor = useColorModeValue('red.50', 'red.900');
  const hoverColor = useColorModeValue('red.600', 'red.200');
  
  return (
    <Button
      leftIcon={iconOnly ? null : <FaSignOutAlt />}
      icon={iconOnly ? <FaSignOutAlt /> : null}
      onClick={signout}
      variant={variant}
      colorScheme="red"
      size={size}
      _hover={{
        bg: hoverBgColor,
        color: hoverColor
      }}
      fontWeight="500"
    >
      {iconOnly ? null : "Sign Out"}
    </Button>
  );
};

export default SignOutButton; 