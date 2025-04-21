import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Internal provider that uses navigation hooks
// This component must be used inside Router context
const AuthProviderWithNavigate = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in on initial load (from localStorage)
  useEffect(() => {
    const user = localStorage.getItem('panacureo_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = async (name, email, password) => {
    try {
      // Simulate API call
      setLoading(true);
      
      // This would normally be an API call to create a user
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        email,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('panacureo_user', JSON.stringify(user));
      setCurrentUser(user);
      setError('');
      return { success: true };
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signin = async (email, password) => {
    try {
      // Simulate API call
      setLoading(true);
      
      // This would normally be an API call to authenticate
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration, any email/password combo works
      const user = {
        id: Math.random().toString(36).substring(2, 15),
        name: email.split('@')[0], // Extract name from email
        email,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('panacureo_user', JSON.stringify(user));
      setCurrentUser(user);
      setError('');
      return { success: true };
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signout = () => {
    localStorage.removeItem('panacureo_user');
    setCurrentUser(null);
    navigate('/');
  };

  // Google sign in function
  const googleSignIn = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: Math.random().toString(36).substring(2, 15),
        name: 'Google User',
        email: 'google.user@example.com',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('panacureo_user', JSON.stringify(user));
      setCurrentUser(user);
      setError('');
      return { success: true };
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setError('');
      return { success: true };
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    currentUser,
    loading,
    error,
    signup,
    signin,
    signout,
    googleSignIn,
    resetPassword,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Export a version that doesn't directly use Router hooks
// This is the component that should be used in App.js
export const AuthProvider = ({ children }) => {
  return (
    <AuthProviderWithNavigate>
      {children}
    </AuthProviderWithNavigate>
  );
};

export default AuthContext; 