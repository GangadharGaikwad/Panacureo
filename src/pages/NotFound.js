import React from 'react';
import { 
  // eslint-disable-next-line no-unused-vars
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Container 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxW="1200px" py={20}>
      <VStack spacing={8} textAlign="center">
        <Heading size="4xl" color="teal.400">404</Heading>
        <Heading size="xl">Page Not Found</Heading>
        <Text fontSize="lg" color="gray.600">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button 
          as={RouterLink} 
          to="/" 
          colorScheme="teal" 
          size="lg"
          mt={4}
        >
          Return to Home
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFound; 