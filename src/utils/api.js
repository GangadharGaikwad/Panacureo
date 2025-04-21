import { FaHeartbeat, FaWeight, FaRulerVertical, FaBrain, FaRunning, FaLungs, FaEye, FaBed } from 'react-icons/fa';

// Mock health tests data
const healthTests = [
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to determine if you are at a healthy weight for your height.',
    longDescription: 'Body Mass Index (BMI) is a simple calculation using a person\'s height and weight. The formula is BMI = kg/m² where kg is a person\'s weight in kilograms and m² is their height in meters squared. A BMI of 18.5-24.9 is considered healthy for most adults.',
    image: '/images/bmi-test.jpg',
    icon: FaWeight,
    category: 'Physical Health',
    difficulty: 'Easy',
    estimatedTime: 2,
    recommended: true
  },
  {
    id: 'heart-rate-variability',
    title: 'Heart Rate Variability',
    description: 'Measure the variation in time between your heartbeats to assess your autonomic nervous system health.',
    longDescription: 'Heart Rate Variability (HRV) is a measure of the variation in time between successive heartbeats. It reflects the heart\'s ability to respond to different situations and is considered an indicator of autonomic nervous system health, particularly the balance between sympathetic ("fight or flight") and parasympathetic ("rest and digest") activity.',
    image: '/images/hrv-test.jpg',
    icon: FaHeartbeat,
    category: 'Cardiovascular',
    difficulty: 'Medium',
    estimatedTime: 5,
    recommended: true
  },
  {
    id: 'cognitive-assessment',
    title: 'Cognitive Assessment',
    description: 'Test your memory, attention, and problem-solving abilities.',
    longDescription: 'This comprehensive cognitive assessment evaluates multiple aspects of your brain function including memory recall, attention span, processing speed, and problem-solving abilities. Regular cognitive assessments can help track brain health over time and identify areas for improvement.',
    image: '/images/cognitive-test.jpg',
    icon: FaBrain,
    category: 'Mental Health',
    difficulty: 'Medium',
    estimatedTime: 10,
    recommended: false
  },
  {
    id: 'lung-capacity',
    title: 'Lung Capacity Test',
    description: 'Estimate your lung capacity with a simple at-home breathing exercise.',
    longDescription: 'This test provides an estimate of your lung capacity by measuring how long you can exhale after a deep breath. While not as accurate as clinical spirometry, it can give you insights into your respiratory health and help track changes over time.',
    image: '/images/lung-test.jpg',
    icon: FaLungs,
    category: 'Respiratory',
    difficulty: 'Easy',
    estimatedTime: 3,
    recommended: false
  },
  {
    id: 'fitness-test',
    title: 'Home Fitness Test',
    description: 'Assess your cardiovascular fitness, strength, and flexibility with simple exercises.',
    longDescription: 'This comprehensive fitness assessment evaluates three key components of physical health: cardiovascular endurance, muscular strength, and flexibility. The test uses simple at-home exercises that require minimal equipment but provide valuable insights into your overall fitness level.',
    image: '/images/fitness-test.jpg',
    icon: FaRunning,
    category: 'Physical Health',
    difficulty: 'Hard',
    estimatedTime: 15,
    recommended: true
  },
  {
    id: 'vision-screening',
    title: 'Vision Screening',
    description: 'Check your visual acuity and color perception with our digital eye test.',
    longDescription: 'This digital vision screening assesses your visual acuity (how clearly you can see) and color perception. While not a substitute for a comprehensive eye exam with an optometrist, this screening can help identify potential vision issues that may require professional attention.',
    image: '/images/vision-test.jpg',
    icon: FaEye,
    category: 'Sensory',
    difficulty: 'Easy',
    estimatedTime: 5,
    recommended: false
  },
  {
    id: 'sleep-quality',
    title: 'Sleep Quality Assessment',
    description: 'Evaluate your sleep patterns and discover ways to improve your rest.',
    longDescription: 'This assessment evaluates various aspects of your sleep including duration, consistency, disturbances, and daytime effects. By analyzing your sleep patterns, we can provide personalized recommendations to help improve your sleep quality and overall wellbeing.',
    image: '/images/sleep-test.jpg',
    icon: FaBed,
    category: 'Rest & Recovery',
    difficulty: 'Medium',
    estimatedTime: 5,
    recommended: true
  }
];

// Categories
export const categories = [
  { id: 'all', name: 'All Tests' },
  { id: 'cardiovascular', name: 'Cardiovascular' },
  { id: 'physical-health', name: 'Physical Health' },
  { id: 'mental-health', name: 'Mental Health' },
  { id: 'respiratory', name: 'Respiratory' },
  { id: 'sensory', name: 'Sensory' },
  { id: 'rest-recovery', name: 'Rest & Recovery' }
];

// Difficulties
export const difficulties = [
  { id: 'all', name: 'All Difficulties' },
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' }
];

/**
 * Get all health tests
 * @returns {Array} Array of health test objects
 */
export const getAllTests = () => {
  return healthTests;
};

/**
 * Get health test by ID
 * @param {string} id - The ID of the test to retrieve
 * @returns {Object|null} Health test object or null if not found
 */
export const getTestById = (id) => {
  return healthTests.find(test => test.id === id) || null;
};

/**
 * Get recommended tests
 * @param {number} limit - Optional limit on number of tests to return
 * @returns {Array} Array of recommended health test objects
 */
export const getRecommendedTests = (limit = 3) => {
  const recommended = healthTests.filter(test => test.recommended);
  return recommended.slice(0, limit);
};

/**
 * Filter tests by category
 * @param {string} category - Category to filter by (or 'all' for all categories)
 * @returns {Array} Filtered array of health test objects
 */
export const getTestsByCategory = (category) => {
  if (category === 'all') return healthTests;
  return healthTests.filter(test => test.category.toLowerCase().replace(/\s+/g, '-') === category);
};

/**
 * Filter tests by difficulty
 * @param {string} difficulty - Difficulty level to filter by (or 'all' for all difficulties)
 * @returns {Array} Filtered array of health test objects
 */
export const getTestsByDifficulty = (difficulty) => {
  if (difficulty === 'all') return healthTests;
  return healthTests.filter(test => test.difficulty.toLowerCase() === difficulty);
};

/**
 * Search tests by query string
 * @param {string} query - Search query
 * @returns {Array} Array of health test objects matching the query
 */
export const searchTests = (query) => {
  if (!query || query.trim() === '') return healthTests;
  
  const normalizedQuery = query.toLowerCase().trim();
  return healthTests.filter(test => 
    test.title.toLowerCase().includes(normalizedQuery) || 
    test.description.toLowerCase().includes(normalizedQuery) ||
    test.category.toLowerCase().includes(normalizedQuery)
  );
};

/**
 * Save test result to user profile
 * This is a mock function that would normally interact with a backend API
 * @param {string} testId - ID of the test
 * @param {Object} results - Test results object
 * @returns {Promise} Promise that resolves when results are saved
 */
export const saveTestResults = (testId, results) => {
  // This would normally be an API call to a backend service
  return new Promise((resolve) => {
    console.log('Saving test results:', testId, results);
    // Simulate API delay
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

/**
 * Get user test history
 * This is a mock function that would normally interact with a backend API
 * @returns {Promise} Promise that resolves with test history
 */
export const getUserTestHistory = () => {
  // Mock test history data
  const mockHistory = [
    {
      testId: 'bmi-calculator',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      results: { bmi: 22.5, category: 'Normal weight' }
    },
    {
      testId: 'heart-rate-variability',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      results: { hrvValue: 65, hrvCategory: 'Average' }
    }
  ];
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockHistory);
    }, 1000);
  });
};

// User profile mock data and functions
const mockUserProfile = {
  id: 'user123',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  age: 34,
  gender: 'male',
  height: 175, // in cm
  weight: 70, // in kg
  profileImage: '/images/profile-placeholder.jpg',
  preferences: {
    notifications: true,
    darkMode: false,
    language: 'english'
  },
  healthGoals: [
    'Improve cardiovascular fitness',
    'Reduce stress levels',
    'Better sleep quality'
  ]
};

/**
 * Get user profile
 * @returns {Promise} Promise that resolves with user profile data
 */
export const getUserProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserProfile);
    }, 800);
  });
};

/**
 * Update user profile
 * @param {Object} updatedProfile - Updated profile data
 * @returns {Promise} Promise that resolves with updated profile
 */
export const updateUserProfile = (updatedProfile) => {
  return new Promise((resolve) => {
    // In a real app, this would be an API call to update the user's profile
    // Here we're just simulating a successful update
    setTimeout(() => {
      Object.assign(mockUserProfile, updatedProfile);
      resolve(mockUserProfile);
    }, 1000);
  });
};

/**
 * Update user preferences
 * @param {Object} updatedPreferences - Updated preferences
 * @returns {Promise} Promise that resolves with updated profile
 */
export const updateUserPreferences = (updatedPreferences) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUserProfile.preferences = {
        ...mockUserProfile.preferences,
        ...updatedPreferences
      };
      resolve(mockUserProfile);
    }, 800);
  });
};

/**
 * Update user health goals
 * @param {Array} goals - Updated health goals
 * @returns {Promise} Promise that resolves with updated profile
 */
export const updateHealthGoals = (goals) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get current user profile from localStorage
      const userProfileStr = localStorage.getItem('userProfile');
      let userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
      
      if (userProfile) {
        // Update the healthGoals property
        userProfile.healthGoals = goals;
        
        // Save back to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
      }
      
      resolve({ success: true, data: userProfile });
    }, 800);
  });
}; 