import React, { useState, useEffect } from 'react';

/**
 * Image utility functions for the Panacureo application
 */

/**
 * Get optimized image URL with size parameters
 * @param {string} url - Original image URL
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @param {string} format - Image format (jpg, webp, etc)
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (url, width = 800, height = 600, format = 'webp') => {
  // If URL is from Cloudinary, Imgix, or similar service, add parameters
  if (url && url.includes('cloudinary.com')) {
    return `${url.split('upload/').join(`upload/w_${width},h_${height},c_fill,q_auto,f_${format}/`)}`;
  }
  
  // For local images, just return the original URL
  return url || '';
};

/**
 * Get an image from Unsplash based on category
 * @param {string} category - Category to search for (e.g., 'mediterranean', 'smoothie')
 * @param {string} type - Type of content (e.g., 'food', 'test')
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @returns {string} - Placeholder image URL
 */
export const getUnsplashImageForCategory = (category = '', type = 'food', width = 800, height = 600) => {
  // Use a static fallback image
  return "/logo.png";
};

/**
 * Generate a fallback image with text overlay
 * @param {string} text - Text to display on the image
 * @param {string} type - Type of image (test, recipe, etc)
 * @returns {string} - Data URL for the fallback image
 */
export const generateFallbackImage = (text = '', type = 'default') => {
  // Use a static fallback image
  return "/logo.png";
};

/**
 * Convert an image to base64 for preview or upload
 * @param {File} file - Image file object
 * @returns {Promise<string>} - Base64 string representation of the image
 */
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Get placeholder image URL for when images fail to load
 * @param {string} type - Type of placeholder (avatar, food, exercise, etc.)
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = (type = 'default') => {
  // Use a static fallback image
  return "/logo.png";
};

/**
 * Preload a set of images to improve user experience
 * @param {Array<string>} urls - Array of image URLs to preload
 */
export const preloadImages = (urls = []) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * Create an image carousel array with automatic swapping
 * @param {Array<string>} images - Array of image URLs
 * @param {number} initialIndex - Initial image index to show
 * @param {number} interval - Swap interval in milliseconds
 * @returns {Object} - Image carousel state and controls
 */
export const useImageCarousel = (images = [], initialIndex = 0, interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images, interval, isPlaying]);
  
  return {
    currentImage: images[currentIndex] || getPlaceholderImage(),
    currentIndex,
    isPlaying,
    setIsPlaying,
    next: () => setCurrentIndex(prevIndex => (prevIndex + 1) % images.length),
    previous: () => setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length),
    goTo: (index) => setCurrentIndex(index % images.length)
  };
};

/**
 * Calculate aspect ratio for an image
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} - Aspect ratio as string (e.g. "16:9")
 */
export const calculateAspectRatio = (width, height) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

/**
 * Check if an image URL is valid
 * @param {string} url - Image URL to check
 * @returns {Promise<boolean>} - Promise that resolves to true if valid, false otherwise
 */
export const isImageUrlValid = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Get a color code for a specific type of content
 * @param {string} type - Type of content
 * @returns {string} - Color hex code
 */
const getColorForType = (type = 'default') => {
  const colorMap = {
    avatar: '#4299E1', // Blue
    recipe: '#38A169', // Green
    exercise: '#E53E3E', // Red
    test: '#805AD5',   // Purple
    food: '#38A169',   // Green
    default: '#718096' // Gray
  };
  
  return colorMap[type] || colorMap.default;
}; 