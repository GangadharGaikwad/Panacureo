import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Flex,
  Icon,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { FaChevronLeft, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { getRecipeById } from '../data/recipes';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Colors
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  useEffect(() => {
    // Load saved recipes from localStorage
    const fetchSavedRecipes = () => {
      setIsLoading(true);
      const savedRecipeIds = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      
      // Fetch full recipe data for each saved ID
      const recipeData = savedRecipeIds.map(id => getRecipeById(id)).filter(Boolean);
      setSavedRecipes(recipeData);
      setIsLoading(false);
    };
    
    fetchSavedRecipes();
  }, []);
  
  return (
    <Box py={8} bg={pageBg}>
      <Container maxW="1200px">
        <Flex align="center" mb={6}>
          <Button 
            leftIcon={<FaChevronLeft />} 
            variant="ghost" 
            onClick={() => navigate('/recipes')}
            mr={4}
          >
            Back to Recipes
          </Button>
          
          <Heading as="h1" size="xl">
            Saved Recipes
          </Heading>
        </Flex>
        
        <Flex align="center" mb={8}>
          <Icon as={FaHeart} color="red.500" mr={2} />
          <Text fontSize="lg" color={textColor}>
            Your favorite recipes in one place
          </Text>
        </Flex>
        
        {isLoading ? (
          <Text>Loading your saved recipes...</Text>
        ) : savedRecipes.length === 0 ? (
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="md"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No saved recipes yet
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Start exploring our recipe database and save your favorites to see them here.
            </AlertDescription>
            <Button 
              mt={4} 
              colorScheme="brand" 
              onClick={() => navigate('/recipes')}
            >
              Browse Recipes
            </Button>
          </Alert>
        ) : (
          <>
            <Text mb={4} color={textColor}>
              {savedRecipes.length} {savedRecipes.length === 1 ? 'recipe' : 'recipes'} saved
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {savedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default SavedRecipes; 