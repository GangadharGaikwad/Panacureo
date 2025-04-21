import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  List,
  ListItem,
  ListIcon,
  HStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  FaLeaf,
  FaUtensils,
  FaClock,
  FaFire,
  FaChevronLeft,
  FaCheck,
  FaRegBookmark,
  FaBookmark,
  FaCarrot
} from 'react-icons/fa';
import { getRecipeById, getRecommendedRecipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [recipe, setRecipe] = useState(null);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  
  // Colors
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.700', 'white');
  const statBg = useColorModeValue('brand.50', 'brand.900');
  
  // Fetch recipe data
  useEffect(() => {
    const fetchRecipeData = () => {
      const recipeData = getRecipeById(recipeId);
      setRecipe(recipeData);
      
      if (recipeData) {
        const recommended = getRecommendedRecipes(recipeId);
        setRecommendedRecipes(recommended);
      }
      
      // Check if recipe is in saved recipes
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      setIsSaved(savedRecipes.includes(recipeId));
    };
    
    fetchRecipeData();
  }, [recipeId]);
  
  // Toggle save recipe
  const toggleSaveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    
    if (isSaved) {
      // Remove from saved recipes
      const updatedSavedRecipes = savedRecipes.filter(id => id !== recipeId);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
      setIsSaved(false);
      
      toast({
        title: 'Recipe removed from favorites',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Add to saved recipes
      const updatedSavedRecipes = [...savedRecipes, recipeId];
      localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
      setIsSaved(true);
      
      toast({
        title: 'Recipe saved to favorites',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  // Get the diet icon based on dietary preferences
  const getDietIcon = () => {
    if (recipe.dietaryPreferences.includes('Vegan')) {
      return FaLeaf;
    } else if (recipe.dietaryPreferences.includes('Vegetarian')) {
      return FaCarrot;
    } else {
      return FaUtensils;
    }
  };
  
  if (!recipe) {
    return (
      <Box py={10} textAlign="center">
        <Heading mb={4}>Recipe not found</Heading>
        <Button
          leftIcon={<FaChevronLeft />}
          colorScheme="brand"
          onClick={() => navigate('/recipes')}
        >
          Back to Recipes
        </Button>
      </Box>
    );
  }
  
  return (
    <Box py={8} bg={pageBg}>
      <Container maxW="1200px">
        {/* Breadcrumb navigation */}
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={6}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/recipes">Recipes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{recipe.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Back button */}
        <Button 
          leftIcon={<FaChevronLeft />} 
          variant="ghost" 
          mb={6}
          onClick={() => navigate('/recipes')}
        >
          Back to Recipes
        </Button>
        
        {/* Recipe Header */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8} mb={8}>
          <GridItem>
            <Heading as="h1" size="2xl" mb={4} color={headingColor}>
              {recipe.title}
            </Heading>
            
            <Text fontSize="xl" color={textColor} mb={6}>
              {recipe.description}
            </Text>
            
            <HStack spacing={4} mb={6} flexWrap="wrap">
              {recipe.dietaryPreferences.map((pref, idx) => (
                <Tag key={idx} size="lg" colorScheme="brand" borderRadius="full" mb={2}>
                  <TagLeftIcon as={getDietIcon()} />
                  <TagLabel>{pref}</TagLabel>
                </Tag>
              ))}
            </HStack>
            
            <HStack spacing={6}>
              <Flex align="center">
                <Icon as={FaClock} mr={2} color="gray.500" />
                <Text>
                  <Text as="span" fontWeight="bold">Prep:</Text> {recipe.prepTime} min
                </Text>
              </Flex>
              
              <Flex align="center">
                <Icon as={FaFire} mr={2} color="gray.500" />
                <Text>
                  <Text as="span" fontWeight="bold">Cook:</Text> {recipe.cookTime} min
                </Text>
              </Flex>
              
              <Flex align="center">
                <Icon as={FaUtensils} mr={2} color="gray.500" />
                <Text>
                  <Text as="span" fontWeight="bold">Serves:</Text> {recipe.servings}
                </Text>
              </Flex>
            </HStack>
          </GridItem>
          
          <GridItem position="relative" height={{ base: "250px", lg: "auto" }}>
            <Image
              src={recipe.image || '/images/recipes/default.jpg'}
              alt={recipe.title}
              objectFit="cover"
              w="100%"
              h="100%"
              borderRadius="lg"
              boxShadow="md"
            />
            
            <Button
              position="absolute"
              top={4}
              right={4}
              colorScheme="brand"
              onClick={toggleSaveRecipe}
              leftIcon={isSaved ? <FaBookmark /> : <FaRegBookmark />}
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </GridItem>
        </Grid>
        
        {/* Main Content Grid */}
        <Grid 
          templateColumns={{ base: "1fr", lg: "1fr 2fr" }} 
          gap={8}
          mb={12}
        >
          {/* Left Column - Ingredients and Nutrition */}
          <GridItem>
            {/* Ingredients Card */}
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md" 
              mb={8}
            >
              <Heading as="h2" size="lg" mb={4} color={headingColor}>
                Ingredients
              </Heading>
              <Text color={textColor} mb={4}>
                For {recipe.servings} servings
              </Text>
              
              <List spacing={3}>
                {recipe.ingredients.map((ingredient, idx) => (
                  <ListItem key={idx} display="flex">
                    <ListIcon as={FaCheck} color="green.500" mt={1} />
                    <Box>
                      <Text fontWeight="medium">{ingredient.amount} {ingredient.name}</Text>
                      {ingredient.notes && (
                        <Text fontSize="sm" color={textColor}>{ingredient.notes}</Text>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Nutrition Card */}
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
            >
              <Heading as="h2" size="lg" mb={4} color={headingColor}>
                Nutrition
              </Heading>
              <Text color={textColor} mb={4}>
                Per serving
              </Text>
              
              <SimpleGrid columns={2} spacing={4} mb={4}>
                <Stat bg={statBg} p={3} borderRadius="md">
                  <StatLabel>Calories</StatLabel>
                  <StatNumber>{recipe.nutritionInfo.calories}</StatNumber>
                  <StatHelpText>kcal</StatHelpText>
                </Stat>
                
                <Stat bg={statBg} p={3} borderRadius="md">
                  <StatLabel>Protein</StatLabel>
                  <StatNumber>{recipe.nutritionInfo.protein}g</StatNumber>
                </Stat>
                
                <Stat bg={statBg} p={3} borderRadius="md">
                  <StatLabel>Carbs</StatLabel>
                  <StatNumber>{recipe.nutritionInfo.carbs}g</StatNumber>
                </Stat>
                
                <Stat bg={statBg} p={3} borderRadius="md">
                  <StatLabel>Fat</StatLabel>
                  <StatNumber>{recipe.nutritionInfo.fat}g</StatNumber>
                </Stat>
                
                <Stat bg={statBg} p={3} borderRadius="md">
                  <StatLabel>Fiber</StatLabel>
                  <StatNumber>{recipe.nutritionInfo.fiber}g</StatNumber>
                </Stat>
                
                <Stat bg={statBg} p={3} borderRadius="md">
                  <StatLabel>Sugar</StatLabel>
                  <StatNumber>{recipe.nutritionInfo.sugar}g</StatNumber>
                </Stat>
              </SimpleGrid>
              
              {/* Nutrition Bar Chart */}
              <Box mt={6}>
                <Text fontWeight="medium" mb={2}>Macronutrient Ratio</Text>
                <Flex h="20px" mb={1}>
                  <Box 
                    bg="red.400" 
                    w={`${(recipe.nutritionInfo.fat * 9 / recipe.nutritionInfo.calories) * 100}%`} 
                    borderLeftRadius="md"
                  />
                  <Box 
                    bg="blue.400" 
                    w={`${(recipe.nutritionInfo.protein * 4 / recipe.nutritionInfo.calories) * 100}%`} 
                  />
                  <Box 
                    bg="yellow.400" 
                    w={`${(recipe.nutritionInfo.carbs * 4 / recipe.nutritionInfo.calories) * 100}%`} 
                    borderRightRadius="md"
                  />
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm">Fat {Math.round((recipe.nutritionInfo.fat * 9 / recipe.nutritionInfo.calories) * 100)}%</Text>
                  <Text fontSize="sm">Protein {Math.round((recipe.nutritionInfo.protein * 4 / recipe.nutritionInfo.calories) * 100)}%</Text>
                  <Text fontSize="sm">Carbs {Math.round((recipe.nutritionInfo.carbs * 4 / recipe.nutritionInfo.calories) * 100)}%</Text>
                </Flex>
              </Box>
            </Box>
          </GridItem>
          
          {/* Right Column - Instructions */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
            >
              <Heading as="h2" size="lg" mb={6} color={headingColor}>
                Instructions
              </Heading>
              
              <List spacing={6}>
                {recipe.instructions.map((step, idx) => (
                  <ListItem key={idx} display="flex">
                    <Flex
                      align="center"
                      justify="center"
                      bg="brand.500"
                      color="white"
                      borderRadius="full"
                      w="32px"
                      h="32px"
                      fontSize="lg"
                      fontWeight="bold"
                      mr={4}
                      flexShrink={0}
                      mt={1}
                    >
                      {idx + 1}
                    </Flex>
                    <Text>{step}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </GridItem>
        </Grid>
        
        {/* Tags Section */}
        <Box mb={12}>
          <Heading as="h3" size="lg" mb={4} color={headingColor}>
            Tags
          </Heading>
          
          <Flex flexWrap="wrap" gap={2}>
            {recipe.tags.map((tag, idx) => (
              <Button
                key={idx}
                size="sm"
                colorScheme="gray"
                variant="outline"
                borderRadius="full"
              >
                {tag}
              </Button>
            ))}
          </Flex>
        </Box>
        
        {/* Recommended Recipes Section */}
        {recommendedRecipes.length > 0 && (
          <Box mb={8}>
            <Heading as="h3" size="lg" mb={6} color={headingColor}>
              You Might Also Like
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {recommendedRecipes.map(rec => (
                <Box
                  key={rec.id}
                  bg={cardBg}
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  transition="transform 0.2s"
                  _hover={{ transform: 'translateY(-5px)', cursor: 'pointer' }}
                  onClick={() => navigate(`/recipe/${rec.id}`)}
                >
                  <Box height="160px">
                    <Image
                      src={rec.image || '/images/recipes/default.jpg'}
                      alt={rec.title}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                  </Box>
                  
                  <Box p={4}>
                    <Heading as="h4" size="md" mb={2} noOfLines={1}>
                      {rec.title}
                    </Heading>
                    
                    <Text color={textColor} noOfLines={2} mb={3} fontSize="sm">
                      {rec.description}
                    </Text>
                    
                    <HStack>
                      <Icon as={FaClock} color="gray.500" />
                      <Text color={textColor} fontSize="sm">
                        {rec.prepTime + rec.cookTime} min
                      </Text>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RecipeDetail; 