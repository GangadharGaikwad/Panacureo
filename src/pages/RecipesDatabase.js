import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  Image,
  Stack,
  HStack,
  Badge,
  useColorModeValue,
  Icon,
  Divider
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaUtensils, FaClock, FaFire, FaHeart } from 'react-icons/fa';
import { recipes, dietaryOptions, mealTypeOptions, sortOptions } from '../data/recipes';

const RecipesDatabase = () => {
  // State for filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  
  const navigate = useNavigate();
  
  // Colors for styling
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.700', 'white');
  const badgeBg = useColorModeValue('brand.50', 'brand.900');
  const badgeColor = useColorModeValue('brand.700', 'brand.200');
  
  // Filter and sort recipes when search, filters, or sort option changes
  useEffect(() => {
    let result = [...recipes];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(recipe => 
        recipe.title.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query)
      );
    }
    
    // Apply dietary filter
    if (dietaryFilter !== 'all') {
      result = result.filter(recipe => 
        recipe.dietaryPreferences.some(
          pref => pref.toLowerCase() === dietaryFilter.toLowerCase()
        )
      );
    }
    
    // Apply meal type filter
    if (mealTypeFilter !== 'all') {
      result = result.filter(recipe => 
        recipe.mealType.toLowerCase() === mealTypeFilter.toLowerCase()
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'prep-time-asc':
        result.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
        break;
      case 'prep-time-desc':
        result.sort((a, b) => (b.prepTime + b.cookTime) - (a.prepTime + a.cookTime));
        break;
      case 'calories-asc':
        result.sort((a, b) => a.nutritionInfo.calories - b.nutritionInfo.calories);
        break;
      case 'calories-desc':
        result.sort((a, b) => b.nutritionInfo.calories - a.nutritionInfo.calories);
        break;
      default:
        // Default sorting (no particular order)
        break;
    }
    
    setFilteredRecipes(result);
  }, [searchQuery, dietaryFilter, mealTypeFilter, sortOption]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle dietary filter change
  const handleDietaryChange = (e) => {
    setDietaryFilter(e.target.value);
  };
  
  // Handle meal type filter change
  const handleMealTypeChange = (e) => {
    setMealTypeFilter(e.target.value);
  };
  
  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  // Navigate to recipe detail page
  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setDietaryFilter('all');
    setMealTypeFilter('all');
    setSortOption('default');
  };
  
  return (
    <Box py={8} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="1200px">
        <Heading as="h1" size="2xl" mb={2} color={headingColor}>
          Recipe Database
        </Heading>
        
        <Flex justify="space-between" align="center" mb={8}>
          <Text fontSize="xl" color={textColor}>
            Discover delicious and healthy recipes for every meal
          </Text>
          
          <Button
            as={RouterLink}
            to="/saved-recipes"
            colorScheme="brand"
            leftIcon={<Icon as={FaHeart} />}
          >
            Saved Recipes
          </Button>
        </Flex>
        
        {/* Filters Section */}
        <Stack 
          direction={{ base: "column", md: "row" }} 
          spacing={4} 
          mb={8}
          align="flex-start"
        >
          {/* Search Bar */}
          <InputGroup size="md" flex={{ base: 1, md: 2 }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={handleSearchChange}
              bg={cardBg}
              borderRadius="md"
            />
          </InputGroup>
          
          {/* Dietary Filter */}
          <Select
            value={dietaryFilter}
            onChange={handleDietaryChange}
            bg={cardBg}
            borderRadius="md"
            flex={1}
          >
            {dietaryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          
          {/* Meal Type Filter */}
          <Select
            value={mealTypeFilter}
            onChange={handleMealTypeChange}
            bg={cardBg}
            borderRadius="md"
            flex={1}
          >
            {mealTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          
          {/* Sort Option */}
          <Select
            value={sortOption}
            onChange={handleSortChange}
            bg={cardBg}
            borderRadius="md"
            flex={1}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          
          {/* Reset Button */}
          <Button 
            colorScheme="brand" 
            onClick={handleResetFilters}
            variant="outline"
          >
            Reset
          </Button>
        </Stack>
        
        {/* Results Summary */}
        <Text color={textColor} mb={4}>
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
        </Text>
        
        {/* Recipe Grid */}
        {filteredRecipes.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Heading as="h3" size="lg" mb={3}>No recipes found</Heading>
            <Text color={textColor}>Try adjusting your search or filters</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredRecipes.map(recipe => (
              <Box
                key={recipe.id}
                bg={cardBg}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-5px)', cursor: 'pointer' }}
                onClick={() => handleRecipeClick(recipe.id)}
              >
                <Box position="relative" height="200px">
                  <Image
                    src={recipe.image || '/images/recipes/default.jpg'}
                    alt={recipe.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                  <Badge
                    position="absolute"
                    top={3}
                    right={3}
                    colorScheme={
                      recipe.mealType === 'Breakfast' ? 'yellow' :
                      recipe.mealType === 'Lunch' ? 'blue' :
                      recipe.mealType === 'Dinner' ? 'purple' :
                      recipe.mealType === 'Dessert' ? 'pink' : 'green'
                    }
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {recipe.mealType}
                  </Badge>
                </Box>
                
                <Box p={5}>
                  <Heading
                    as="h3"
                    size="md"
                    mb={2}
                    noOfLines={1}
                    color={headingColor}
                  >
                    {recipe.title}
                  </Heading>
                  
                  <Text color={textColor} noOfLines={2} mb={4}>
                    {recipe.description}
                  </Text>
                  
                  <HStack mb={4}>
                    {recipe.dietaryPreferences.slice(0, 3).map((pref, index) => (
                      <Badge key={index} bg={badgeBg} color={badgeColor} px={2} py={1} borderRadius="full">
                        {pref}
                      </Badge>
                    ))}
                    {recipe.dietaryPreferences.length > 3 && (
                      <Badge bg={badgeBg} color={badgeColor} px={2} py={1} borderRadius="full">
                        +{recipe.dietaryPreferences.length - 3}
                      </Badge>
                    )}
                  </HStack>
                  
                  <Divider mb={4} />
                  
                  <Flex justify="space-between">
                    <HStack>
                      <Icon as={FaClock} color="gray.500" />
                      <Text color={textColor} fontSize="sm">
                        {recipe.prepTime + recipe.cookTime} min
                      </Text>
                    </HStack>
                    
                    <HStack>
                      <Icon as={FaFire} color="gray.500" />
                      <Text color={textColor} fontSize="sm">
                        {recipe.nutritionInfo.calories} cal
                      </Text>
                    </HStack>
                    
                    <HStack>
                      <Icon as={FaUtensils} color="gray.500" />
                      <Text color={textColor} fontSize="sm">
                        {recipe.difficulty}
                      </Text>
                    </HStack>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default RecipesDatabase; 