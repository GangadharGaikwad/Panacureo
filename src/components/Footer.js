import React from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  Text, 
  Stack, 
  Link, 
  HStack, 
  Icon, 
  Divider,
  SimpleGrid,
  Button,
  useColorModeValue,
  // eslint-disable-next-line no-unused-vars
  Image
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const year = new Date().getFullYear();

  return (
    <Box as="footer" bg={bgColor} color={textColor} borderTop="1px" borderColor={borderColor}>
      <Container maxW="1200px" py={10}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} mb={8}>
          {/* Brand Column */}
          <Stack spacing={4}>
            <Box>
              {/* If you have a logo, uncomment this and add your logo path */}
              {/* <Image src="/logo.png" alt="Panacureo Logo" h="40px" mb={2} /> */}
              <Text fontSize="xl" fontWeight="bold" color="brand.500">Panacureo</Text>
            </Box>
            <Text fontSize="sm" maxW="300px">
              Your comprehensive health platform for better living and wellness monitoring.
            </Text>
            <HStack spacing={4} mt={2}>
              <Link href="#" isExternal aria-label="Facebook">
                <Icon 
                  as={FaFacebook} 
                  boxSize={5} 
                  color="gray.500" 
                  _hover={{ color: 'brand.500' }} 
                  transition="all 0.2s"
                />
              </Link>
              <Link href="#" isExternal aria-label="Twitter">
                <Icon 
                  as={FaTwitter} 
                  boxSize={5} 
                  color="gray.500" 
                  _hover={{ color: 'brand.500' }} 
                  transition="all 0.2s"
                />
              </Link>
              <Link href="#" isExternal aria-label="Instagram">
                <Icon 
                  as={FaInstagram} 
                  boxSize={5} 
                  color="gray.500" 
                  _hover={{ color: 'brand.500' }} 
                  transition="all 0.2s"
                />
              </Link>
              <Link href="#" isExternal aria-label="LinkedIn">
                <Icon 
                  as={FaLinkedin} 
                  boxSize={5} 
                  color="gray.500" 
                  _hover={{ color: 'brand.500' }} 
                  transition="all 0.2s"
                />
              </Link>
            </HStack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight="bold" fontSize="md" mb={2} color="gray.700">Quick Links</Text>
            <Link as={RouterLink} to="/" color={textColor} _hover={{ color: 'brand.500' }}>
              Home
            </Link>
            <Link as={RouterLink} to="/dashboard" color={textColor} _hover={{ color: 'brand.500' }}>
              Dashboard
            </Link>
            <Link as={RouterLink} to="/profile" color={textColor} _hover={{ color: 'brand.500' }}>
              Profile
            </Link>
          </Stack>

          {/* Support */}
          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight="bold" fontSize="md" mb={2} color="gray.700">Support</Text>
            <Link href="#" color={textColor} _hover={{ color: 'brand.500' }}>
              Help Center
            </Link>
            <Link href="#" color={textColor} _hover={{ color: 'brand.500' }}>
              Privacy Policy
            </Link>
            <Link href="#" color={textColor} _hover={{ color: 'brand.500' }}>
              Terms of Service
            </Link>
            <Link href="#" color={textColor} _hover={{ color: 'brand.500' }}>
              Contact Us
            </Link>
          </Stack>

          {/* Newsletter */}
          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight="bold" fontSize="md" mb={2} color="gray.700">Stay Updated</Text>
            <Text fontSize="sm">Subscribe to our newsletter for health tips and updates.</Text>
            <Button size="md" colorScheme="brand" w={{ base: 'full', md: 'auto' }}>
              Subscribe Now
            </Button>
          </Stack>
        </SimpleGrid>

        <Divider borderColor={borderColor} />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          pt={6}
          fontSize="sm"
        >
          <Box>
            <Text>
              &copy; {year} Panacureo Health Platform. All rights reserved.
            </Text>
            <Text mt={1} fontStyle="italic" color="gray.500">
              This is a demo platform created for a hackathon and is not intended for real medical use.
            </Text>
          </Box>
          <Stack spacing={2} mt={{ base: 4, md: 0 }} align={{ base: 'flex-start', md: 'flex-end' }}>
            <Text>
              Made with <Icon as={FaHeart} color="accent.400" mx={1} /> for a healthier world
            </Text>
            <Text fontWeight="medium" color="brand.500">
              Designed & Developed by Gangadhar Gaikwad
            </Text>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer; 