import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

function AppContent() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const location = useLocation();
  
  // Check if we're on an auth page
  const isAuthPage = ['/signin', '/signup', '/forgot-password'].includes(location.pathname);
  
  return (
    <Box minH="100vh" bg={bgColor}>
      <Flex direction="column" minH="100vh">
        {/* Only show header on non-auth pages */}
        {!isAuthPage && <Header />}
        
        {/* Main content */}
        <Box flex="1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/health-tests" element={<HealthTests />} />
            <Route path="/test/:testId" element={<TestDetail />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        
        {/* Only show footer on non-auth pages */}
        {!isAuthPage && <Footer />}
      </Flex>
    </Box>
  );
}

export default App;
