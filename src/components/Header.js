import React, { useState, useEffect } from 'react';
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
  Icon,
  IconButton,
  Link,
  Heading,
  Image,
  MenuDivider
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import ColorModeToggle from './ColorModeToggle';
import { useAuth } from '../context/AuthContext';
import { FaChartLine, FaClipboardCheck, FaBullseye, FaUtensils, FaBookMedical, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useGlobal } from '../context/GlobalContext';

const Header = ({ showOnScroll = false }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated, currentUser, signout } = useAuth();
  const location = useLocation();
  const { openSearch } = useGlobal();
  
  // State for scroll behavior
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  
  // Track scroll position for hide/show behavior
  useEffect(() => {
    if (!showOnScroll) {
      setHeaderVisible(true);
      return;
    }
    
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setHeaderVisible(currentPosition <= 60 || scrollPosition > currentPosition);
      setScrollPosition(currentPosition);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition, showOnScroll]);
  
  // Color values for light/dark mode
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Active button styles - defined outside of the callback
  const activeBgColor = useColorModeValue('brand.50', 'brand.900');
  const activeTextColor = useColorModeValue('brand.700', 'brand.200');
  
  // Sign out button styles
  const signOutHoverBg = useColorModeValue('red.50', 'red.900');
  const signOutActiveBg = useColorModeValue('red.100', 'red.800');
  const signOutColor = useColorModeValue('red.600', 'red.300');
  const signOutIconColor = useColorModeValue('red.500', 'red.300');
  
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
      top="0"
      left="0"
      right="0"
      w="100%"
      bg={bgColor}
      borderBottom="1px"
      borderStyle="solid"
      borderColor={borderColor}
      boxShadow="sm"
      zIndex="999"
      transform={headerVisible ? 'translateY(0)' : 'translateY(-100%)'}
      transition="transform 0.3s ease"
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Flex
          color={useColorModeValue('gray.600', 'white')}
          minH={{ base: '60px', md: '70px' }}
          py={{ base: 2 }}
          align="center"
          justify="space-between"
        >
          <Flex
            flex={{ base: 'auto', md: 'auto' }}
            mr={{ base: 2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              variant="ghost"
              aria-label="Toggle Navigation"
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              size="md"
            />
          </Flex>
          
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">
            <Link as={RouterLink} to="/" _hover={{ textDecor: 'none' }}>
              <HStack spacing={{ base: 1, sm: 2 }}>
                <Image src="/logo.png" alt="Panacureo Logo" boxSize={{ base: "30px", md: "40px" }} />
                <Heading 
                  as="h1" 
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} 
                  display={{ base: 'none', sm: 'block' }}
                  color={useColorModeValue('brand.600', 'brand.300')}
                  lineHeight="1.2"
                >
                  Panacureo
                </Heading>
              </HStack>
            </Link>
          </Flex>
          
          {/* Right Section with Auth and Search */}
          <HStack spacing={{ base: 1, md: 3 }} justify="flex-end">
            {/* Search button - always visible */}
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              variant="ghost"
              colorScheme="brand"
              onClick={openSearch}
              size={{ base: "sm", md: "md" }}
            />
            
            {/* Show auth buttons based on authentication status */}
            {isAuthenticated ? (
              <>
                <Menu placement="bottom-end" autoSelect={false} closeOnSelect={true} strategy="fixed" gutter={2}>
                  <MenuButton
                    as={Button}
                    variant="solid"
                    colorScheme="brand"
                    rightIcon={<ChevronDownIcon />}
                    leftIcon={<Avatar size="xs" name={currentUser?.name} />}
                    size={{ base: "sm", md: "md" }}
                    display={{ base: "none", sm: "flex" }}
                  >
                    {currentUser?.name}
                  </MenuButton>
                  <MenuButton
                    as={IconButton}
                    variant="solid"
                    colorScheme="brand"
                    icon={<Avatar size="xs" name={currentUser?.name} />}
                    size="sm"
                    display={{ base: "flex", sm: "none" }}
                    aria-label="User menu"
                  />
                  <MenuList 
                    zIndex={1500} 
                    shadow="lg" 
                    border="1px solid"
                    borderColor={borderColor}
                    minW="180px"
                    mt={2}
                    position="absolute"
                    right={0}
                  >
                    <MenuItem 
                      as={RouterLink} 
                      to="/profile" 
                      fontWeight="500"
                      _hover={{ bg: activeBgColor }}
                      px={4}
                      py={2}
                      icon={<Icon as={FaUser} color="brand.500" />}
                    >
                      My Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem 
                      as={RouterLink} 
                      to="/logout" 
                      fontWeight="500"
                      _hover={{ bg: signOutHoverBg }}
                      _active={{ bg: signOutActiveBg }}
                      color={signOutColor}
                      px={4}
                      py={2}
                      icon={<Icon as={FaSignOutAlt} color={signOutIconColor} />}
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
                
                {/* Stand-alone Sign Out button for direct visibility */}
                <Button 
                  as={RouterLink} 
                  to="/logout" 
                  variant="outline"
                  colorScheme="red"
                  leftIcon={<Icon as={FaSignOutAlt} />}
                  size={{ base: "sm", md: "md" }}
                  display={{ base: "none", md: "flex" }}
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
                  fontWeight="500"
                  size={{ base: "sm", md: "md" }}
                  display={{ base: "none", sm: "flex" }}
                >
                  Sign In
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/signup" 
                  variant="solid"
                  colorScheme="brand"
                  fontWeight="500"
                  size={{ base: "sm", md: "md" }}
                >
                  Sign Up
                </Button>
              </>
            )}
            
            <ColorModeToggle size={{ base: "sm", md: "md" }} />
          </HStack>
        </Flex>

        {/* Desktop Navigation - Below the header */}
        <HStack 
          spacing={4} 
          display={{ base: 'none', md: 'flex' }}
          py={2}
          overflowX="auto"
          flexWrap="nowrap"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Button 
            as={RouterLink} 
            to="/" 
            variant="ghost" 
            colorScheme="brand"
            fontWeight="500"
            size="sm"
            minW="auto"
            bg={location.pathname === '/' ? activeBgColor : undefined}
            color={location.pathname === '/' ? activeTextColor : undefined}
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
              size="sm"
              minW="auto"
              bg={location.pathname === navItem.href ? activeBgColor : undefined}
              color={location.pathname === navItem.href ? activeTextColor : undefined}
            >
              {navItem.label}
            </Button>
          ))}
        </HStack>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <Stack
            mt={2}
            pb={4}
            display={{ md: 'none' }}
            borderTop={1}
            borderStyle="solid"
            borderColor={borderColor}
            spacing={2}
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
              size="sm"
              bg={location.pathname === '/' ? activeBgColor : undefined}
              color={location.pathname === '/' ? activeTextColor : undefined}
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
                size="sm"
                bg={location.pathname === navItem.href ? activeBgColor : undefined}
                color={location.pathname === navItem.href ? activeTextColor : undefined}
              >
                {navItem.label}
              </Button>
            ))}
            
            {/* Show auth-related buttons in mobile menu */}
            {isAuthenticated ? (
              <>
                <Button 
                  as={RouterLink} 
                  to="/profile" 
                  variant="ghost" 
                  colorScheme="brand" 
                  w="full" 
                  justifyContent="left"
                  leftIcon={<Icon as={FaUser} />}
                  size="sm"
                  bg={location.pathname === '/profile' ? activeBgColor : undefined}
                  color={location.pathname === '/profile' ? activeTextColor : undefined}
                >
                  My Profile
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/logout" 
                  variant="ghost" 
                  colorScheme="red" 
                  w="full" 
                  justifyContent="left"
                  leftIcon={<Icon as={FaSignOutAlt} />}
                  size="sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                as={RouterLink} 
                to="/signin" 
                variant="ghost" 
                colorScheme="brand" 
                w="full" 
                justifyContent="left"
                size="sm"
              >
                Sign In
              </Button>
            )}
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Header; 