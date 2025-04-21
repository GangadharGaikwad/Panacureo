import React, { useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Text,
  Flex,
  Icon,
  Spinner,
  Tabs,
  TabList,
  Tab,
  Badge,
  Divider,
  useColorModeValue,
  VStack,
  HStack,
  Image
} from '@chakra-ui/react';
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaFlask, FaUtensils, FaBook, FaHeartbeat } from 'react-icons/fa';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const SearchModal = () => {
  const { 
    isSearchOpen, 
    closeSearch, 
    searchQuery, 
    setSearchQuery,
    searchResults,
    searchCategory,
    setSearchCategory,
    isSearchLoading
  } = useGlobal();
  
  const navigate = useNavigate();
  const inputRef = useRef(null);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);
  
  const handleResultClick = (result) => {
    closeSearch();
    navigate(result.url);
  };
  
  // UI Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  
  // Badge colors for different content types
  const getBadgeColor = (type) => {
    switch (type) {
      case 'test':
        return 'purple';
      case 'recipe':
        return 'green';
      case 'disease':
        return 'red';
      case 'article':
        return 'blue';
      default:
        return 'gray';
    }
  };
  
  // Icons for different content types
  const getTypeIcon = (type) => {
    switch (type) {
      case 'test':
        return FaFlask;
      case 'recipe':
        return FaUtensils;
      case 'disease':
        return FaHeartbeat;
      case 'article':
        return FaBook;
      default:
        return SearchIcon;
    }
  };
  
  return (
    <Modal 
      isOpen={isSearchOpen} 
      onClose={closeSearch} 
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="lg" overflow="hidden">
        <ModalHeader pb={0}>Search Panacureo</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody p={4}>
          <InputGroup size="lg" mb={4}>
            <InputLeftElement pointerEvents="none">
              {isSearchLoading ? (
                <Spinner size="sm" color="brand.500" />
              ) : (
                <SearchIcon color="gray.500" />
              )}
            </InputLeftElement>
            <Input
              ref={inputRef}
              placeholder="Search for tests, recipes, diseases, articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="md"
              focusBorderColor="brand.500"
              autoComplete="off"
            />
          </InputGroup>
          
          <Tabs 
            colorScheme="brand" 
            onChange={(index) => {
              const categories = ['all', 'tests', 'recipes', 'diseases', 'articles'];
              setSearchCategory(categories[index]);
            }}
            mb={4}
          >
            <TabList>
              <Tab>All</Tab>
              <Tab>Tests</Tab>
              <Tab>Recipes</Tab>
              <Tab>Diseases</Tab>
              <Tab>Articles</Tab>
            </TabList>
          </Tabs>
          
          <Divider mb={4} />
          
          {searchQuery.trim() !== '' && (
            <VStack spacing={0} align="stretch" mt={2}>
              {isSearchLoading ? (
                <Flex justify="center" align="center" py={8}>
                  <Spinner size="lg" color="brand.500" />
                </Flex>
              ) : searchResults.length === 0 ? (
                <Box textAlign="center" py={8}>
                  <Text color="gray.500">No results found for "{searchQuery}"</Text>
                  <Text fontSize="sm" mt={2}>
                    Try different keywords or browse categories
                  </Text>
                </Box>
              ) : (
                searchResults.map((result) => (
                  <Box
                    key={result.id}
                    p={3}
                    borderRadius="md"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{ bg: hoverBgColor }}
                    onClick={() => handleResultClick(result)}
                  >
                    <HStack spacing={4}>
                      <Flex
                        w="50px"
                        h="50px"
                        borderRadius="md"
                        bg={`${getBadgeColor(result.type)}.100`}
                        color={`${getBadgeColor(result.type)}.500`}
                        justify="center"
                        align="center"
                        flexShrink={0}
                        overflow="hidden"
                      >
                        {result.image ? (
                          <Image 
                            src={result.image} 
                            alt={result.title}
                            objectFit="cover"
                            w="full"
                            h="full"
                          />
                        ) : (
                          <Icon as={getTypeIcon(result.type)} boxSize={5} />
                        )}
                      </Flex>
                      
                      <Box flex="1">
                        <HStack mb={1}>
                          <Text fontWeight="semibold">{result.title}</Text>
                          <Badge colorScheme={getBadgeColor(result.type)} size="sm">
                            {result.type}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.500" noOfLines={2}>
                          {result.snippet}
                        </Text>
                      </Box>
                      
                      <ChevronRightIcon />
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
          )}
          
          {searchQuery.trim() === '' && (
            <Box textAlign="center" py={8}>
              <Text color="gray.500">Start typing to search</Text>
              <Text fontSize="sm" mt={2}>
                Search across tests, recipes, diseases, and articles
              </Text>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal; 