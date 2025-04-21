import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Stack,
  Button,
  Flex,
  Badge,
  useColorModeValue,
  Image,
  HStack,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaClock, FaChartLine } from 'react-icons/fa';
import { getAllTests } from '../utils/api';

const MotionBox = motion(Box);

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('sm', 'dark-lg');
  const headingColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        // Replace with actual API call when available
        const data = await getAllTests();
        setTests(data);
        setFilteredTests(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError('Failed to load tests. Please try again later.');
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  useEffect(() => {
    // Filter tests based on search query and category
    const filtered = tests.filter((test) => {
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            test.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredTests(filtered);
  }, [searchQuery, categoryFilter, tests]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const getCategories = () => {
    const categories = tests.map(test => test.category);
    return ['all', ...new Set(categories)];
  };

  return (
    <Box py={{ base: 8, md: 16 }} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl">
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={6}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Health Tests</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading
            as="h1"
            size="2xl"
            fontWeight="bold"
            color={headingColor}
          >
            Health Tests
          </Heading>
          <Button 
            as={RouterLink} 
            to="/health-tests" 
            colorScheme="brand" 
            variant="outline"
            rightIcon={<ChevronRightIcon />}
          >
            View Alternative Tests Page
          </Button>
        </Flex>

        <Text fontSize="xl" color={textColor} mb={8}>
          Discover our comprehensive range of health tests designed to help you understand your body better.
        </Text>

        <Stack 
          direction={{ base: "column", md: "row" }} 
          spacing={4} 
          mb={8}
          align="flex-start"
        >
          <InputGroup size="lg" maxW={{ base: "full", md: "500px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search for tests..."
              value={searchQuery}
              onChange={handleSearchChange}
              bg={cardBg}
              borderRadius="md"
            />
          </InputGroup>
          
          <Select
            placeholder="All Categories"
            value={categoryFilter}
            onChange={handleCategoryChange}
            maxW={{ base: "full", md: "250px" }}
            size="lg"
            bg={cardBg}
            borderRadius="md"
          >
            {getCategories().map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>
        </Stack>

        {error && (
          <Box bg="red.100" color="red.800" p={4} borderRadius="md" mb={6}>
            {error}
          </Box>
        )}

        {loading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {[...Array(6)].map((_, i) => (
              <Box 
                key={i} 
                borderRadius="lg"
                overflow="hidden"
                bg={cardBg}
                boxShadow={cardShadow}
              >
                <Skeleton height="200px" />
                <Box p={6}>
                  <Skeleton height="24px" width="70%" mb={4} />
                  <Skeleton height="16px" mb={2} />
                  <Skeleton height="16px" mb={2} />
                  <Skeleton height="16px" mb={4} />
                  <Skeleton height="40px" width="40%" />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <>
            {filteredTests.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Heading as="h3" size="lg" mb={3}>No tests found</Heading>
                <Text>Try adjusting your search or filter criteria</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {filteredTests.map((test) => (
                  <MotionBox
                    key={test.id}
                    as={RouterLink}
                    to={`/test/${test.id}`}
                    borderRadius="lg"
                    overflow="hidden"
                    bg={cardBg}
                    boxShadow={cardShadow}
                    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                    transition="all 0.3s ease"
                    whileHover={{ scale: 1.03 }}
                    display="block"
                    textDecoration="none"
                  >
                    {test.image && (
                      <Image
                        src={test.image}
                        alt={test.title}
                        h="200px"
                        w="100%"
                        objectFit="cover"
                      />
                    )}
                    <Box p={6}>
                      <HStack mb={2}>
                        <Badge colorScheme="green" px={2} py={1} borderRadius="md">
                          {test.category}
                        </Badge>
                        {test.isFeatured && (
                          <Badge colorScheme="purple" px={2} py={1} borderRadius="md">
                            Featured
                          </Badge>
                        )}
                      </HStack>
                      <Heading
                        as="h3"
                        size="md"
                        color={headingColor}
                        mb={2}
                        noOfLines={2}
                      >
                        {test.title}
                      </Heading>
                      <Text color={textColor} noOfLines={3} mb={4}>
                        {test.description}
                      </Text>
                      <HStack spacing={4} mt={2} mb={4}>
                        <Flex align="center">
                          <Icon as={FaClock} mr={2} color="gray.500" />
                          <Text fontSize="sm" color="gray.500">
                            {test.estimatedTime || '5-10 mins'}
                          </Text>
                        </Flex>
                        <Flex align="center">
                          <Icon as={FaChartLine} mr={2} color="gray.500" />
                          <Text fontSize="sm" color="gray.500">
                            {test.complexity || 'Easy'}
                          </Text>
                        </Flex>
                      </HStack>
                      <Button 
                        colorScheme="brand" 
                        size="sm" 
                        rightIcon={<ChevronRightIcon />}
                      >
                        View Details
                      </Button>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Tests; 