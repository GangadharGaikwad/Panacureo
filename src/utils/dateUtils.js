/**
 * Utility functions for date operations in the Panacureo app
 */

/**
 * Format a date string into a human-readable format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string} format - Format option: 'short', 'medium', 'long', or 'full'
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString, format = 'medium') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric' 
      });
    
    case 'medium':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    
    case 'long':
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    
    case 'full':
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Get an array of dates for the last N days
 * @param {number} days - Number of days to go back
 * @returns {Array} - Array of date strings in YYYY-MM-DD format
 */
export const getLastNDays = (days) => {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(date.toISOString().split('T')[0]);
  }
  return result;
};

/**
 * Calculate age from a birth date
 * @param {string} birthDateString - Birth date in YYYY-MM-DD format
 * @returns {number} - Age in years
 */
export const calculateAge = (birthDateString) => {
  if (!birthDateString) return 0;
  
  const birthDate = new Date(birthDateString);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}; 