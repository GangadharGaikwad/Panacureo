import React, { useState, useEffect, useRef } from 'react';
import {
  InputGroup,
  Input,
  InputLeftElement,
  Box,
  List,
  ListItem,
  Text,
  Flex,
  Icon,
  Divider,
  useColorModeValue,
  VStack,
  Badge,
  Spinner,
  Image,
  useOutsideClick,
  Avatar
} from '@chakra-ui/react';
import { FaSearch, FaHeart, FaDumbbell, FaAppleAlt, FaBookOpen, FaVirus, FaStethoscope, FaRunning, FaBrain } from 'react-icons/fa';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

// Mock search results data with better images and descriptions
const mockSearchData = {
  tests: [
    { 
      id: '1', 
      title: 'Heart Health Assessment', 
      type: 'test', 
      category: 'Cardiovascular',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '2', 
      title: 'Stress Level Evaluation', 
      type: 'test', 
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '3', 
      title: 'Sleep Quality Analysis', 
      type: 'test', 
      category: 'Sleep',
      image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '4', 
      title: 'Cognitive Function Test', 
      type: 'test', 
      category: 'Brain Health',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ],
  recipes: [
    { 
      id: '1', 
      title: 'Mediterranean Quinoa Bowl', 
      type: 'recipe', 
      category: 'Lunch',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '2', 
      title: 'Spinach & Berry Smoothie', 
      type: 'recipe', 
      category: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '3', 
      title: 'Grilled Salmon with Avocado', 
      type: 'recipe', 
      category: 'Dinner',
      image: 'https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '4', 
      title: 'Protein-Packed Breakfast Bowl', 
      type: 'recipe', 
      category: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ],
  articles: [
    { 
      id: '1', 
      title: 'Benefits of Daily Meditation', 
      type: 'article', 
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1470137233282-5e91fca82f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '2', 
      title: 'How to Improve Your Sleep Cycle', 
      type: 'article', 
      category: 'Sleep',
      image: 'https://images.unsplash.com/photo-1450776598040-aa8c38020db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '3', 
      title: 'Understanding Macronutrients', 
      type: 'article', 
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ],
  diseases: [
    { 
      id: '1', 
      title: 'Hypertension Overview', 
      type: 'disease', 
      category: 'Cardiovascular',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '2', 
      title: 'Type 2 Diabetes Guide', 
      type: 'disease', 
      category: 'Metabolic',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '3', 
      title: 'Migraine Headaches', 
      type: 'disease', 
      category: 'Neurological',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ],
  goals: [
    { 
      id: '1', 
      title: 'Daily Step Count', 
      type: 'goal', 
      category: 'Activity',
      image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '2', 
      title: 'Weekly Meditation', 
      type: 'goal', 
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '3', 
      title: 'Water Intake', 
      type: 'goal', 
      category: 'Hydration',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ]
};

const SearchResult = ({ result, onClick }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  // Type-based icons and colors
  const getTypeIcon = (type) => {
    switch (type) {
      case 'test': return FaStethoscope;
      case 'recipe': return FaAppleAlt;
      case 'article': return FaBookOpen;
      case 'disease': return FaVirus;
      case 'goal': return FaDumbbell;
      default: return FaSearch;
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'test': return 'blue';
      case 'recipe': return 'green';
      case 'article': return 'orange';
      case 'disease': return 'red';
      case 'goal': return 'purple';
      default: return 'gray';
    }
  };
  
  return (
    <ListItem 
      p={3}
      _hover={{ bg: hoverBg, cursor: 'pointer' }}
      onClick={() => onClick(result)}
      borderRadius="md"
    >
      <Flex align="center">
        {result.image ? (
          <Avatar 
            src={result.image}
            size="md"
            mr={3}
            borderRadius="md"
          />
        ) : (
          <Flex
            w="40px"
            h="40px"
            borderRadius="md"
            bg={`${getTypeColor(result.type)}.100`}
            color={`${getTypeColor(result.type)}.500`}
            justify="center"
            align="center"
            flexShrink={0}
            mr={3}
          >
            <Icon as={getTypeIcon(result.type)} />
          </Flex>
        )}
        
        <VStack align="start" spacing={0}>
          <Text fontWeight="medium">{result.title}</Text>
          <Flex align="center">
            <Badge colorScheme={getTypeColor(result.type)} size="sm" mr={2}>
              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
            </Badge>
            <Text fontSize="xs" color="gray.500">{result.category}</Text>
          </Flex>
        </VStack>
      </Flex>
    </ListItem>
  );
};

const SearchBar = () => {
  const { searchQuery, setSearchQuery, isSearchResultsOpen, setIsSearchResultsOpen } = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef();
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)');
  
  // Close search results when clicking outside
  useOutsideClick({
    ref: searchRef,
    handler: () => setIsSearchResultsOpen(false),
  });
  
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true);
      
      // Simulate API call with setTimeout
      const timer = setTimeout(() => {
        // Filter mock data based on search query
        const filteredResults = Object.values(mockSearchData).flat().filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setResults(filteredResults);
        setIsLoading(false);
        setIsSearchResultsOpen(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsSearchResultsOpen(false);
    }
  }, [searchQuery, setIsSearchResultsOpen]);
  
  const handleResultClick = (result) => {
    setIsSearchResultsOpen(false);
    
    // Navigate based on result type
    switch (result.type) {
      case 'test':
        navigate(`/test/${result.id}`);
        break;
      case 'recipe':
        navigate(`/recipe/${result.id}`);
        break;
      case 'article':
        navigate(`/article/${result.id}`);
        break;
      case 'disease':
        navigate(`/disease-library/disease/${result.id}`);
        break;
      case 'goal':
        navigate('/dashboard');
        break;
      default:
        navigate('/');
    }
  };
  
  return (
    <Box position="relative" ref={searchRef} width="100%" maxW="600px" mx="auto">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search tests, recipes, articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          bg={bgColor}
          borderColor={borderColor}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: `0 0 0 1px var(--chakra-colors-brand-500)`,
          }}
          borderRadius="full"
        />
      </InputGroup>
      
      {isSearchResultsOpen && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt={2}
          bg={bgColor}
          boxShadow={`0 4px 12px ${shadowColor}`}
          borderRadius="md"
          overflow="hidden"
          zIndex="dropdown"
          border="1px"
          borderColor={borderColor}
        >
          {isLoading ? (
            <Flex justify="center" align="center" p={4}>
              <Spinner size="sm" mr={2} />
              <Text>Searching...</Text>
            </Flex>
          ) : results.length > 0 ? (
            <List spacing={1} py={2}>
              {results.map((result, index) => (
                <React.Fragment key={`${result.type}-${result.id}`}>
                  <SearchResult result={result} onClick={handleResultClick} />
                  {index < results.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Flex direction="column" align="center" justify="center" p={4}>
              <Text mb={2}>No results found</Text>
              <Text fontSize="sm" color="gray.500">
                Try different keywords or browse categories
              </Text>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar; 