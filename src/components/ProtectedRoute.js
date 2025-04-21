import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A wrapper component that redirects to the sign in page if the user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // If still checking authentication status, return nothing (or a loading spinner)
  if (loading) {
    return null; // or return <LoadingSpinner />
  }

  // If not authenticated, redirect to sign in page
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute; 