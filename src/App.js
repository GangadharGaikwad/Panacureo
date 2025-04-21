import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ChakraProvider, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import './App.css';
import './styles/global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Tests from './pages/Tests';
import TestDetail from './pages/TestDetail';
import HealthTests from './pages/HealthTests';
import RecipesDatabase from './pages/RecipesDatabase';
import RecipeDetail from './pages/RecipeDetail';
import SavedRecipes from './pages/SavedRecipes';
import DiseaseLibrary from './pages/DiseaseLibrary';
import DiseaseDetail from './pages/DiseaseDetail';
import HealthGoalsPage from './pages/HealthGoalsPage';
import Logout from './pages/Logout';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { GlobalProvider } from './context/GlobalContext';
import SearchModal from './components/SearchModal';

// Create a PageLayout component to add consistent spacing
const PageLayout = ({ children }) => {
  return (
    <Box pt={{ base: "100px", md: "120px" }} pb="50px">
      {children}
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <Header />
            <SearchModal />
            <Box minH="100vh">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/tests" 
                  element={<Navigate to="/health-tests" replace />} 
                />
                <Route 
                  path="/health-tests" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <HealthTests />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/health-tests/:id" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <TestDetail />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/health-goals" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <HealthGoalsPage />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/recipes" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <RecipesDatabase />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/recipes/:id" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <RecipeDetail />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/saved-recipes" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <SavedRecipes />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/disease-library" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <DiseaseLibrary />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/disease-library/:id" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <DiseaseDetail />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/disease-library/category/:category" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <DiseaseLibrary />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <PageLayout>
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    </PageLayout>
                  } 
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
            <Footer />
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
