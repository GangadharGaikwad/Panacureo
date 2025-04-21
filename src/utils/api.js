import { healthTests, getTestById as getTestByIdFromData } from '../data/healthTests';

// Simulated API calls - in a real app, these would make HTTP requests to a backend
// These functions simulate fetching data asynchronously

/**
 * Get all health tests
 * @returns {Promise<Array>} - Promise that resolves to an array of test objects
 */
export const getAllTests = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return healthTests.map(test => ({
    ...test,
    // Additional property used in the tests page
    isFeatured: test.featured 
  }));
};

/**
 * Get a specific test by ID
 * @param {string} id - The test ID to retrieve
 * @returns {Promise<Object|null>} - Promise that resolves to the test object or null
 */
export const getTestById = async (id) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const test = getTestByIdFromData(id);
  
  if (!test) {
    return null;
  }
  
  return {
    ...test,
    // Additional property used in the test detail page
    isFeatured: test.featured,
    
    // Add some dummy related tests - in a real app this would come from the backend
    relatedTests: healthTests
      .filter(t => t.id !== id && t.category === test.category)
      .slice(0, 3)
      .map(({ id, title, description }) => ({ id, title, description }))
  };
}; 