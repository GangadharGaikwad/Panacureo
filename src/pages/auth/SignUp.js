import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Checkbox, 
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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const toast = useToast();
  const { signup, loading, error } = useAuth();
  
  const colorScheme = 'brand';

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
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
    
    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const result = await signup(name, email, password);
      
      if (result.success) {
        toast({
          title: 'Account created',
          description: "We've created your account for you. Welcome to Panacureo!",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/dashboard');
      }
    }
  };

  return (
    <AuthLayout title="Start your health journey today">
      <Stack spacing={8}>
        <Stack align="center">
          <Text fontSize="2xl" fontWeight="bold">Create your account</Text>
          <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>
            to start your health journey with Panacureo
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
            <FormControl id="name" isInvalid={errors.name} isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            
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
                  autoComplete="new-password"
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
            
            <FormControl id="confirmPassword" isInvalid={errors.confirmPassword} isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            
            <FormControl id="terms" isInvalid={errors.terms}>
              <Checkbox 
                colorScheme={colorScheme} 
                isChecked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              >
                I accept the{' '}
                <Link 
                  color={`${colorScheme}.500`}
                  href="#"
                  fontWeight="semibold"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link 
                  color={`${colorScheme}.500`}
                  href="#"
                  fontWeight="semibold"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </Link>
              </Checkbox>
              <FormErrorMessage>{errors.terms}</FormErrorMessage>
            </FormControl>
            
            <Button
              type="submit"
              colorScheme={colorScheme}
              size="lg"
              mt={6}
              isLoading={loading}
              loadingText="Creating Account"
            >
              Sign up
            </Button>
          </Stack>
        </Box>
        
        <HStack justify="center" spacing={1}>
          <Text>Already have an account?</Text>
          <Link 
            as={RouterLink} 
            to="/signin" 
            color={`${colorScheme}.500`}
            fontWeight="semibold"
          >
            Sign in
          </Link>
        </HStack>
      </Stack>
    </AuthLayout>
  );
};

export default SignUp; 