import { FaSeedling, FaLeaf, FaFire, FaHeart, FaBrain } from 'react-icons/fa';
import { MdFreeBreakfast, MdLunchDining, MdDinnerDining } from 'react-icons/md';
import { getPlaceholderImage, getUnsplashImageForCategory } from '../utils/imageUtils';

/**
 * Recipe data model
 * Each recipe has:
 * - id: unique identifier
 * - title: name of the recipe
 * - description: brief overview
 * - image: image path
 * - prepTime: preparation time in minutes
 * - cookTime: cooking time in minutes
 * - servings: number of servings
 * - difficulty: easy, medium, hard
 * - mealType: breakfast, lunch, dinner, snack, dessert
 * - dietaryPreferences: array of dietary preferences (vegetarian, vegan, etc.)
 * - tags: array of tags (healthy, low-carb, etc.)
 * - ingredients: array of ingredients with measurements
 * - instructions: array of step-by-step instructions
 * - nutritionInfo: nutrition information per serving
 */

export const recipes = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    description: 'A nutritious bowl packed with Mediterranean flavors, perfect for a balanced meal.',
    image: getUnsplashImageForCategory('mediterranean', 'food', 800, 600),
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'easy',
    mealType: 'lunch',
    dietaryPreferences: ['vegetarian', 'gluten-free'],
    tags: ['high-protein', 'heart-healthy', 'anti-inflammatory'],
    ingredients: [
      { amount: '1', name: 'quinoa', unit: 'cup' },
      { amount: '2', name: 'water', unit: 'cups' },
      { amount: '1', name: 'cucumber', unit: 'medium' },
      { amount: '1', name: 'tomato', unit: 'large' },
      { amount: '1/2', name: 'red onion', unit: 'medium' },
      { amount: '1/4', name: 'kalamata olives', unit: 'cup' },
      { amount: '1/4', name: 'feta cheese', unit: 'cup' },
      { amount: '2', name: 'olive oil', unit: 'tablespoons' },
      { amount: '1', name: 'lemon juice', unit: 'tablespoon' },
      { amount: '1', name: 'fresh parsley', unit: 'tablespoon' },
      { amount: '1/2', name: 'salt', unit: 'teaspoon' },
      { amount: '1/4', name: 'black pepper', unit: 'teaspoon' }
    ],
    instructions: [
      'Rinse quinoa thoroughly.',
      'In a medium saucepan, bring quinoa and water to a boil.',
      'Reduce heat, cover, and simmer for 15 minutes or until water is absorbed.',
      'Dice cucumber, tomato, and red onion.',
      'In a large bowl, combine cooked quinoa with all vegetables, olives, and feta cheese.',
      'Whisk together olive oil, lemon juice, parsley, salt, and pepper.',
      'Pour dressing over the salad and toss to combine.',
      'Serve at room temperature or chilled.'
    ],
    nutritionInfo: {
      calories: 380,
      protein: 12,
      carbs: 45,
      fat: 18,
      fiber: 7,
      sugar: 4
    }
  },
  {
    id: '2',
    title: 'Berry Protein Smoothie',
    description: 'A delicious protein-packed smoothie to fuel your day.',
    image: getUnsplashImageForCategory('smoothie', 'food', 800, 600),
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    mealType: 'breakfast',
    dietaryPreferences: ['vegetarian', 'gluten-free'],
    tags: ['high-protein', 'quick', 'brain-food'],
    ingredients: [
      { amount: '1', name: 'banana', unit: 'medium' },
      { amount: '1', name: 'mixed berries', unit: 'cup' },
      { amount: '1', name: 'protein powder', unit: 'scoop' },
      { amount: '1', name: 'Greek yogurt', unit: 'cup' },
      { amount: '1', name: 'almond milk', unit: 'cup' },
      { amount: '1', name: 'honey', unit: 'tablespoon' },
      { amount: '1', name: 'chia seeds', unit: 'tablespoon' }
    ],
    instructions: [
      'Add all ingredients to a blender.',
      'Blend until smooth and creamy.',
      'Pour into a glass and enjoy immediately.'
    ],
    nutritionInfo: {
      calories: 320,
      protein: 25,
      carbs: 40,
      fat: 8,
      fiber: 8,
      sugar: 25
    }
  },
  {
    id: '3',
    title: 'Grilled Salmon with Avocado Salsa',
    description: 'Heart-healthy salmon topped with fresh avocado salsa.',
    image: getUnsplashImageForCategory('salmon', 'food', 800, 600),
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: 'medium',
    mealType: 'dinner',
    dietaryPreferences: ['gluten-free', 'dairy-free', 'paleo'],
    tags: ['high-protein', 'heart-healthy', 'omega-3'],
    ingredients: [
      { amount: '2', name: 'salmon fillets', unit: '6oz each' },
      { amount: '1', name: 'avocado', unit: 'ripe' },
      { amount: '1/2', name: 'red onion', unit: 'small' },
      { amount: '1', name: 'lime', unit: 'whole' },
      { amount: '1', name: 'tomato', unit: 'medium' },
      { amount: '1', name: 'cilantro', unit: 'tablespoon' },
      { amount: '2', name: 'olive oil', unit: 'tablespoons' },
      { amount: '1', name: 'salt', unit: 'teaspoon' },
      { amount: '1/2', name: 'black pepper', unit: 'teaspoon' }
    ],
    instructions: [
      'Preheat grill to medium-high heat.',
      'Rub salmon with 1 tablespoon olive oil, salt, and pepper.',
      'Grill salmon for 4-5 minutes per side until cooked through.',
      'Dice avocado, tomato, and red onion.',
      'Combine diced ingredients with lime juice, remaining olive oil, and cilantro.',
      'Season salsa with salt and pepper to taste.',
      'Serve grilled salmon topped with avocado salsa.'
    ],
    nutritionInfo: {
      calories: 420,
      protein: 35,
      carbs: 12,
      fat: 25,
      fiber: 6,
      sugar: 3
    }
  },
  {
    id: '4',
    title: 'Overnight Oats with Chia Seeds',
    description: 'A time-saving breakfast that you can prepare the night before.',
    image: getUnsplashImageForCategory('oats', 'food', 800, 600),
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    mealType: 'breakfast',
    dietaryPreferences: ['vegetarian', 'gluten-free'],
    tags: ['high-fiber', 'meal-prep', 'energy-boost'],
    ingredients: [
      { amount: '1/2', name: 'rolled oats', unit: 'cup' },
      { amount: '1', name: 'almond milk', unit: 'cup' },
      { amount: '1', name: 'chia seeds', unit: 'tablespoon' },
      { amount: '1', name: 'maple syrup', unit: 'tablespoon' },
      { amount: '1/2', name: 'cinnamon', unit: 'teaspoon' },
      { amount: '1/2', name: 'banana', unit: 'sliced' },
      { amount: '2', name: 'berries', unit: 'tablespoons' },
      { amount: '1', name: 'almond butter', unit: 'tablespoon' }
    ],
    instructions: [
      'In a jar or container, combine oats, almond milk, chia seeds, maple syrup, and cinnamon.',
      'Stir well, then cover and refrigerate overnight.',
      'In the morning, top with sliced banana, berries, and almond butter.',
      'Enjoy cold or warm in the microwave if preferred.'
    ],
    nutritionInfo: {
      calories: 350,
      protein: 10,
      carbs: 50,
      fat: 14,
      fiber: 11,
      sugar: 15
    }
  },
  {
    id: '5',
    title: 'Turmeric Anti-Inflammatory Soup',
    description: 'A warming soup with powerful anti-inflammatory properties.',
    image: getUnsplashImageForCategory('soup', 'food', 800, 600),
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'medium',
    mealType: 'dinner',
    dietaryPreferences: ['vegan', 'gluten-free', 'dairy-free'],
    tags: ['anti-inflammatory', 'immune-boosting', 'detox'],
    ingredients: [
      { amount: '1', name: 'onion', unit: 'medium' },
      { amount: '3', name: 'garlic cloves', unit: 'minced' },
      { amount: '1', name: 'ginger', unit: 'tablespoon' },
      { amount: '1', name: 'turmeric', unit: 'tablespoon' },
      { amount: '1', name: 'carrots', unit: 'cup' },
      { amount: '1', name: 'sweet potato', unit: 'medium' },
      { amount: '1', name: 'vegetable broth', unit: 'quart' },
      { amount: '1', name: 'coconut milk', unit: 'can' },
      { amount: '1', name: 'kale', unit: 'cup' },
      { amount: '2', name: 'olive oil', unit: 'tablespoons' },
      { amount: '1', name: 'black pepper', unit: 'teaspoon' },
      { amount: '1', name: 'salt', unit: 'teaspoon' }
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Sauté onion, garlic, and ginger until fragrant.',
      'Add turmeric and stir for 30 seconds.',
      'Add diced carrots and sweet potato, cook for 5 minutes.',
      'Pour in vegetable broth, bring to a boil, then reduce to a simmer.',
      'Cook until vegetables are tender, about 20 minutes.',
      'Stir in coconut milk and kale, simmer for 5 more minutes.',
      'Season with salt and pepper. Blend if desired for a smoother texture.'
    ],
    nutritionInfo: {
      calories: 280,
      protein: 5,
      carbs: 30,
      fat: 18,
      fiber: 6,
      sugar: 8
    }
  }
];

export const dietaryOptions = [
  { value: 'all', label: 'All Diets' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'low-carb', label: 'Low Carb' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' }
];

export const mealTypeOptions = [
  { value: 'all', label: 'All Meal Types' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
  { value: 'dessert', label: 'Dessert' }
];

export const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'prep-time-asc', label: 'Prep Time (Low to High)' },
  { value: 'prep-time-desc', label: 'Prep Time (High to Low)' },
  { value: 'calories-asc', label: 'Calories (Low to High)' },
  { value: 'calories-desc', label: 'Calories (High to Low)' }
];

// Helper function to get a recipe by ID
export const getRecipeById = (id) => {
  return recipes.find(recipe => recipe.id === id);
};

// Get recommended recipes based on shared tags or dietary preferences
export const getRecommendedRecipes = (currentRecipe, limit = 3) => {
  if (!currentRecipe) return [];
  
  const { id, tags, dietaryPreferences } = currentRecipe;
  
  // Filter out the current recipe and sort by relevance (number of matching tags/preferences)
  return recipes
    .filter(recipe => recipe.id !== id)
    .map(recipe => {
      const matchingTags = tags?.filter(tag => recipe.tags?.includes(tag)).length || 0;
      const matchingPreferences = dietaryPreferences?.filter(pref => 
        recipe.dietaryPreferences?.includes(pref)
      ).length || 0;
      
      return {
        ...recipe,
        relevance: matchingTags * 2 + matchingPreferences // Tags are weighted more
      };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}; 