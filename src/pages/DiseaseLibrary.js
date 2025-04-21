import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  Button,
  Flex,
  VStack,
  HStack,
  Icon,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { 
  FaHeart, 
  FaLungs, 
  FaBrain, 
  FaVirus, 
  FaUserMd,
  FaThermometerHalf,
  FaStethoscope,
  FaBone,
  FaAllergies,
  FaShieldAlt,
  FaChevronRight
} from 'react-icons/fa';
import { 
  diseases, 
  diseaseCategories, 
  getFeaturedDiseases, 
  getDiseasesByCategory,
  searchDiseases,
  getDiseasesAlphabetically 
} from '../data/diseases';

// Helper function to get the appropriate icon for each category
const getCategoryIcon = (categoryId) => {
  switch (categoryId) {
    case 'cardiovascular':
      return FaHeart;
    case 'respiratory':
      return FaLungs;
    case 'neurological':
      return FaBrain;
    case 'infectious':
      return FaVirus;
    case 'mental':
      return FaUserMd;
    case 'endocrine':
      return FaThermometerHalf;
    case 'digestive':
      return FaStethoscope;
    case 'skeletal':
      return FaBone;
    case 'skin':
      return FaAllergies;
    case 'immune':
      return FaShieldAlt;
    default:
      return FaStethoscope;
  }
};

// Disease Card Component
const DiseaseCard = ({ disease }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.700', 'white');

  return (
    <Card 
      bg={cardBg} 
      borderWidth="1px" 
      borderColor={cardBorder}
      borderRadius="lg" 
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ 
        transform: 'translateY(-5px)', 
        boxShadow: 'md',
        bg: cardHoverBg
      }}
      as={RouterLink}
      to={`/disease-library/disease/${disease.id}`}
    >
      <CardHeader pb={0}>
        <Flex justify="space-between" align="center">
          <Heading size="md" color={headingColor}>{disease.name}</Heading>
          <Icon as={getCategoryIcon(disease.category)} color="brand.500" boxSize={5} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text color={textColor} noOfLines={2} mb={4}>
          {disease.description}
        </Text>
        <HStack>
          <Badge colorScheme="brand">
            {disease.category.charAt(0).toUpperCase() + disease.category.slice(1)}
          </Badge>
          {disease.featured && (
            <Badge colorScheme="purple">Common</Badge>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

// Category Card Component
const CategoryCard = ({ category }) => {
  const categoryBg = useColorModeValue('white', 'gray.800');
  const categoryHoverBg = useColorModeValue('gray.50', 'gray.700');
  const categoryBorder = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.700', 'white');
  const iconBg = useColorModeValue('brand.50', 'brand.900');
  const iconColor = useColorModeValue('brand.600', 'brand.200');
  
  return (
    <Box 
      bg={categoryBg}
      borderWidth="1px"
      borderColor={categoryBorder}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ 
        transform: 'translateY(-5px)', 
        boxShadow: 'md',
        bg: categoryHoverBg 
      }}
      p={5}
      as={RouterLink}
      to={`/disease-library/category/${category.id}`}
    >
      <Flex direction="column" align="center" justify="center" textAlign="center" h="100%">
        <Flex 
          w="60px" 
          h="60px" 
          bg={iconBg} 
          color={iconColor} 
          borderRadius="full" 
          justify="center" 
          align="center"
          mb={4}
        >
          <Icon as={getCategoryIcon(category.id)} boxSize={6} />
        </Flex>
        <Heading as="h3" size="md" mb={2} color={headingColor}>
          {category.name}
        </Heading>
        <Text color={textColor} fontSize="sm">
          View diseases
        </Text>
      </Flex>
    </Box>
  );
};

// Alphabetical Letter Index
const AlphabeticalIndex = ({ onLetterClick, activeLetter }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  return (
    <Flex wrap="wrap" justify="center" mb={8}>
      {letters.map(letter => (
        <Button
          key={letter}
          size="sm"
          variant={activeLetter === letter ? "solid" : "outline"}
          colorScheme="brand"
          m={1}
          onClick={() => onLetterClick(letter)}
        >
          {letter}
        </Button>
      ))}
      <Button
        size="sm"
        variant={activeLetter === null ? "solid" : "outline"}
        colorScheme="brand"
        m={1}
        onClick={() => onLetterClick(null)}
      >
        All
      </Button>
    </Flex>
  );
};

// Main Component
const DiseaseLibrary = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [featuredDiseases, setFeaturedDiseases] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeCategory, setActiveCategory] = useState(categoryId || null);
  const [alphabeticalDiseases, setAlphabeticalDiseases] = useState([]);
  
  // Colors
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  useEffect(() => {
    // Load featured diseases
    setFeaturedDiseases(getFeaturedDiseases());
    
    // Set initial filtered diseases based on category if provided
    if (categoryId) {
      setActiveCategory(categoryId);
      setFilteredDiseases(getDiseasesByCategory(categoryId));
    } else {
      setFilteredDiseases(diseases);
    }
    
    // Initialize alphabetical diseases
    setAlphabeticalDiseases(getDiseasesAlphabetically());
  }, [categoryId]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      // Reset to either category filter or all diseases
      if (activeCategory) {
        setFilteredDiseases(getDiseasesByCategory(activeCategory));
      } else {
        setFilteredDiseases(diseases);
      }
    } else {
      // Apply search filter
      const results = searchDiseases(query);
      setFilteredDiseases(results);
    }
    
    // Reset letter filter when searching
    setActiveLetter(null);
  };
  
  // Handle category select change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredDiseases(diseases);
      navigate('/disease-library');
    } else {
      setFilteredDiseases(getDiseasesByCategory(category));
      navigate(`/disease-library/category/${category}`);
    }
    
    // Reset search and letter filter when changing category
    setSearchQuery('');
    setActiveLetter(null);
  };
  
  // Handle letter click in alphabetical view
  const handleLetterClick = (letter) => {
    setActiveLetter(letter);
    
    if (letter === null) {
      setFilteredDiseases(diseases);
    } else {
      const filtered = alphabeticalDiseases.filter(disease => 
        disease.name.charAt(0).toUpperCase() === letter
      );
      setFilteredDiseases(filtered);
    }
    
    // Reset search and category filter when using alphabetical
    setSearchQuery('');
    setActiveCategory('all');
  };
  
  return (
    <Box py={8} bg={pageBg}>
      <Container maxW="1200px">
        <Heading as="h1" size="2xl" mb={2} color={headingColor}>
          Disease Information Library
        </Heading>
        
        <Text fontSize="xl" color={textColor} mb={8}>
          Comprehensive information about common diseases and conditions
        </Text>
        
        {/* Search and Filter Section */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          gap={4} 
          mb={8}
          align="flex-start"
        >
          <InputGroup size="md" flex={{ base: 1, md: 2 }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search diseases..."
              value={searchQuery}
              onChange={handleSearchChange}
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="md"
            />
          </InputGroup>
          
          <Select
            value={activeCategory || 'all'}
            onChange={handleCategoryChange}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="md"
            flex={1}
          >
            <option value="all">All Categories</option>
            {diseaseCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Flex>
        
        {/* Main Content */}
        <Tabs isFitted variant="enclosed" isLazy>
          <TabList mb="1em">
            <Tab>Categories</Tab>
            <Tab>Featured</Tab>
            <Tab>A-Z Listing</Tab>
          </TabList>
          
          <TabPanels>
            {/* Categories View */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={6} mb={8}>
                {diseaseCategories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </SimpleGrid>
              
              {/* If a category is selected, show diseases in that category */}
              {activeCategory && activeCategory !== 'all' && (
                <Box mt={10}>
                  <Heading size="lg" mb={6}>
                    {diseaseCategories.find(c => c.id === activeCategory)?.name || ''} Diseases
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filteredDiseases.map(disease => (
                      <DiseaseCard key={disease.id} disease={disease} />
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </TabPanel>
            
            {/* Featured Common Diseases */}
            <TabPanel>
              <Box mb={8}>
                <Heading size="lg" mb={6}>
                  Common Diseases
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {featuredDiseases.map(disease => (
                    <DiseaseCard key={disease.id} disease={disease} />
                  ))}
                </SimpleGrid>
              </Box>
            </TabPanel>
            
            {/* A-Z View */}
            <TabPanel>
              <AlphabeticalIndex onLetterClick={handleLetterClick} activeLetter={activeLetter} />
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {(activeLetter ? filteredDiseases : alphabeticalDiseases).map(disease => (
                  <DiseaseCard key={disease.id} disease={disease} />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        {/* Search Results (when searching) */}
        {searchQuery && (
          <Box mt={10}>
            <Divider mb={8} />
            <Heading size="lg" mb={2}>
              Search Results
            </Heading>
            <Text color={textColor} mb={6}>
              Found {filteredDiseases.length} {filteredDiseases.length === 1 ? 'disease' : 'diseases'} matching "{searchQuery}"
            </Text>
            
            {filteredDiseases.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filteredDiseases.map(disease => (
                  <DiseaseCard key={disease.id} disease={disease} />
                ))}
              </SimpleGrid>
            ) : (
              <Box textAlign="center" py={10}>
                <Heading as="h3" size="md" mb={3}>No diseases found</Heading>
                <Text>Try adjusting your search terms</Text>
              </Box>
            )}
          </Box>
        )}
        
        {/* Health Disclaimer */}
        <Box mt={12} p={6} bg={useColorModeValue('gray.50', 'gray.800')} borderRadius="md">
          <Heading as="h3" size="md" mb={3}>
            Medical Disclaimer
          </Heading>
          <Text fontSize="sm" color={textColor}>
            The information provided in this disease library is for educational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default DiseaseLibrary; 