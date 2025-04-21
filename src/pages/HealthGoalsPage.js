import React from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Button
} from '@chakra-ui/react';
import { FaChevronRight, FaHome, FaBullseye, FaChartLine, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import HealthGoals from '../components/HealthGoals';
import userProfile from '../data/userProfile';

const HealthGoalsPage = () => {
  const navigate = useNavigate();
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Container maxW="1200px" py={8}>
      {/* Breadcrumb Navigation */}
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Breadcrumb separator={<Icon as={FaChevronRight} color="gray.500" fontSize="xs" />} mb={4}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              <Icon as={FaHome} mr={1} /> Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Health Goals</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <Button 
          leftIcon={<FaArrowLeft />} 
          variant="outline" 
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Flex>
      
      {/* Page Title */}
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2} display="flex" alignItems="center">
          <Icon as={FaBullseye} mr={3} color="brand.500" /> 
          Health Goals
        </Heading>
        <Text color={textColor}>
          Set, track, and achieve your health goals. Monitor your progress and stay motivated 
          on your health journey.
        </Text>
      </Box>
      
      {/* Health Stats Overview */}
      <Box 
        mb={8} 
        p={5}
        bg={cardBg}
        borderRadius="lg"
        boxShadow="md"
      >
        <Flex align="center" mb={4}>
          <Icon as={FaChartLine} mr={2} color="teal.500" />
          <Heading size="md">Progress Overview</Heading>
        </Flex>
        
        <Text mb={4}>
          Hello, {userProfile.name}! You currently have {userProfile.healthGoals.length} active health goals.
          {userProfile.healthGoals.filter(goal => goal.status === 'completed').length > 0 && 
            ` You've completed ${userProfile.healthGoals.filter(goal => goal.status === 'completed').length} goals. Great job!`
          }
        </Text>
        
        <Text>
          Your most advanced goal is currently "{userProfile.healthGoals.sort((a, b) => b.progress - a.progress)[0]?.name}" 
          at {userProfile.healthGoals.sort((a, b) => b.progress - a.progress)[0]?.progress}% completion.
        </Text>
      </Box>
      
      {/* Main Health Goals Component */}
      <HealthGoals />
    </Container>
  );
};

export default HealthGoalsPage; 