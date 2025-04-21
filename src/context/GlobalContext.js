import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the global context
const GlobalContext = createContext();

// Custom hook to use the global context
export const useGlobal = () => {
  return useContext(GlobalContext);
};

// Provider component that wraps the app and makes global state available
export const GlobalProvider = ({ children }) => {
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategory, setSearchCategory] = useState('all');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  
  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New health test available',
      description: 'Try our new Mental Wellness Assessment test.',
      time: '2 hours ago',
      isRead: false,
      type: 'test'
    },
    {
      id: '2',
      title: 'Recipe of the week',
      description: 'Healthy Mediterranean bowl - perfect for summer!',
      time: '1 day ago',
      isRead: false,
      type: 'recipe'
    },
    {
      id: '3',
      title: 'Goal completed',
      description: 'Congratulations! You\'ve reached your steps goal for the week.',
      time: '3 days ago',
      isRead: true,
      type: 'goal'
    },
    {
      id: '4',
      title: 'New article published',
      description: 'Learn about managing stress during busy periods.',
      time: '5 days ago',
      isRead: true,
      type: 'article'
    }
  ]);
  
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  
  // Page transition state
  const [pageTransition, setPageTransition] = useState({
    direction: 'right',
    previousPath: '/'
  });

  // Theme/UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Notification functions
  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.isRead).length;
  };
  
  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, isRead: true }))
    );
  };
  
  const addNotification = (notification) => {
    setNotifications([notification, ...notifications]);
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  // Search functions
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  // Perform search across the application
  const performSearch = async (query, category = 'all') => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearchLoading(true);
    
    try {
      // This would normally be an API call to search through your database
      // For now, we'll simulate it with a timeout and mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results based on category
      let results = [];
      
      // Simulate different results based on category
      if (category === 'all' || category === 'tests') {
        results = [
          ...results,
          {
            id: 'test1',
            title: 'Mental Health Assessment',
            type: 'test',
            url: '/health-tests/mental-health-assessment',
            snippet: 'Comprehensive test to evaluate your mental wellbeing and stress levels.'
          },
          {
            id: 'test2',
            title: 'Heart Health Check',
            type: 'test',
            url: '/health-tests/heart-health-check',
            snippet: 'Evaluate your cardiovascular health and identify potential risk factors.'
          }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.snippet.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (category === 'all' || category === 'recipes') {
        results = [
          ...results,
          {
            id: 'recipe1',
            title: 'Mediterranean Salad Bowl',
            type: 'recipe',
            url: '/recipes/mediterranean-salad-bowl',
            snippet: 'Fresh and healthy salad with olives, feta, and a light vinaigrette.'
          },
          {
            id: 'recipe2',
            title: 'Protein-Packed Breakfast',
            type: 'recipe',
            url: '/recipes/protein-breakfast',
            snippet: 'Start your day with this high-protein, nutrient-rich breakfast.'
          }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.snippet.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (category === 'all' || category === 'diseases') {
        results = [
          ...results,
          {
            id: 'disease1',
            title: 'Hypertension',
            type: 'disease',
            url: '/diseases/hypertension',
            snippet: 'Learn about causes, symptoms, and treatment options for high blood pressure.'
          },
          {
            id: 'disease2',
            title: 'Type 2 Diabetes',
            type: 'disease',
            url: '/diseases/type-2-diabetes',
            snippet: 'Information about management and prevention of type 2 diabetes.'
          }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.snippet.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (category === 'all' || category === 'articles') {
        results = [
          ...results,
          {
            id: 'article1',
            title: 'Stress Management Techniques',
            type: 'article',
            url: '/articles/stress-management',
            snippet: 'Effective strategies to manage and reduce stress in daily life.'
          },
          {
            id: 'article2',
            title: 'Improving Sleep Quality',
            type: 'article',
            url: '/articles/sleep-quality',
            snippet: 'Tips and habits for better sleep and improved overall health.'
          }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.snippet.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };
  
  // Execute search when query or category changes
  useEffect(() => {
    if (isSearchOpen && searchQuery.trim()) {
      performSearch(searchQuery, searchCategory);
    }
  }, [searchQuery, searchCategory, isSearchOpen]);
  
  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('panacureo_notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  // Load notifications from localStorage on initial load
  useEffect(() => {
    const savedNotifications = localStorage.getItem('panacureo_notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error parsing notifications from localStorage:', error);
      }
    }
  }, []);
  
  // Value object that will be shared with consumers
  const value = {
    // Search
    isSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    searchCategory,
    setSearchCategory,
    isSearchLoading,
    performSearch,
    openSearch,
    closeSearch,
    
    // Notifications
    notifications,
    isNotificationsPanelOpen,
    setIsNotificationsPanelOpen,
    getUnreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
    clearNotifications,
    
    // UI/navigation
    pageTransition,
    setPageTransition,
    sidebarCollapsed,
    setSidebarCollapsed
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext; 