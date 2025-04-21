import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  List,
  ListItem,
  ListIcon,
  Button,
  Flex,
  SimpleGrid,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FaArrowLeft, FaCheck, FaExclamationTriangle, FaInfoCircle, FaStethoscope, FaHeartbeat, FaClinicMedical, FaExclamationCircle, FaLink } from 'react-icons/fa';
import { getDiseaseById, getRelatedDiseases } from '../data/diseases';

const DiseaseDetail = () => {
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(null);
  const [relatedDiseases, setRelatedDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Colors
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('brand.600', 'brand.300');
  const alertBg = useColorModeValue('orange.50', 'orange.900');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');
  
  useEffect(() => {
    // Load disease data
    const fetchDiseaseData = () => {
      setLoading(true);
      try {
        const diseaseData = getDiseaseById(diseaseId);
        setDisease(diseaseData);
        
        if (diseaseData) {
          const related = getRelatedDiseases(diseaseId);
          setRelatedDiseases(related);
        }
      } catch (error) {
        console.error("Error fetching disease data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiseaseData();
  }, [diseaseId]);
  
  if (loading) {
    return (
      <Container maxW="1200px" py={8}>
        <Text>Loading disease information...</Text>
      </Container>
    );
  }
  
  if (!disease) {
    return (
      <Container maxW="1200px" py={8}>
        <Alert 
          status="error" 
          variant="subtle" 
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="md"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Disease Not Found
          </AlertTitle>
          <Text mt={2} mb={4}>
            The disease information you're looking for could not be found.
          </Text>
          <Button 
            leftIcon={<FaArrowLeft />} 
            colorScheme="brand" 
            onClick={() => navigate('/disease-library')}
          >
            Back to Disease Library
          </Button>
        </Alert>
      </Container>
    );
  }
  
  return (
    <Box py={8} bg={pageBg}>
      <Container maxW="1200px">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          spacing="8px" 
          separator={<ChevronRightIcon color="gray.500" />} 
          mb={6}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/disease-library">Disease Library</BreadcrumbLink>
          </BreadcrumbItem>
          {disease.category && (
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to={`/disease-library/category/${disease.category}`}>
                {disease.category.charAt(0).toUpperCase() + disease.category.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{disease.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Back Button */}
        <Button 
          leftIcon={<FaArrowLeft />} 
          variant="ghost" 
          mb={6}
          onClick={() => navigate('/disease-library')}
        >
          Back to Disease Library
        </Button>
        
        {/* Disease Header */}
        <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md" mb={8}>
          <Heading as="h1" size="xl" mb={4} color={headingColor}>
            {disease.name}
          </Heading>
          
          <Badge colorScheme="brand" mb={6} fontSize="md" px={3} py={1} borderRadius="full">
            {disease.category.charAt(0).toUpperCase() + disease.category.slice(1)}
          </Badge>
          
          <Text fontSize="lg" color={textColor} mb={6}>
            {disease.description}
          </Text>
          
          {/* When to See Doctor Alert */}
          <Alert 
            status="warning" 
            bg={alertBg} 
            borderRadius="md" 
            alignItems="flex-start"
            mb={4}
          >
            <AlertIcon boxSize={5} mt={1} />
            <Box>
              <Heading as="h3" size="sm" mb={2}>
                When to See a Doctor
              </Heading>
              <Text fontSize="md">
                {disease.whenToSeeDoctor}
              </Text>
            </Box>
          </Alert>
        </Box>
        
        {/* Main Content Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
          {/* Left Column */}
          <Box>
            {/* Symptoms Section */}
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md" mb={8}>
              <Flex align="center" mb={4}>
                <Icon as={FaExclamationTriangle} color="orange.500" mr={2} boxSize={5} />
                <Heading as="h2" size="md" color={headingColor}>
                  Symptoms
                </Heading>
              </Flex>
              
              <List spacing={3}>
                {disease.symptoms.map((symptom, index) => (
                  <ListItem key={index} display="flex">
                    <ListIcon as={FaCheck} color="green.500" mt={1} />
                    <Text>{symptom}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Causes Section */}
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md" mb={8}>
              <Flex align="center" mb={4}>
                <Icon as={FaInfoCircle} color="blue.500" mr={2} boxSize={5} />
                <Heading as="h2" size="md" color={headingColor}>
                  Causes
                </Heading>
              </Flex>
              
              <Text color={textColor}>
                {disease.causes}
              </Text>
            </Box>
            
            {/* Risk Factors Section */}
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <Flex align="center" mb={4}>
                <Icon as={FaExclamationCircle} color="red.500" mr={2} boxSize={5} />
                <Heading as="h2" size="md" color={headingColor}>
                  Risk Factors
                </Heading>
              </Flex>
              
              <List spacing={3}>
                {disease.riskFactors.map((factor, index) => (
                  <ListItem key={index} display="flex">
                    <ListIcon as={FaCheck} color="green.500" mt={1} />
                    <Text>{factor}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          
          {/* Right Column */}
          <Box>
            {/* Prevention Section */}
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md" mb={8}>
              <Flex align="center" mb={4}>
                <Icon as={FaHeartbeat} color="green.500" mr={2} boxSize={5} />
                <Heading as="h2" size="md" color={headingColor}>
                  Prevention
                </Heading>
              </Flex>
              
              <List spacing={3}>
                {disease.prevention.map((tip, index) => (
                  <ListItem key={index} display="flex">
                    <ListIcon as={FaCheck} color="green.500" mt={1} />
                    <Text>{tip}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Treatment Section */}
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md" mb={8}>
              <Flex align="center" mb={4}>
                <Icon as={FaStethoscope} color="purple.500" mr={2} boxSize={5} />
                <Heading as="h2" size="md" color={headingColor}>
                  Treatment Options
                </Heading>
              </Flex>
              
              <List spacing={3}>
                {disease.treatment.map((treatment, index) => (
                  <ListItem key={index} display="flex">
                    <ListIcon as={FaCheck} color="green.500" mt={1} />
                    <Text>{treatment}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Related Diseases Section */}
            {relatedDiseases.length > 0 && (
              <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
                <Flex align="center" mb={4}>
                  <Icon as={FaClinicMedical} color="teal.500" mr={2} boxSize={5} />
                  <Heading as="h2" size="md" color={headingColor}>
                    Related Conditions
                  </Heading>
                </Flex>
                
                <List spacing={3}>
                  {relatedDiseases.map((related, index) => (
                    <ListItem key={index}>
                      <Button 
                        as={RouterLink}
                        to={`/disease-library/disease/${related.id}`}
                        variant="link"
                        color={accentColor}
                        leftIcon={<FaLink />}
                      >
                        {related.name}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </SimpleGrid>
        
        {/* Sources Section */}
        <Box bg={sectionBg} p={6} borderRadius="lg" boxShadow="sm">
          <Heading as="h2" size="md" mb={4} color={headingColor}>
            Sources & References
          </Heading>
          
          <Divider mb={4} />
          
          <List spacing={2}>
            {disease.sources.map((source, index) => (
              <ListItem key={index} color={textColor}>
                {source}
              </ListItem>
            ))}
          </List>
          
          <Text fontSize="sm" color={textColor} mt={4} fontStyle="italic">
            Note: This information is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default DiseaseDetail; 