import React, { useState } from 'react';
import { 
  Box, 
  Button, 
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
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const toast = useToast();
  const { resetPassword, loading, error } = useAuth();
  
  const colorScheme = 'brand';

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const result = await resetPassword(email);
      
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: 'Reset link sent',
          description: 'Please check your email for password reset instructions',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <AuthLayout title="Reset your password easily">
      <Stack spacing={8}>
        <Stack align="center">
          <Text fontSize="2xl" fontWeight="bold">Reset your password</Text>
          <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </Stack>
        
        <Box
          as="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            {isSuccess && (
              <Alert status="success" rounded="md">
                <AlertIcon />
                <AlertDescription>
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox.
                </AlertDescription>
              </Alert>
            )}
            
            {error && !isSuccess && (
              <Alert status="error" rounded="md">
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
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
            
            <Button
              type="submit"
              colorScheme={colorScheme}
              size="lg"
              mt={4}
              isLoading={loading}
              loadingText="Sending"
              isDisabled={isSuccess}
            >
              Send Reset Link
            </Button>
          </Stack>
        </Box>
        
        <HStack justify="center">
          <Link 
            as={RouterLink} 
            to="/signin" 
            color={`${colorScheme}.500`}
            fontWeight="semibold"
            display="flex"
            alignItems="center"
          >
            <ArrowBackIcon mr={1} />
            Back to Sign in
          </Link>
        </HStack>
      </Stack>
    </AuthLayout>
  );
};

export default ForgotPassword; 