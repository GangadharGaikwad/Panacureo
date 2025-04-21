import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Badge,
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  Icon,
  SimpleGrid,
  Divider,
  List,
  ListItem,
  ListIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FaClock, FaChartLine, FaCheckCircle, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import { getTestById } from '../utils/api';

const MotionBox = motion(Box);

const TestDetail = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Move all color mode hooks to the top level so they're not conditionally called
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const pageBgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        setLoading(true);
        // Replace with actual API call when available
        const data = await getTestById(testId);
        setTest(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching test details:', err);
        setError('Failed to load test details. Please try again later.');
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [testId]);

  const handleStartTest = () => {
    // Will be implemented to start the actual test
    onClose();
    // For now, just show an alert about the feature being under development
    window.alert('Test would start here. Feature under development.');
  };

  if (loading) {
    return (
      <Box py={{ base: 8, md: 16 }} bg={pageBgColor}>
        <Container maxW="container.xl">
          <Skeleton height="40px" width="300px" mb={6} />
          <Skeleton height="60px" width="70%" mb={6} />
          <Skeleton height="24px" width="50%" mb={10} />
          
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
            <Skeleton height="300px" colSpan={2} />
            <Stack spacing={4}>
              <Skeleton height="100px" />
              <Skeleton height="200px" />
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={{ base: 8, md: 16 }} bg={pageBgColor}>
        <Container maxW="container.xl" textAlign="center">
          <Heading mb={4}>Error</Heading>
          <Text mb={6}>{error}</Text>
          <Button as={RouterLink} to="/health-tests" colorScheme="brand">
            Return to Tests
          </Button>
        </Container>
      </Box>
    );
  }

  if (!test) {
    return (
      <Box py={{ base: 8, md: 16 }} bg={pageBgColor}>
        <Container maxW="container.xl" textAlign="center">
          <Heading mb={4}>Test Not Found</Heading>
          <Text mb={6}>The test you're looking for might have been removed or doesn't exist.</Text>
          <Button as={RouterLink} to="/health-tests" colorScheme="brand">
            Browse Available Tests
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={{ base: 8, md: 16 }} bg={pageBgColor}>
      <Container maxW="container.xl">
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={6}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/health-tests">Health Tests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{test.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <HStack mb={4} spacing={3}>
          <Badge colorScheme="green" px={2} py={1} borderRadius="md">
            {test.category}
          </Badge>
          {test.isFeatured && (
            <Badge colorScheme="purple" px={2} py={1} borderRadius="md">
              Featured
            </Badge>
          )}
        </HStack>

        <Heading 
          as="h1"
          size="2xl"
          fontWeight="bold"
          color={headingColor}
          mb={4}
        >
          {test.title}
        </Heading>
        
        <Text fontSize="xl" color={textColor} mb={10} maxW="container.md">
          {test.description}
        </Text>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} mb={16}>
          <Box
            gridColumn={{ lg: "span 2" }}
            borderRadius="lg"
            overflow="hidden"
            bg={cardBg}
            boxShadow="md"
          >
            {test.image ? (
              <Image 
                src={test.image} 
                alt={test.title}
                w="100%"
                h={{ base: "250px", md: "400px" }}
                objectFit="cover"
              />
            ) : (
              <Box 
                bg="gray.200" 
                w="100%" 
                h={{ base: "250px", md: "400px" }} 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Icon as={FaQuestionCircle} boxSize={16} color="gray.400" />
              </Box>
            )}
            <Box p={8}>
              <Heading as="h2" size="lg" mb={4} color={headingColor}>
                About this Test
              </Heading>
              <Text color={textColor} mb={6}>
                {test.longDescription || test.description}
              </Text>

              <Heading as="h3" size="md" mb={4} color={headingColor}>
                Why Take This Test?
              </Heading>
              <List spacing={3} mb={6}>
                {(test.benefits || [
                  "Gain valuable insights about your health",
                  "Identify potential areas for improvement",
                  "Track your progress over time",
                  "Get personalized recommendations"
                ]).map((benefit, index) => (
                  <ListItem key={index} display="flex" alignItems="center">
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    <Text color={textColor}>{benefit}</Text>
                  </ListItem>
                ))}
              </List>

              <Divider my={6} />

              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton px={0}>
                    <Box flex="1" textAlign="left">
                      <Heading as="h3" size="md" color={headingColor}>
                        How It Works
                      </Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={3}>
                      {(test.steps || [
                        "Answer a series of targeted questions about your health and lifestyle",
                        "Receive instant analysis of your responses",
                        "Get a detailed report with personalized insights",
                        "Access recommended actions to improve your health"
                      ]).map((step, index) => (
                        <ListItem key={index} display="flex">
                          <Box
                            minW="24px"
                            h="24px"
                            borderRadius="full"
                            bg={accentColor}
                            color="white"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="sm"
                            fontWeight="bold"
                            mr={3}
                          >
                            {index + 1}
                          </Box>
                          <Text color={textColor}>{step}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>

                {test.faqs && test.faqs.length > 0 && (
                  <AccordionItem border="none">
                    <AccordionButton px={0}>
                      <Box flex="1" textAlign="left">
                        <Heading as="h3" size="md" color={headingColor}>
                          Frequently Asked Questions
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <VStack spacing={4} align="stretch">
                        {test.faqs.map((faq, index) => (
                          <Box key={index}>
                            <Text fontWeight="bold" mb={1} color={headingColor}>
                              {faq.question}
                            </Text>
                            <Text color={textColor}>
                              {faq.answer}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                )}
              </Accordion>
            </Box>
          </Box>

          <Box>
            <MotionBox
              borderRadius="lg"
              bg={cardBg}
              boxShadow="md"
              border="1px"
              borderColor={borderColor}
              p={6}
              mb={6}
              position="sticky"
              top="100px"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Heading as="h3" size="md" mb={4} color={headingColor}>
                Test Details
              </Heading>
              <VStack spacing={4} align="stretch" mb={6}>
                <Flex align="center">
                  <Icon as={FaClock} boxSize={5} mr={3} color="gray.500" />
                  <Box>
                    <Text fontWeight="semibold" color={headingColor}>Duration</Text>
                    <Text color={textColor}>{test.estimatedTime || 'Approximately 5-10 minutes'}</Text>
                  </Box>
                </Flex>
                <Flex align="center">
                  <Icon as={FaChartLine} boxSize={5} mr={3} color="gray.500" />
                  <Box>
                    <Text fontWeight="semibold" color={headingColor}>Complexity</Text>
                    <Text color={textColor}>{test.complexity || 'Easy'}</Text>
                  </Box>
                </Flex>
                <Flex align="center">
                  <Icon as={FaInfoCircle} boxSize={5} mr={3} color="gray.500" />
                  <Box>
                    <Text fontWeight="semibold" color={headingColor}>Privacy</Text>
                    <Text color={textColor}>{test.privacy || 'Your data is kept private and secure'}</Text>
                  </Box>
                </Flex>
              </VStack>
              <Button
                colorScheme="brand"
                size="lg"
                width="full"
                mb={4}
                onClick={onOpen}
                rightIcon={<ChevronRightIcon />}
              >
                Start Test
              </Button>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                No account required. Free to use.
              </Text>
            </MotionBox>

            {test.relatedTests && test.relatedTests.length > 0 && (
              <Box
                borderRadius="lg"
                bg={cardBg}
                boxShadow="md"
                border="1px"
                borderColor={borderColor}
                p={6}
              >
                <Heading as="h3" size="md" mb={4} color={headingColor}>
                  Related Tests
                </Heading>
                <VStack spacing={4} align="stretch">
                  {test.relatedTests.map((relatedTest) => (
                    <Box
                      key={relatedTest.id}
                      as={RouterLink}
                      to={`/test/${relatedTest.id}`}
                      p={3}
                      borderRadius="md"
                      _hover={{ bg: hoverBgColor }}
                      transition="all 0.2s"
                    >
                      <Text fontWeight="semibold" color={headingColor}>{relatedTest.title}</Text>
                      <Text fontSize="sm" color={textColor} noOfLines={2}>{relatedTest.description}</Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </Container>

      {/* Test Start Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Start {test.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              You're about to start the {test.title} test. This will take approximately {test.estimatedTime || '5-10 minutes'} to complete.
            </Text>
            <Text fontWeight="bold">Important:</Text>
            <List spacing={2} mt={2}>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                Answer all questions honestly for the most accurate results
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                You can pause and resume the test if needed
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                Your data is private and secure
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleStartTest}>
              Start Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TestDetail; 