import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  Badge,
  Icon,
  Image,
  useColorModeValue,
  HStack,
  VStack,
  Button
} from '@chakra-ui/react';
import { SearchIcon, TimeIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { healthTests, categories, difficulties } from '../data/healthTests';

const HealthTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [filteredTests, setFilteredTests] = useState(healthTests);
  const navigate = useNavigate();
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('gray.700', 'white');
  
  // Filter tests when search term or filters change
  useEffect(() => {
    let result = [...healthTests];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(test => 
        test.title.toLowerCase().includes(term) || 
        test.description.toLowerCase().includes(term) ||
        test.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(test => test.category === categoryFilter);
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(test => test.difficulty === difficultyFilter);
    }
    
    setFilteredTests(result);
  }, [searchTerm, categoryFilter, difficultyFilter]);
  
  // Handle card click
  const handleTestClick = (id) => {
    navigate(`/test/${id}`);
  };
  
  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'red';
      default:
        return 'gray';
    }
  };
  
  return (
    <Container maxW="1200px" py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="xl" color={headingColor}>
          Health Tests
        </Heading>
        <Button
          as={RouterLink}
          to="/tests"
          colorScheme="brand"
          variant="outline"
          rightIcon={<ChevronRightIcon />}
        >
          View Main Tests Page
        </Button>
      </Flex>
      
      <Text color={textColor} mb={8}>
        Discover our range of health assessments to help you understand and improve your wellbeing.
      </Text>
      
      {/* Search and Filter Section */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4} 
        mb={8} 
        p={6} 
        bg={cardBg} 
        borderRadius="lg" 
        boxShadow="sm"
      >
        <InputGroup flex="2">
          <InputLeftElement>
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search health tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <Select 
          placeholder="Category" 
          flex="1" 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>
        
        <Select 
          placeholder="Difficulty" 
          flex="1" 
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          {difficulties.map(difficulty => (
            <option key={difficulty.value} value={difficulty.value}>
              {difficulty.label}
            </option>
          ))}
        </Select>
      </Flex>
      
      {/* Featured Tests Section */}
      {!searchTerm && categoryFilter === 'all' && difficultyFilter === 'all' && (
        <Box mb={12}>
          <Heading as="h2" size="lg" mb={6} color={headingColor}>
            Featured Tests
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {healthTests
              .filter(test => test.featured)
              .map(test => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onClick={() => handleTestClick(test.id)}
                  cardBg={cardBg}
                  textColor={textColor}
                  borderColor={borderColor}
                  getDifficultyColor={getDifficultyColor}
                />
              ))
            }
          </SimpleGrid>
        </Box>
      )}
      
      {/* All Tests Section */}
      <Box>
        <Heading as="h2" size="lg" mb={6} color={headingColor}>
          {searchTerm || categoryFilter !== 'all' || difficultyFilter !== 'all' 
            ? `Search Results (${filteredTests.length})` 
            : 'All Health Tests'}
        </Heading>
        
        {filteredTests.length === 0 ? (
          <Box textAlign="center" py={10} px={6}>
            <Heading as="h3" size="md" mb={3}>
              No tests found
            </Heading>
            <Text color={textColor}>
              Try adjusting your search or filter criteria.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredTests.map(test => (
              <TestCard 
                key={test.id} 
                test={test} 
                onClick={() => handleTestClick(test.id)}
                cardBg={cardBg}
                textColor={textColor}
                borderColor={borderColor}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Container>
  );
};

// Test Card Component
const TestCard = ({ test, onClick, cardBg, textColor, borderColor, getDifficultyColor }) => {
  const { 
    title, 
    description, 
    estimatedTime, 
    icon, 
    category, 
    difficulty, 
    imageUrl 
  } = test;
  
  return (
    <Box 
      bg={cardBg} 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="md"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
        cursor: 'pointer'
      }}
      onClick={onClick}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box height="180px" position="relative">
        <Image 
          src={imageUrl} 
          alt={title}
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Badge 
          position="absolute" 
          top={3} 
          right={3}
          colorScheme={getDifficultyColor(difficulty)}
          px={2}
          py={1}
          borderRadius="md"
          textTransform="capitalize"
        >
          {difficulty}
        </Badge>
      </Box>
      
      <VStack 
        p={5} 
        align="stretch" 
        spacing={4}
        flex="1"
        justifyContent="space-between"
      >
        <Box>
          <HStack align="center" mb={2} spacing={2}>
            <Icon as={icon} color="brand.500" boxSize={5} />
            <Badge colorScheme="teal" variant="subtle" px={2}>
              {category}
            </Badge>
          </HStack>
          
          <Heading as="h3" size="md" mb={2}>
            {title}
          </Heading>
          
          <Text color={textColor} noOfLines={3}>
            {description}
          </Text>
        </Box>
        
        <Flex justify="space-between" align="center">
          <HStack color={textColor}>
            <TimeIcon />
            <Text fontSize="sm">{estimatedTime} min</Text>
          </HStack>
          
          <Button 
            size="sm" 
            colorScheme="brand" 
            variant="outline"
            rightIcon={<Icon as={TimeIcon} />}
          >
            Take Test
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default HealthTests; 