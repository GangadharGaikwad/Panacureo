import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Center,
  VStack,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome } from 'react-icons/fa';

const Logout = () => {
  const { signout, isAuthenticated } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  
  // Auto-signout
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        signout();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, signout]);
  
  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="lg">
        <Center>
          <VStack 
            spacing={8} 
            w="full" 
            bg={cardBg}
            boxShadow="lg"
            borderRadius="lg"
            p={8}
          >
            <Heading as="h1" size="xl">Signing Out</Heading>
            <Spinner 
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="xl"
            />
            <Text>You are being signed out of your account...</Text>
            <Button 
              as={RouterLink} 
              to="/" 
              colorScheme="brand"
              leftIcon={<FaHome />}
              size="lg"
              mt={4}
            >
              Return to Home
            </Button>
          </VStack>
        </Center>
      </Container>
    </Box>
  );
};

export default Logout; 