import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Checkbox, 
  Divider, 
  FormControl, 
  FormLabel, 
  FormErrorMessage,
  HStack, 
  Input, 
  Link, 
  Stack, 
  Text, 
  useColorModeValue, 
  useToast,
  IconButton,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const toast = useToast();
  const { signin, googleSignIn, loading, error } = useAuth();
  
  const colorScheme = 'brand';

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const result = await signin(email, password);
      
      if (result.success) {
        toast({
          title: 'Sign in successful',
          description: 'Welcome back to Panacureo!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/dashboard');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await googleSignIn();
    
    if (result.success) {
      toast({
        title: 'Google sign in successful',
        description: 'Welcome back to Panacureo!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout title="Welcome back to Panacureo">
      <Stack spacing={8}>
        <Stack align="center">
          <Text fontSize="2xl" fontWeight="bold">Sign in to your account</Text>
          <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>
            to enjoy all the health features of Panacureo
          </Text>
        </Stack>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <Box
          as="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={errors.email} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            
            <FormControl id="password" isInvalid={errors.password} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            
            <Stack spacing={5}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              >
                <Checkbox colorScheme={colorScheme}>Remember me</Checkbox>
                <Link 
                  as={RouterLink} 
                  to="/forgot-password" 
                  color={`${colorScheme}.500`}
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  Forgot password?
                </Link>
              </Stack>
              
              <Button
                type="submit"
                colorScheme={colorScheme}
                size="lg"
                isLoading={loading}
                loadingText="Signing in"
              >
                Sign in
              </Button>
              
              <Stack spacing={3}>
                <Divider />
                <Button
                  w="full"
                  variant="outline"
                  leftIcon={<FaGoogle />}
                  onClick={handleGoogleSignIn}
                  isLoading={loading}
                >
                  Sign in with Google
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        
        <HStack justify="center" spacing={1}>
          <Text>Don't have an account?</Text>
          <Link 
            as={RouterLink} 
            to="/signup" 
            color={`${colorScheme}.500`}
            fontWeight="semibold"
          >
            Sign up
          </Link>
        </HStack>
      </Stack>
    </AuthLayout>
  );
};

export default SignIn; 