import { 
  // Removing unused icon imports
} from 'react-icons/fa';

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
    id: 'mediterranean-salad',
    title: 'Mediterranean Quinoa Salad',
    description: 'A refreshing Mediterranean-inspired salad with protein-rich quinoa, fresh vegetables, and feta cheese.',
    image: '/images/recipes/mediterranean-salad.jpg',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    mealType: 'Lunch',
    dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
    tags: ['Healthy', 'High-Protein', 'Mediterranean'],
    ingredients: [
      { name: 'Quinoa', amount: '1 cup', notes: 'rinsed and drained' },
      { name: 'Water', amount: '2 cups' },
      { name: 'Cherry tomatoes', amount: '1 cup', notes: 'halved' },
      { name: 'Cucumber', amount: '1 medium', notes: 'diced' },
      { name: 'Red bell pepper', amount: '1', notes: 'diced' },
      { name: 'Red onion', amount: '1/4 cup', notes: 'finely chopped' },
      { name: 'Kalamata olives', amount: '1/3 cup', notes: 'pitted and halved' },
      { name: 'Feta cheese', amount: '1/2 cup', notes: 'crumbled' },
      { name: 'Fresh parsley', amount: '1/4 cup', notes: 'chopped' },
      { name: 'Extra virgin olive oil', amount: '1/4 cup' },
      { name: 'Lemon juice', amount: '2 tablespoons', notes: 'freshly squeezed' },
      { name: 'Garlic', amount: '1 clove', notes: 'minced' },
      { name: 'Dried oregano', amount: '1 teaspoon' },
      { name: 'Salt', amount: '1/2 teaspoon' },
      { name: 'Black pepper', amount: '1/4 teaspoon', notes: 'freshly ground' }
    ],
    instructions: [
      'In a medium saucepan, combine quinoa and water. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes until water is absorbed.',
      'Remove from heat and let stand for 5 minutes, then fluff with a fork and let cool to room temperature.',
      'In a large bowl, combine the cooled quinoa, cherry tomatoes, cucumber, bell pepper, red onion, olives, feta cheese, and parsley.',
      'In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper.',
      'Pour the dressing over the salad and toss to combine.',
      'Serve immediately or refrigerate for up to 3 days.'
    ],
    nutritionInfo: {
      calories: 320,
      protein: 9,
      carbs: 32,
      fat: 18,
      fiber: 5,
      sugar: 3
    }
  },
  {
    id: 'chicken-stir-fry',
    title: 'Quick Chicken Stir-Fry',
    description: 'A colorful and flavorful chicken stir-fry that comes together in minutes for a healthy weeknight dinner.',
    image: '/images/recipes/chicken-stir-fry.jpg',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: 'Medium',
    mealType: 'Dinner',
    dietaryPreferences: ['Dairy-Free'],
    tags: ['Quick', 'High-Protein', 'Asian-Inspired'],
    ingredients: [
      { name: 'Boneless, skinless chicken breasts', amount: '1 pound', notes: 'cut into bite-sized pieces' },
      { name: 'Broccoli florets', amount: '2 cups' },
      { name: 'Red bell pepper', amount: '1', notes: 'sliced' },
      { name: 'Carrots', amount: '2 medium', notes: 'thinly sliced' },
      { name: 'Snow peas', amount: '1 cup' },
      { name: 'Garlic', amount: '3 cloves', notes: 'minced' },
      { name: 'Fresh ginger', amount: '1 tablespoon', notes: 'grated' },
      { name: 'Vegetable oil', amount: '2 tablespoons' },
      { name: 'Low-sodium soy sauce', amount: '3 tablespoons' },
      { name: 'Honey', amount: '1 tablespoon' },
      { name: 'Cornstarch', amount: '1 teaspoon' },
      { name: 'Sesame oil', amount: '1 teaspoon' },
      { name: 'Red pepper flakes', amount: '1/4 teaspoon', notes: 'optional' },
      { name: 'Green onions', amount: '2', notes: 'sliced, for garnish' },
      { name: 'Sesame seeds', amount: '1 tablespoon', notes: 'for garnish' }
    ],
    instructions: [
      'In a small bowl, whisk together soy sauce, honey, cornstarch, sesame oil, and red pepper flakes (if using). Set aside.',
      'Heat 1 tablespoon of vegetable oil in a large wok or skillet over high heat. Add chicken and cook for 4-5 minutes until browned and cooked through. Remove from pan and set aside.',
      'Add the remaining 1 tablespoon of oil to the pan. Add garlic and ginger, stir for 30 seconds until fragrant.',
      'Add broccoli, bell pepper, and carrots to the pan. Stir-fry for 3-4 minutes.',
      'Add snow peas and cook for an additional 1-2 minutes until vegetables are crisp-tender.',
      'Return chicken to the pan. Pour in the sauce and toss everything together for 1-2 minutes until the sauce thickens and coats everything.',
      'Garnish with green onions and sesame seeds before serving.',
      'Serve hot with rice or noodles if desired.'
    ],
    nutritionInfo: {
      calories: 290,
      protein: 35,
      carbs: 15,
      fat: 11,
      fiber: 4,
      sugar: 7
    }
  },
  {
    id: 'blueberry-pancakes',
    title: 'Fluffy Blueberry Pancakes',
    description: 'Light and fluffy pancakes studded with juicy blueberries, perfect for a weekend breakfast.',
    image: '/images/recipes/blueberry-pancakes.jpg',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    mealType: 'Breakfast',
    dietaryPreferences: ['Vegetarian'],
    tags: ['Sweet', 'Weekend', 'Family-Friendly'],
    ingredients: [
      { name: 'All-purpose flour', amount: '1 1/2 cups' },
      { name: 'Baking powder', amount: '1 tablespoon' },
      { name: 'Salt', amount: '1/4 teaspoon' },
      { name: 'Sugar', amount: '2 tablespoons' },
      { name: 'Eggs', amount: '2', notes: 'beaten' },
      { name: 'Milk', amount: '1 1/4 cups' },
      { name: 'Unsalted butter', amount: '3 tablespoons', notes: 'melted, plus more for griddle' },
      { name: 'Vanilla extract', amount: '1 teaspoon' },
      { name: 'Fresh blueberries', amount: '1 cup' },
      { name: 'Maple syrup', amount: 'For serving' }
    ],
    instructions: [
      'In a large bowl, whisk together flour, baking powder, salt, and sugar.',
      'In a separate bowl, whisk together eggs, milk, melted butter, and vanilla.',
      'Pour the wet ingredients into the dry ingredients and stir until just combined. The batter should be slightly lumpy.',
      'Gently fold in the blueberries.',
      'Heat a griddle or large skillet over medium heat. Add a small amount of butter to coat.',
      'For each pancake, pour about 1/4 cup of batter onto the griddle. Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.',
      'Flip the pancakes and cook for another 1-2 minutes until golden brown on the bottom.',
      'Serve warm with maple syrup and additional blueberries if desired.'
    ],
    nutritionInfo: {
      calories: 280,
      protein: 8,
      carbs: 42,
      fat: 9,
      fiber: 2,
      sugar: 13
    }
  },
  {
    id: 'vegetable-curry',
    title: 'Vegan Vegetable Curry',
    description: 'A hearty and flavorful vegetable curry packed with nutrients and warming spices.',
    image: '/images/recipes/vegetable-curry.jpg',
    prepTime: 20,
    cookTime: 30,
    servings: 6,
    difficulty: 'Medium',
    mealType: 'Dinner',
    dietaryPreferences: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    tags: ['Hearty', 'Spicy', 'Indian-Inspired'],
    ingredients: [
      { name: 'Coconut oil', amount: '2 tablespoons' },
      { name: 'Onion', amount: '1 large', notes: 'diced' },
      { name: 'Garlic', amount: '4 cloves', notes: 'minced' },
      { name: 'Fresh ginger', amount: '1 tablespoon', notes: 'grated' },
      { name: 'Curry powder', amount: '2 tablespoons' },
      { name: 'Ground cumin', amount: '1 teaspoon' },
      { name: 'Ground turmeric', amount: '1 teaspoon' },
      { name: 'Garam masala', amount: '1 teaspoon' },
      { name: 'Red chili flakes', amount: '1/4 teaspoon', notes: 'optional, to taste' },
      { name: 'Sweet potatoes', amount: '2 medium', notes: 'peeled and cubed' },
      { name: 'Cauliflower', amount: '1 head', notes: 'broken into florets' },
      { name: 'Red bell pepper', amount: '1', notes: 'diced' },
      { name: 'Chickpeas', amount: '1 15oz can', notes: 'drained and rinsed' },
      { name: 'Diced tomatoes', amount: '1 14oz can' },
      { name: 'Coconut milk', amount: '1 14oz can', notes: 'full-fat' },
      { name: 'Vegetable broth', amount: '1 cup' },
      { name: 'Salt', amount: 'to taste' },
      { name: 'Black pepper', amount: 'to taste' },
      { name: 'Fresh cilantro', amount: '1/4 cup', notes: 'chopped, for garnish' },
      { name: 'Lime wedges', amount: 'for serving' }
    ],
    instructions: [
      'Heat coconut oil in a large pot over medium heat. Add onion and sauté for 3-4 minutes until softened.',
      'Add garlic and ginger, cook for another minute until fragrant.',
      'Stir in curry powder, cumin, turmeric, garam masala, and red chili flakes (if using). Cook for 30 seconds to toast the spices.',
      'Add sweet potatoes, cauliflower, and bell pepper. Stir to coat with the spices.',
      'Add chickpeas, diced tomatoes with their juice, coconut milk, and vegetable broth. Stir to combine.',
      'Bring to a simmer, then reduce heat to low. Cover and cook for 20-25 minutes, stirring occasionally, until the vegetables are tender.',
      'Season with salt and pepper to taste.',
      'Serve hot over rice, garnished with fresh cilantro and lime wedges on the side.'
    ],
    nutritionInfo: {
      calories: 310,
      protein: 8,
      carbs: 33,
      fat: 18,
      fiber: 9,
      sugar: 8
    }
  },
  {
    id: 'chocolate-avocado-mousse',
    title: 'Chocolate Avocado Mousse',
    description: 'A rich and creamy chocolate mousse made with avocados for a healthier dessert option.',
    image: '/images/recipes/chocolate-avocado-mousse.jpg',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: 'Easy',
    mealType: 'Dessert',
    dietaryPreferences: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    tags: ['Healthy Dessert', 'No-Bake', 'Quick'],
    ingredients: [
      { name: 'Ripe avocados', amount: '2 large' },
      { name: 'Unsweetened cocoa powder', amount: '1/2 cup' },
      { name: 'Maple syrup', amount: '1/3 cup', notes: 'or to taste' },
      { name: 'Almond milk', amount: '1/4 cup', notes: 'unsweetened' },
      { name: 'Vanilla extract', amount: '1 teaspoon' },
      { name: 'Salt', amount: '1/8 teaspoon' },
      { name: 'Dark chocolate chips', amount: '2 tablespoons', notes: 'melted, plus more for garnish' },
      { name: 'Fresh berries', amount: 'For garnish', notes: 'optional' },
      { name: 'Mint leaves', amount: 'For garnish', notes: 'optional' }
    ],
    instructions: [
      'Cut avocados in half, remove the pits, and scoop the flesh into a food processor or blender.',
      'Add cocoa powder, maple syrup, almond milk, vanilla extract, salt, and melted chocolate to the food processor.',
      'Blend until smooth and creamy, stopping to scrape down the sides as needed.',
      'Taste and adjust sweetness if necessary by adding more maple syrup.',
      'Spoon the mousse into four serving glasses or bowls.',
      'Refrigerate for at least 30 minutes to set and chill.',
      'Before serving, garnish with additional dark chocolate shavings, fresh berries, and mint leaves if desired.'
    ],
    nutritionInfo: {
      calories: 240,
      protein: 4,
      carbs: 27,
      fat: 15,
      fiber: 9,
      sugar: 14
    }
  },
  {
    id: 'honey-garlic-salmon',
    title: 'Honey Garlic Glazed Salmon',
    description: 'Perfectly seared salmon fillets brushed with a sweet and savory honey garlic glaze, ready in under 30 minutes.',
    image: '/images/recipes/honey-garlic-salmon.jpg',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    mealType: 'Dinner',
    dietaryPreferences: ['Gluten-Free', 'Dairy-Free'],
    tags: ['High-Protein', 'Omega-3', 'Quick', 'Seafood'],
    ingredients: [
      { name: 'Salmon fillets', amount: '4 (6 oz each)', notes: 'skin-on' },
      { name: 'Salt', amount: '1/2 teaspoon' },
      { name: 'Black pepper', amount: '1/4 teaspoon', notes: 'freshly ground' },
      { name: 'Olive oil', amount: '1 tablespoon' },
      { name: 'Garlic', amount: '4 cloves', notes: 'minced' },
      { name: 'Honey', amount: '1/4 cup' },
      { name: 'Soy sauce', amount: '2 tablespoons', notes: 'use tamari for gluten-free' },
      { name: 'Lemon juice', amount: '1 tablespoon', notes: 'freshly squeezed' },
      { name: 'Red pepper flakes', amount: '1/4 teaspoon', notes: 'optional' },
      { name: 'Fresh parsley', amount: '2 tablespoons', notes: 'chopped, for garnish' },
      { name: 'Lemon wedges', amount: 'For serving' }
    ],
    instructions: [
      'Pat the salmon fillets dry with paper towels and season both sides with salt and pepper.',
      'In a small bowl, whisk together garlic, honey, soy sauce, lemon juice, and red pepper flakes (if using).',
      'Heat olive oil in a large non-stick skillet over medium-high heat.',
      'Place salmon in the skillet, skin-side down, and cook for 4-5 minutes until the skin is crispy.',
      'Flip the salmon and cook for another 2 minutes.',
      'Pour the honey garlic sauce over the salmon, reduce heat to medium-low, and cook for another 1-2 minutes, occasionally spooning the sauce over the salmon.',
      'Remove from heat when salmon is cooked through and the sauce has thickened slightly.',
      'Garnish with chopped parsley and serve immediately with lemon wedges and your favorite side dishes.'
    ],
    nutritionInfo: {
      calories: 385,
      protein: 34,
      carbs: 14,
      fat: 22,
      fiber: 0,
      sugar: 12
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
  return recipes.find(recipe => recipe.id === id) || null;
};

// Helper function to get recommended recipes based on a recipe
export const getRecommendedRecipes = (currentRecipeId, limit = 3) => {
  const currentRecipe = getRecipeById(currentRecipeId);
  if (!currentRecipe) return [];
  
  // Filter recipes that share at least one tag or dietary preference with current recipe
  // but exclude the current recipe itself
  const recommendedRecipes = recipes.filter(recipe => {
    if (recipe.id === currentRecipeId) return false;
    
    const sharedTags = recipe.tags.some(tag => currentRecipe.tags.includes(tag));
    const sharedDiet = recipe.dietaryPreferences.some(diet => 
      currentRecipe.dietaryPreferences.includes(diet)
    );
    
    return sharedTags || sharedDiet;
  });
  
  // Slice to get the requested number of recipes
  return recommendedRecipes.slice(0, limit);
}; 