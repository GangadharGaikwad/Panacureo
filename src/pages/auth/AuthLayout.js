import React from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  useColorModeValue 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * A reusable layout component for authentication pages (sign in, sign up, forgot password)
 */
const AuthLayout = ({ children, title }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Flex 
      minH="100vh" 
      align="center" 
      justify="center" 
      bg={bgColor}
      p={4}
    >
      <Container maxW="md" py={{ base: 8, md: 12 }}>
        {/* Logo and Brand */}
        <Flex justify="center" mb={8}>
          <Box textAlign="center">
            <Heading 
              as={RouterLink} 
              to="/" 
              size="lg" 
              fontWeight="600" 
              letterSpacing="tight"
              color={brandColor}
              cursor="pointer"
              _hover={{ color: 'brand.600' }}
              display="inline-block"
              mb={2}
            >
              Panacureo
            </Heading>
            {title && (
              <Text 
                fontSize="md" 
                color={textColor}
              >
                {title}
              </Text>
            )}
          </Box>
        </Flex>
        
        {/* Content */}
        <Box 
          bg={cardBg} 
          p={{ base: 6, md: 8 }} 
          rounded="lg" 
          boxShadow="md"
        >
          {children}
        </Box>
      </Container>
    </Flex>
  );
};

export default AuthLayout; 