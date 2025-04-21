import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  Grid, 
  // eslint-disable-next-line no-unused-vars
  GridItem, 
  Heading, 
  Icon, 
  Image, 
  SimpleGrid, 
  // eslint-disable-next-line no-unused-vars
  Stack, 
  Text, 
  VStack, 
  useColorModeValue,
  Avatar,
  Divider,
  HStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaFlask, FaUtensils, FaVirus, FaChartLine, FaArrowRight, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { CheckIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

// Motion components for animations
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const Home = () => {
  // Color values that change based on color mode
  const heroBg = useColorModeValue('teal.50', 'teal.900');
  const heroHeadingColor = useColorModeValue('teal.600', 'teal.200');
  const heroTextColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  const featureHeadingColor = useColorModeValue('teal.500', 'teal.300');
  const featureTextColor = useColorModeValue('gray.600', 'gray.300');
  const sectionBg = useColorModeValue('gray.50', 'gray.800');
  const dividerColor = useColorModeValue('gray.200', 'gray.700');
  const testimonialBg = useColorModeValue('gray.100', 'gray.700');
  const quoteBg = useColorModeValue('white', 'gray.600');
  const stepCircleBg = useColorModeValue('brand.500', 'brand.400');
  const stepCircleColor = useColorModeValue('white', 'white');

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={heroBg} py={{ base: 16, md: 20 }}>
        <Container maxW="1200px">
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between" 
            gap={10}
          >
            {/* Hero Content */}
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              maxW={{ base: '100%', md: '50%' }}
            >
              <MotionHeading 
                as="h1" 
                size="2xl" 
                color={heroHeadingColor}
                lineHeight="1.2"
                mb={4}
                variants={fadeInUp}
              >
                Your Health Journey Starts Here
              </MotionHeading>
              <MotionText 
                fontSize="xl" 
                color={heroTextColor} 
                mb={6}
                variants={fadeInUp}
              >
                Panacureo gives you the tools to understand, track and improve your health with personalized insights and recommendations.
              </MotionText>
              <MotionBox variants={fadeInUp}>
                <Button 
                  size="lg" 
                  colorScheme="brand" 
                  px={8} 
                  mr={4}
                  rightIcon={<FaArrowRight />}
                >
                  Take a Health Test
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  colorScheme="brand" 
                  px={8}
                  mt={{ base: 4, md: 0 }}
                >
                  Learn More
                </Button>
              </MotionBox>
            </MotionBox>

            {/* Hero Image */}
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              maxW={{ base: '100%', md: '45%' }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Health monitoring" 
                borderRadius="xl"
                shadow="2xl"
              />
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={16}>
        <Container maxW="1200px">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            textAlign="center"
            mb={12}
          >
            <Heading as="h2" size="xl" mb={4}>
              Comprehensive Health Features
            </Heading>
            <Text fontSize="lg" color={featureTextColor} maxW="700px" mx="auto">
              Everything you need to monitor, understand, and improve your health in one place.
            </Text>
          </MotionBox>

          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {features.map((feature, index) => (
                <MotionBox 
                  key={index} 
                  variants={fadeInUp}
                >
                  <Box 
                    bg={cardBg} 
                    p={8} 
                    borderRadius="lg" 
                    boxShadow="md"
                    height="100%"
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                  >
                    <Flex 
                      w="60px" 
                      h="60px" 
                      bg="brand.500" 
                      color="white" 
                      borderRadius="full" 
                      justify="center" 
                      align="center"
                      mb={4}
                    >
                      <Icon as={feature.icon} boxSize={6} />
                    </Flex>
                    <Heading as="h3" size="md" color={featureHeadingColor} mb={3}>
                      {feature.title}
                    </Heading>
                    <Text color={featureTextColor} mb={4}>
                      {feature.description}
                    </Text>
                    {feature.title === "Health Tests" && (
                      <Button 
                        as={RouterLink} 
                        to="/tests" 
                        size="sm" 
                        colorScheme="brand" 
                        mt={2}
                      >
                        View Tests
                      </Button>
                    )}
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      {/* Recipe Feature Section */}
      <Box as="section" py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="1200px">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="space-between"
            gap={10}
          >
            <Box maxW={{ lg: "50%" }}>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                mb={5}
              >
                Discover Healthy <Text as="span" color="brand.500">Recipes</Text> for Your Well-being
              </Heading>
              
              <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} mb={8}>
                Explore our collection of nutritious recipes tailored to support your health journey. Save your favorites, plan your meals, and enjoy the benefits of healthy eating.
              </Text>
              
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/recipes"
                  size="lg"
                  colorScheme="brand"
                  leftIcon={<FaUtensils />}
                  fontWeight="bold"
                >
                  Browse Recipes
                </Button>
                
                <Button
                  as={RouterLink}
                  to="/saved-recipes"
                  size="lg"
                  variant="outline"
                  colorScheme="brand"
                  leftIcon={<FaHeart />}
                  fontWeight="bold"
                >
                  Saved Recipes
                </Button>
              </Stack>
            </Box>
            
            <Box
              maxW={{ lg: "50%" }}
              rounded="lg"
              shadow="xl"
              overflow="hidden"
              position="relative"
            >
              <Image
                src="/images/recipes/healthy-meals.jpg"
                alt="Healthy meals"
                w="full"
                h="full"
                objectFit="cover"
                fallbackSrc="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Disease Library Section */}
      <Box as="section" py={20} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="1200px">
          <Flex
            direction={{ base: "column", lg: "row-reverse" }}
            align="center"
            justify="space-between"
            gap={10}
          >
            <Box maxW={{ lg: "50%" }}>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                mb={5}
              >
                Comprehensive <Text as="span" color="brand.500">Disease Information</Text> at Your Fingertips
              </Heading>
              
              <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} mb={8}>
                Access our extensive library of medical information covering symptoms, causes, prevention, and treatments for a wide range of health conditions.
              </Text>
              
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/disease-library"
                  size="lg"
                  colorScheme="brand"
                  leftIcon={<FaVirus />}
                  fontWeight="bold"
                >
                  Explore Disease Library
                </Button>
                
                <Button
                  as={RouterLink}
                  to="/disease-library/category/infectious"
                  size="lg"
                  variant="outline"
                  colorScheme="brand"
                  leftIcon={<FaShieldAlt />}
                  fontWeight="bold"
                >
                  Infectious Diseases
                </Button>
              </Stack>
            </Box>
            
            <Box
              maxW={{ lg: "50%" }}
              rounded="lg"
              shadow="xl"
              overflow="hidden"
              position="relative"
            >
              <Image
                src="/images/diseases/medical-research.jpg"
                alt="Disease research"
                w="full"
                h="full"
                objectFit="cover"
                fallbackSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="1200px">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            textAlign="center"
            mb={12}
          >
            <Heading as="h2" size="xl" mb={4}>
              How It Works
            </Heading>
            <Text fontSize="lg" color={featureTextColor} maxW="700px" mx="auto">
              Start your health journey in three simple steps
            </Text>
          </MotionBox>

          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <Grid 
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} 
              gap={8}
              position="relative"
            >
              {/* Connecting Line (only visible on desktop) */}
              <Box 
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                width="80%"
                height="2px"
                bg={dividerColor}
                top="40px"
                left="10%"
                zIndex={0}
              />
              
              {steps.map((step, index) => (
                <MotionBox 
                  key={index} 
                  variants={fadeInUp}
                  position="relative"
                  zIndex={1}
                >
                  <VStack spacing={4} align="center">
                    <Flex 
                      w="80px" 
                      h="80px" 
                      bg={stepCircleBg} 
                      color={stepCircleColor} 
                      borderRadius="full" 
                      justify="center" 
                      align="center"
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {index + 1}
                    </Flex>
                    <Heading as="h3" size="md" textAlign="center">
                      {step.title}
                    </Heading>
                    <Text textAlign="center" color={featureTextColor}>
                      {step.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box py={16}>
        <Container maxW="1200px">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            textAlign="center"
            mb={12}
          >
            <Heading as="h2" size="xl" mb={4}>
              What Our Users Say
            </Heading>
            <Text fontSize="lg" color={featureTextColor} maxW="700px" mx="auto">
              Join thousands of happy users who have transformed their health journey
            </Text>
          </MotionBox>

          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {testimonials.map((testimonial, index) => (
                <MotionBox 
                  key={index} 
                  variants={fadeInUp}
                >
                  <Box 
                    bg={testimonialBg} 
                    p={8} 
                    borderRadius="lg" 
                    position="relative"
                    height="100%"
                  >
                    <Box 
                      bg={quoteBg} 
                      position="absolute" 
                      top="-20px" 
                      left="30px"
                      padding="10px"
                      borderRadius="full"
                      boxShadow="md"
                    >
                      <Icon as={testimonial.icon} color="brand.500" boxSize={6} />
                    </Box>
                    <Text fontSize="md" fontStyle="italic" mb={6} mt={4}>
                      "{testimonial.quote}"
                    </Text>
                    <Divider mb={4} />
                    <Flex align="center">
                      <Avatar 
                        src={testimonial.image} 
                        name={testimonial.name} 
                        size="md" 
                        mr={3} 
                      />
                      <Box>
                        <Text fontWeight="bold">{testimonial.name}</Text>
                        <Text fontSize="sm" color={featureTextColor}>{testimonial.title}</Text>
                      </Box>
                    </Flex>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg={heroBg} py={16}>
        <Container maxW="1200px">
          <MotionFlex
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            bg={cardBg}
            p={{ base: 8, md: 12 }}
            borderRadius="xl"
            boxShadow="xl"
          >
            <Box maxW={{ base: '100%', md: '60%' }} mb={{ base: 6, md: 0 }}>
              <Heading as="h2" size="xl" mb={4}>
                Ready to Take Control of Your Health?
              </Heading>
              <Text fontSize="lg" color={featureTextColor}>
                Join Panacureo today and get access to all our premium health features. Start your journey to better health now.
              </Text>
              <HStack spacing={4} mt={4}>
                <CheckIcon color="green.500" />
                <Text>Free health assessment</Text>
              </HStack>
              <HStack spacing={4} mt={2}>
                <CheckIcon color="green.500" />
                <Text>Personalized health plans</Text>
              </HStack>
              <HStack spacing={4} mt={2}>
                <CheckIcon color="green.500" />
                <Text>24/7 health monitoring</Text>
              </HStack>
            </Box>
            <VStack spacing={4} align="stretch" width={{ base: '100%', md: 'auto' }}>
              <Button 
                as={RouterLink}
                to="/signup"
                size="lg" 
                colorScheme="brand" 
                px={8}
                rightIcon={<FaArrowRight />}
              >
                Get Started Now
              </Button>
              <Button 
                as={RouterLink}
                to="/tests"
                size="lg" 
                variant="outline" 
                colorScheme="brand"
              >
                Explore Health Tests
              </Button>
            </VStack>
          </MotionFlex>
        </Container>
      </Box>
    </Box>
  );
};

// Feature data
const features = [
  {
    title: "Health Tests",
    description: "Take comprehensive health assessments to understand your wellness status and identify areas for improvement.",
    icon: FaFlask
  },
  {
    title: "Healthy Recipes",
    description: "Access thousands of nutritionist-approved recipes tailored to your dietary needs and health goals.",
    icon: FaUtensils
  },
  {
    title: "Disease Information",
    description: "Learn about various health conditions with our easy-to-understand guides and prevention tips.",
    icon: FaVirus
  },
  {
    title: "Health Dashboard",
    description: "Track your health metrics over time with intuitive visualizations and personalized insights.",
    icon: FaChartLine
  }
];

// Steps data
const steps = [
  {
    title: "Take the Assessment",
    description: "Complete our comprehensive health questionnaire to help us understand your current health status."
  },
  {
    title: "Get Personalized Plan",
    description: "Receive a customized health plan based on your assessment results and personal health goals."
  },
  {
    title: "Track Your Progress",
    description: "Monitor your improvements over time and adjust your plan as needed for optimal results."
  }
];

// Testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Fitness Enthusiast",
    quote: "Panacureo helped me understand my health metrics in a way I never could before. The personalized recommendations have been a game-changer for my fitness journey.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    icon: FaChartLine
  },
  {
    name: "Michael Chen",
    title: "Healthcare Professional",
    quote: "As a doctor, I recommend Panacureo to my patients. The platform provides valuable insights and makes it easy to monitor health progress between appointments.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    icon: FaVirus
  },
  {
    name: "Emily Rodriguez",
    title: "Working Mother",
    quote: "With my busy schedule, Panacureo has been invaluable. The recipe suggestions fit my family's dietary needs, and the health tracking keeps me accountable.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    icon: FaUtensils
  }
];

export default Home; 