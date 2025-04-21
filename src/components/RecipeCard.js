import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, 
  Image, 
  Heading, 
  Text, 
  Badge, 
  HStack, 
  Icon,
  Divider,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { FaClock, FaFire, FaUtensils } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.700', 'white');
  const badgeBg = useColorModeValue('brand.50', 'brand.900');
  const badgeColor = useColorModeValue('brand.700', 'brand.200');
  
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-5px)', cursor: 'pointer' }}
      onClick={handleClick}
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
  );
};

export default RecipeCard; 