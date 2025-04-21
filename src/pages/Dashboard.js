import React from 'react';
import {
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  StatArrow,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { FaHeartbeat, FaRunning, FaAppleAlt, FaBed, FaUtensils, FaClipboardList, FaChartLine, FaCalendarAlt, FaVirus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HealthGoals from '../components/HealthGoals';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const statCardBg = useColorModeValue('brand.50', 'gray.800');
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  return (
    <Container maxW="1200px" py={8}>
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2}>
          Welcome, {currentUser?.name || 'User'}!
        </Heading>
        <Text color={textColor}>
          Here's an overview of your health statistics and metrics.
        </Text>
      </Box>
      
      {/* Health Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard 
          title="Heart Rate" 
          value="72" 
          unit="bpm"
          status="increase"
          change="5.2%"
          icon={FaHeartbeat}
          bg={statCardBg}
        />
        <StatCard 
          title="Steps" 
          value="8,742" 
          unit="steps"
          status="increase"
          change="12.5%"
          icon={FaRunning}
          bg={statCardBg}
        />
        <StatCard 
          title="Calories" 
          value="1,840" 
          unit="kcal"
          status="decrease"
          change="3.2%"
          icon={FaAppleAlt}
          bg={statCardBg}
        />
        <StatCard 
          title="Sleep" 
          value="7.5" 
          unit="hours"
          status="increase"
          change="8.1%"
          icon={FaBed}
          bg={statCardBg}
        />
      </SimpleGrid>
      
      {/* Dashboard Quick Access Buttons */}
      <Heading as="h2" size="lg" mb={4}>
        Quick Actions
      </Heading>
      
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={8}>
        <GridItem>
          <Button
            leftIcon={<Icon as={FaUtensils} />}
            colorScheme="brand"
            variant="solid"
            size="lg"
            height="100px"
            width="100%"
            onClick={() => handleNavigation('/recipes')}
          >
            Recipe Database
          </Button>
        </GridItem>
        
        <GridItem>
          <Button
            leftIcon={<Icon as={FaClipboardList} />}
            colorScheme="blue"
            variant="solid"
            size="lg"
            height="100px"
            width="100%"
            onClick={() => handleNavigation('/health-tests')}
          >
            Health Tests
          </Button>
        </GridItem>
        
        <GridItem>
          <Button
            leftIcon={<Icon as={FaVirus} />}
            colorScheme="purple"
            variant="solid"
            size="lg"
            height="100px"
            width="100%"
            onClick={() => handleNavigation('/disease-library')}
          >
            Disease Library
          </Button>
        </GridItem>
        
        <GridItem>
          <Button
            leftIcon={<Icon as={FaChartLine} />}
            colorScheme="teal"
            variant="solid"
            size="lg"
            height="100px"
            width="100%"
            onClick={() => handleNavigation('/profile')}
          >
            Health Progress
          </Button>
        </GridItem>
      </Grid>
      
      {/* Health Goals Component */}
      <HealthGoals />
    </Container>
  );
};

// Stat Card Component
const StatCard = ({ title, value, unit, status, change, icon, bg }) => {
  return (
    <Stat
      px={4}
      py={5}
      bg={bg}
      borderRadius="lg"
      boxShadow="sm"
      position="relative"
      overflow="hidden"
    >
      <Flex justifyContent="space-between">
        <Box>
          <StatLabel fontWeight="medium">{title}</StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold">
            {value} <Text as="span" fontSize="sm" fontWeight="normal">{unit}</Text>
          </StatNumber>
          <StatHelpText>
            <StatArrow type={status} />
            {change} since last week
          </StatHelpText>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          position="absolute"
          right={3}
          top={3}
          h={10}
          w={10}
          borderRadius="full"
          bg="brand.500"
          color="white"
        >
          <Icon as={icon} boxSize={5} />
        </Flex>
      </Flex>
    </Stat>
  );
};

export default Dashboard; 