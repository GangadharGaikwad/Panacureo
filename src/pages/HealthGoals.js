import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Icon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHome, FaBullseye } from 'react-icons/fa';
import HealthGoals from '../components/HealthGoals';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const HealthGoalsPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('brand.600', 'brand.300');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Box bg={bgColor} minH="100vh" pt={{ base: "80px", md: "100px" }} pb="12">
      <Container maxW="1200px">
        {/* Breadcrumb */}
        <Breadcrumb mb={4} fontSize="sm" color={textColor}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">
              <HStack spacing={1}>
                <Icon as={FaHome} />
                <Text>Home</Text>
              </HStack>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              <HStack spacing={1}>
                <Icon as={FaBullseye} />
                <Text>Health Goals</Text>
              </HStack>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Page Header */}
        <MotionBox 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          mb={8}
        >
          <Heading 
            as="h1" 
            size="xl" 
            mb={2}
            color={headingColor}
          >
            Health Goals
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Set, track, and achieve your personal health and wellness goals.
          </Text>
        </MotionBox>
        
        {/* Main Content */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } }
          }}
        >
          <HealthGoals />
        </MotionBox>
      </Container>
    </Box>
  );
};

export default HealthGoalsPage; 