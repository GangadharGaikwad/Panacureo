import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Button, 
  HStack, 
  useColorModeValue, 
  Container,
  IconButton,
  useDisclosure,
  Stack,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ColorModeToggle from './ColorModeToggle';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const location = useLocation();
  const { currentUser, isAuthenticated, signout } = useAuth();
  
  // The isAuthPage variable is used in App.js, but not here
  // eslint-disable-next-line no-unused-vars
  const isAuthPage = ['/signin', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <Box as="header" bg={bgColor} boxShadow="sm" position="sticky" top={0} zIndex={10}>
      <Container maxW="1200px" py={3}>
        <Flex align="center" justify="space-between" wrap="wrap">
          {/* Logo and Brand */}
          <Flex align="center">
            {/* If you have a logo, uncomment this and add your logo path */}
            {/* <Image src="/logo.png" alt="Panacureo Logo" h="40px" mr={2} /> */}
            <Heading 
              as={RouterLink} 
              to="/" 
              size="lg" 
              fontWeight="600" 
              letterSpacing="tight"
              color="brand.500" 
              cursor="pointer"
              _hover={{ color: 'brand.600' }}
            >
              Panacureo
            </Heading>
          </Flex>

          {/* Mobile menu button */}
          <Flex>
            <ColorModeToggle />
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
              color="brand.500"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              ml={2}
            />
          </Flex>

          {/* Desktop Navigation */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Button 
              as={RouterLink} 
              to="/" 
              variant="ghost" 
              colorScheme="brand"
              fontWeight="500"
            >
              Home
            </Button>
            
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                colorScheme="brand"
                fontWeight="500"
                rightIcon={<ChevronDownIcon />}
              >
                Health Tests
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/tests">Main Tests</MenuItem>
                <MenuItem as={RouterLink} to="/health-tests">Alternative Tests</MenuItem>
              </MenuList>
            </Menu>
            
            {isAuthenticated && (
              <Button 
                as={RouterLink} 
                to="/dashboard" 
                variant="ghost" 
                colorScheme="brand"
                fontWeight="500"
              >
                Dashboard
              </Button>
            )}
            
            {/* Show Profile or Auth buttons based on authentication status */}
            {isAuthenticated ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="solid"
                  colorScheme="brand"
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<Avatar size="xs" name={currentUser?.name} />}
                >
                  {currentUser?.name}
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">My Profile</MenuItem>
                  <MenuItem onClick={signout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button 
                  as={RouterLink} 
                  to="/signin" 
                  variant="ghost"
                  colorScheme="brand"
                  fontWeight="500"
                >
                  Sign In
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/signup" 
                  variant="solid"
                  colorScheme="brand"
                  fontWeight="500"
                >
                  Sign Up
                </Button>
              </>
            )}
            
            <ColorModeToggle />
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <Stack
            mt={4}
            pb={4}
            display={{ md: 'none' }}
            borderTop={1}
            borderStyle="solid"
            borderColor={borderColor}
            spacing={4}
            align="left"
          >
            <Button 
              as={RouterLink} 
              to="/" 
              variant="ghost" 
              colorScheme="brand" 
              w="full" 
              justifyContent="left"
            >
              Home
            </Button>
            
            <Button 
              as={RouterLink} 
              to="/tests" 
              variant="ghost" 
              colorScheme="brand" 
              w="full" 
              justifyContent="left"
            >
              Health Tests
            </Button>
            
            <Button 
              as={RouterLink} 
              to="/health-tests" 
              variant="ghost" 
              colorScheme="brand" 
              w="full" 
              justifyContent="left"
            >
              Alternative Tests
            </Button>
            
            {isAuthenticated && (
              <Button 
                as={RouterLink} 
                to="/dashboard" 
                variant="ghost" 
                colorScheme="brand" 
                w="full" 
                justifyContent="left"
              >
                Dashboard
              </Button>
            )}
            
            {/* Mobile auth buttons */}
            {isAuthenticated ? (
              <>
                <Button 
                  as={RouterLink} 
                  to="/profile" 
                  variant="ghost" 
                  colorScheme="brand" 
                  w="full" 
                  justifyContent="left"
                >
                  My Profile
                </Button>
                <Button 
                  onClick={signout}
                  variant="ghost" 
                  colorScheme="red" 
                  w="full" 
                  justifyContent="left"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={RouterLink} 
                  to="/signin" 
                  variant="ghost" 
                  colorScheme="brand" 
                  w="full" 
                  justifyContent="left"
                >
                  Sign In
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/signup" 
                  variant="solid" 
                  colorScheme="brand" 
                  w="full" 
                  justifyContent="left"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Header; 