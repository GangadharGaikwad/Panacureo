import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  HStack,
  useColorModeValue,
  useDisclosure,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Icon
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ColorModeToggle from './ColorModeToggle';
import { useAuth } from '../context/AuthContext';
import { FaChartLine, FaClipboardCheck, FaBullseye, FaUtensils, FaBookMedical, FaHome } from 'react-icons/fa';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated, currentUser, signout } = useAuth();
  const location = useLocation();
  
  // Color values for light/dark mode
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // eslint-disable-next-line no-unused-vars
  const isAuthPage = ['/signin', '/signup', '/forgot-password'].includes(location.pathname);

  // Update the navigation items array to include Health Goals
  const NAV_ITEMS = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: FaChartLine,
    },
    {
      label: 'Health Tests',
      href: '/health-tests',
      icon: FaClipboardCheck,
    },
    {
      label: 'Health Goals',
      href: '/health-goals',
      icon: FaBullseye,
    },
    {
      label: 'Recipes',
      href: '/recipes',
      icon: FaUtensils,
    },
    {
      label: 'Disease Library',
      href: '/disease-library',
      icon: FaBookMedical,
    },
  ];

  return (
    <Box
      position="fixed"
      w="100%"
      bg={bgColor}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      boxShadow="sm"
      zIndex="999"
    >
      <Container maxW="1200px">
        <Flex
          color={useColorModeValue('gray.600', 'white')}
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 0 }}
          align="center"
          justify="space-between"
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <Button
              onClick={onToggle}
              variant="ghost"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            </Button>
          </Flex>
          
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              as={RouterLink}
              to="/"
              textAlign={{ base: 'center', md: 'left' }}
              fontFamily="heading"
              color={useColorModeValue('brand.600', 'white')}
              fontWeight="bold"
              fontSize="xl"
            >
              Panacureo
            </Text>
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
            
            {/* Map through NAV_ITEMS for desktop */}
            {NAV_ITEMS.map((navItem) => (
              <Button 
                key={navItem.label}
                as={RouterLink} 
                to={navItem.href} 
                variant="ghost" 
                colorScheme="brand"
                fontWeight="500"
                leftIcon={<Icon as={navItem.icon} />}
              >
                {navItem.label}
              </Button>
            ))}
            
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
              leftIcon={<Icon as={FaHome} />}
            >
              Home
            </Button>
            
            {/* Map through NAV_ITEMS for mobile */}
            {NAV_ITEMS.map((navItem) => (
              <Button 
                key={navItem.label}
                as={RouterLink} 
                to={navItem.href} 
                variant="ghost" 
                colorScheme="brand" 
                w="full" 
                justifyContent="left"
                leftIcon={<Icon as={navItem.icon} />}
              >
                {navItem.label}
              </Button>
            ))}
            
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