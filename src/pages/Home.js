import React, { useState, useEffect } from 'react';
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
  HStack,
  Switch,
  FormControl,
  FormLabel,
  Tooltip,
  keyframes
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFlask, FaUtensils, FaVirus, FaChartLine, FaArrowRight, FaHeart, FaShieldAlt, FaMousePointer, FaDna, FaHeartbeat, FaRunning, FaLeaf, FaBrain, FaClipboardCheck, FaUsers, FaBullseye } from 'react-icons/fa';
import { CheckIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import SmoothCursor from '../components/SmoothCursor';
import Carousel from '../components/Carousel';
import Magnet from '../components/Magnet';

// Motion components for animations
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionImage = motion(Image);

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
  
  // New color values for gradient
  const heroBgGradient = useColorModeValue('rgba(49, 151, 149, 0.1)', 'rgba(49, 151, 149, 0.2)');
  
  // Add these new color values
  const heroImageBorderColor = useColorModeValue('white', 'gray.700');
  const healthTagBg = useColorModeValue('brand.50', 'brand.900');
  const healthTagColor = useColorModeValue('brand.700', 'brand.200');
  const trustLogoFilter = useColorModeValue('grayscale(1)', 'grayscale(1) brightness(1.5)');
  const trustLogoHoverFilter = useColorModeValue('grayscale(0)', 'brightness(1.5)');
  const trustLogoOpacity = useColorModeValue(0.7, 0.5);
  const fallbackBgColor = useColorModeValue('EEEEEE', '333333');
  const fallbackTextColor = useColorModeValue('666666', 'AAAAAA');
  
  // Add these color values for the CTA section
  const ctaGlowBgColor = useColorModeValue('0.1', '0.2');
  const ctaInfoTextColor = useColorModeValue('gray.600', 'gray.400');
  const ctaBoxBg = useColorModeValue('orange.50', 'orange.900');
  const ctaBoxTextColor = useColorModeValue('orange.700', 'orange.200');
  const ctaCardBg = useColorModeValue('white', 'gray.700');
  
  // State for cursor visibility control
  const [isCursorVisible, setIsCursorVisible] = useState(window.matchMedia('(pointer: fine)').matches);

  // Effect to detect touch devices and disable cursor on them
  useEffect(() => {
    const touchDevice = !window.matchMedia('(pointer: fine)').matches;
    if (touchDevice) {
      setIsCursorVisible(false);
    }
  }, []);

  // Hero section images for Carousel
  const heroCarouselImages = [
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Digital health monitoring"
    },
    {
      src: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Medical technology"
    },
    {
      src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Health and wellness tracking"
    },
    {
      src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Modern healthcare"
    }
  ];
  
  // Fallback image in case the remote ones fail
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' %3E%3Crect width='100%25' height='100%25' fill='%23319795'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='white'%3EHealth Monitoring%3C/text%3E%3C/svg%3E";
  
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
  
  // Function to handle image loading errors
  const handleImageError = (index) => {
    // Create a copy of the heroImages array
    const updatedImages = [...heroCarouselImages];
    // Replace the failed image URL with the fallback
    if (updatedImages[index]) {
      updatedImages[index].src = fallbackImage;
    }
    return fallbackImage;
  };

  // Add these keyframes for animations
  const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  `;
  
  const pulse = keyframes`
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(1); opacity: 0.7; }
  `;
  
  const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;

  const floatAnimation = `${float} 6s ease-in-out infinite`;
  const pulseAnimation = `${pulse} 4s ease-in-out infinite`;
  const rotateAnimation = `${rotate} 15s linear infinite`;

  return (
    <Box>
      {/* Smooth Cursor */}
      {isCursorVisible && <SmoothCursor />}
      
      {/* Cursor Control (Small control in top-right corner) */}
      <Box 
        position="fixed" 
        top="80px" 
        right="20px" 
        zIndex="900"
        bg={cardBg}
        p={2}
        borderRadius="md"
        boxShadow="md"
        display={{ base: "none", md: "block" }} // Only show on non-mobile
      >
        <Tooltip label="Toggle smooth cursor effect">
          <FormControl display="flex" alignItems="center" size="sm">
            <FormLabel htmlFor="cursor-toggle" mb="0" fontSize="sm" mr={2} cursor="pointer">
              <Icon as={FaMousePointer} />
            </FormLabel>
            <Switch 
              id="cursor-toggle" 
              isChecked={isCursorVisible} 
              onChange={() => setIsCursorVisible(!isCursorVisible)} 
              colorScheme="brand"
              size="sm"
              aria-label="Toggle cursor effect"
            />
          </FormControl>
        </Tooltip>
      </Box>

      {/* Hero Section */}
      <Box 
        bg={heroBg} 
        py={{ base: 16, md: 24 }} 
        mt={{ base: '80px', md: '105px' }}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: `radial-gradient(circle at 30% 20%, ${heroBgGradient}, transparent 40%)`,
          zIndex: '0'
        }}
      >
        {/* Decorative shapes */}
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="60px"
          height="60px"
          borderRadius="full"
          bg="accent.300"
          opacity="0.2"
          zIndex="0"
          animation={floatAnimation}
          display={{ base: "none", md: "block" }}
        />
        <Box
          position="absolute"
          bottom="15%"
          right="15%"
          width="120px"
          height="120px"
          borderRadius="full"
          bg="brand.500"
          opacity="0.15"
          zIndex="0"
          animation={pulseAnimation}
          display={{ base: "none", md: "block" }}
        />
        <Box
          position="absolute"
          top="60%"
          left="20%"
          width="40px"
          height="40px"
          borderRadius="lg"
          transform="rotate(45deg)"
          bg="purple.500"
          opacity="0.25"
          zIndex="0"
          animation={floatAnimation}
          sx={{ animationDelay: "2s" }}
          display={{ base: "none", md: "block" }}
        />
        
        {/* Health icons */}
        {[
          { icon: FaHeartbeat, top: "30%", left: "5%", color: "red.400", delay: "0s" },
          { icon: FaDna, top: "70%", left: "8%", color: "green.400", delay: "1s" },
          { icon: FaLeaf, top: "20%", right: "8%", color: "teal.400", delay: "2s" },
          { icon: FaBrain, top: "65%", right: "10%", color: "purple.400", delay: "1.5s" },
          { icon: FaRunning, bottom: "15%", left: "30%", color: "blue.400", delay: "0.5s" }
        ].map((item, index) => (
          <Box
            key={index}
            position="absolute"
            top={item.top}
            left={item.left}
            right={item.right}
            bottom={item.bottom}
            zIndex="1"
            opacity="0.25"
            animation={floatAnimation}
            sx={{ animationDelay: item.delay }}
            display={{ base: "none", md: "block" }}
          >
            <Icon as={item.icon} fontSize="30px" color={item.color} />
          </Box>
        ))}

        <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex="1">
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between" 
            gap={{ base: 10, md: 12 }}
          >
            {/* Hero Content */}
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              maxW={{ base: '100%', md: '50%' }}
              position="relative"
              zIndex="2"
            >
              {/* Animated underline for heading */}
              <Box 
                position="absolute" 
                left="-10px" 
                top="-10px" 
                width="100px" 
                height="100px" 
                borderRadius="full"
                bg="brand.100"
                opacity="0.3"
                zIndex="0"
                display={{ base: "none", md: "block" }}
                animation={pulseAnimation}
                sx={{ animationDelay: "1s" }}
              />
              
              <MotionHeading 
                as="h1" 
                size={{ base: "xl", md: "2xl", lg: "3xl" }}
                color={heroHeadingColor}
                lineHeight="1.1"
                mb={5}
                variants={fadeInUp}
                position="relative"
              >
                Your Health Journey Starts Here
              </MotionHeading>
              <MotionText 
                fontSize={{ base: "md", md: "xl" }} 
                color={heroTextColor} 
                mb={8}
                variants={fadeInUp}
                maxW={{ base: "100%", md: "90%" }}
              >
                Panacureo gives you the tools to understand, track and improve your health with personalized insights and recommendations.
              </MotionText>
              <MotionBox variants={fadeInUp}>
                <HStack spacing={4} wrap="wrap">
                  <Button 
                    size={{ base: "md", md: "lg" }} 
                    colorScheme="brand" 
                    px={{ base: 6, md: 8 }}
                    rightIcon={<FaArrowRight />}
                    as={RouterLink}
                    to="/health-tests"
                    mb={{ base: 4, md: 0 }}
                    shadow="md"
                    position="relative"
                    overflow="hidden"
                    _hover={{
                      transform: 'translateY(-2px)',
                      shadow: 'lg'
                    }}
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '0',
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'all 0.4s'
                    }}
                  >
                    Take a Health Test
                  </Button>
                  <Button 
                    size={{ base: "md", md: "lg" }} 
                    variant="outline" 
                    colorScheme="brand" 
                    px={{ base: 6, md: 8 }}
                    mb={{ base: 4, md: 0 }}
                    _hover={{
                      bg: 'rgba(49, 151, 149, 0.1)'
                    }}
                    onClick={() => {
                      const howItWorksSection = document.getElementById('how-it-works-section');
                      if (howItWorksSection) {
                        howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </HStack>
              </MotionBox>
            </MotionBox>

            {/* Hero Image Carousel */}
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              maxW={{ base: '100%', md: '50%' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              boxShadow="2xl"
              borderRadius="xl"
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                background: `
                  radial-gradient(circle at top left, rgba(49, 151, 149, 0.2), transparent 30%), 
                  radial-gradient(circle at bottom right, rgba(159, 122, 234, 0.2), transparent 30%)
                `,
                zIndex: '0',
                animation: rotateAnimation,
                transformOrigin: 'center center'
              }}
              css={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, transparent 85%, rgba(0,0,0,0.2) 100%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }
              }}
            >
              <Box p={0} width="100%" height={{ base: "250px", sm: "300px", md: "450px" }} position="relative" zIndex="1">
                <Carousel 
                  items={heroCarouselImages}
                  baseWidth={{ base: 320, sm: 400, md: 500 }}
                  autoplay={true}
                  autoplayDelay={4000}
                  pauseOnHover={true}
                  loop={true}
                />
              </Box>
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      {/* Health Statistics Section - NEW */}
      <Box py={{ base: 10, md: 14 }} bg={useColorModeValue('white', 'gray.800')} position="relative" overflow="hidden">
        {/* Background decorative elements */}
        <Box
          position="absolute"
          top="50%"
          left="-150px"
          width="300px"
          height="300px"
          borderRadius="full"
          background="linear-gradient(135deg, rgba(49, 151, 149, 0.1), rgba(49, 151, 149, 0))"
          zIndex="0"
        />
        <Box
          position="absolute"
          bottom="-100px"
          right="-100px"
          width="250px"
          height="250px"
          borderRadius="full"
          background="linear-gradient(135deg, rgba(159, 122, 234, 0.1), rgba(159, 122, 234, 0))"
          zIndex="0"
        />
        
        <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex="1">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            textAlign="center"
            mb={8}
          >
            <Text
              color="brand.500"
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="wider"
              mb={2}
              textTransform="uppercase"
            >
              Real Impact
            </Text>
            <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={3}>
              Your Health in Numbers
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color={featureTextColor} maxW="800px" mx="auto">
              Panacureo helps thousands of users improve their health metrics every day
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, md: 8 }}>
            {healthStats.map((stat, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Flex 
                  direction="column" 
                  align="center" 
                  bg={cardBg} 
                  p={6} 
                  borderRadius="lg" 
                  boxShadow="md"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                    transition: "all 0.3s ease"
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    bg: `${stat.color}.500`,
                    borderTopLeftRadius: 'lg',
                    borderTopRightRadius: 'lg',
                  }}
                >
                  {/* Icon in background */}
                  <Box 
                    position="absolute" 
                    right="10px" 
                    bottom="-10px" 
                    opacity="0.1"
                    fontSize="80px"
                    color={`${stat.color}.500`}
                  >
                    <Icon as={stat.icon || FaChartLine} />
                  </Box>
                  
                  <Box 
                    fontSize={{ base: "2xl", md: "4xl" }} 
                    fontWeight="bold" 
                    color={`${stat.color}.500`} 
                    mb={2}
                    position="relative"
                    display="inline-block"
                  >
                    <MotionText
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.8,
                        delay: index * 0.2 + 0.3
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </MotionText>
                  </Box>
                  <Text 
                    textAlign="center" 
                    fontWeight="medium"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {stat.label}
                  </Text>
                </Flex>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Trust Indicators Section - NEW */}
      <Box py={{ base: 8, md: 12 }} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            textAlign="center"
            mb={8}
          >
            <Heading as="h2" size={{ base: "md", md: "lg" }} mb={2}>
              Trusted by Healthcare Professionals
            </Heading>
          </MotionBox>

          <Flex 
            direction={{ base: 'column', md: 'row' }}
            justify="center"
            align="center"
            wrap="wrap"
            gap={{ base: 6, md: 10, lg: 16 }}
          >
            {trustLogos.map((logo, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                height={{ base: "40px", md: "50px" }}
                filter={trustLogoFilter}
                opacity={trustLogoOpacity}
                _hover={{ 
                  filter: trustLogoHoverFilter,
                  opacity: 1
                }}
                transitionProperty="all"
                transitionDuration="0.3s"
                transitionTimingFunction="ease"
              >
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  maxH="100%" 
                  fallbackSrc={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='50' viewBox='0 0 200 50'%3E%3Crect width='100%25' height='100%25' fill='%23${fallbackBgColor}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12px' fill='%23${fallbackTextColor}'%3E${logo.alt}%3C/text%3E%3C/svg%3E`}
                />
              </MotionBox>
            ))}
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 14, md: 20 }} bg={sectionBg} position="relative" overflow="hidden">
        {/* Decorative elements */}
        <Box
          position="absolute"
          top="-10%"
          left="-5%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="brand.500"
          opacity="0.05"
          zIndex="0"
        />
        <Box
          position="absolute"
          bottom="-10%"
          right="-5%"
          width="250px"
          height="250px"
          borderRadius="full"
          bg="accent.500"
          opacity="0.05"
          zIndex="0"
        />
        
        <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex="1">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            textAlign="center"
            mb={{ base: 10, md: 14 }}
          >
            <Text
              color="brand.500"
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="wider"
              mb={2}
              textTransform="uppercase"
            >
              Comprehensive Platform
            </Text>
            <Heading as="h2" size={{ base: "xl", md: "2xl" }} mb={4} maxW="800px" mx="auto" lineHeight="1.2">
              Everything You Need for Your Health Journey
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color={featureTextColor} maxW="700px" mx="auto">
              One platform with all the tools to monitor, understand, and improve your health.
            </Text>
          </MotionBox>

          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 8, md: 10 }}>
              {features.map((feature, index) => (
                <MotionBox 
                  key={index} 
                  variants={fadeInUp}
                >
                  <Box 
                    bg={cardBg} 
                    p={{ base: 6, md: 8 }}
                    borderRadius="lg" 
                    boxShadow="md"
                    height="100%"
                    transition="all 0.3s"
                    _hover={{ 
                      transform: 'translateY(-5px)', 
                      boxShadow: 'lg',
                      borderColor: 'brand.500'
                    }}
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Decorative top border */}
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      height="4px"
                      bg={`${feature.color || 'brand'}.500`}
                    />
                    
                    <Flex 
                      w={{ base: "60px", md: "70px" }}
                      h={{ base: "60px", md: "70px" }}
                      bg={`${feature.color || 'brand'}.500`}
                      color="white" 
                      borderRadius="full" 
                      justify="center" 
                      align="center"
                      mb={5}
                      boxShadow="md"
                    >
                      <Icon as={feature.icon} boxSize={{ base: 6, md: 7 }} />
                    </Flex>
                    <Heading as="h3" size={{ base: "md", md: "lg" }} color={`${feature.color || 'brand'}.500`} mb={3}>
                      {feature.title}
                    </Heading>
                    <Text color={featureTextColor} fontSize={{ base: "sm", md: "md" }} mb={5}>
                      {feature.description}
                    </Text>
                    {feature.action && (
                      <Button 
                        as={RouterLink} 
                        to={feature.action.link} 
                        size="sm" 
                        colorScheme={feature.color || "brand"}
                        variant="link"
                        rightIcon={<FaArrowRight fontSize="0.8em" />}
                      >
                        {feature.action.text}
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
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Healthy meals"
                w="full"
                h={{base: "300px", md: "400px"}}
                objectFit="cover"
                fallbackSrc={fallbackImage}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
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
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Disease research"
                w="full"
                h={{base: "300px", md: "400px"}}
                objectFit="cover"
                fallbackSrc={fallbackImage}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box bg={sectionBg} py={16} id="how-it-works-section">
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
      <Box bg={heroBg} py={{ base: 16, md: 20 }}>
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
            boxShadow="2xl"
            overflow="hidden"
            position="relative"
            isolation="isolate"
            _after={{
              content: '""',
              position: 'absolute',
              zIndex: '-1',
              top: '-50%',
              right: '-20%',
              width: '400px',
              height: '400px',
              borderRadius: 'full',
              bg: 'brand.500',
              opacity: ctaGlowBgColor,
              filter: 'blur(60px)',
            }}
          >
            <Box maxW={{ base: '100%', md: '60%' }} mb={{ base: 8, md: 0 }}>
              <Heading as="h2" size={{ base: 'xl', md: '2xl' }} mb={4} lineHeight="1.2">
                Ready to Take Control of <Text as="span" color="brand.500">Your Health?</Text>
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={featureTextColor} mb={6}>
                Join Panacureo today and get access to all our premium health features. Start your journey to better health now.
              </Text>
              
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mb={8}>
                {ctaFeatures.map((feature, idx) => (
                  <HStack key={idx} spacing={3} align="flex-start">
                    <Flex
                      minW="30px" 
                      h="30px" 
                      bg="green.100" 
                      color="green.700" 
                      borderRadius="full" 
                      justify="center" 
                      align="center"
                      mt={1}
                    >
                      <CheckIcon boxSize={3} />
                    </Flex>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="medium">{feature.title}</Text>
                      <Text fontSize="sm" color={ctaInfoTextColor}>
                        {feature.description}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </SimpleGrid>
              
              <Box 
                bg={ctaBoxBg} 
                p={4} 
                borderRadius="md"
                borderLeft="4px solid" 
                borderColor="orange.400"
                mb={6}
                maxW={{ base: "100%", lg: "80%" }}
              >
                <HStack>
                  <Icon as={FaShieldAlt} color="orange.400" />
                  <Text fontWeight="medium" color={ctaBoxTextColor}>
                    Your data is always private, secure, and encrypted
                  </Text>
                </HStack>
              </Box>
            </Box>
            
            <VStack 
              spacing={5} 
              align="stretch" 
              width={{ base: '100%', md: 'auto' }}
              bg={ctaCardBg}
              p={{ base: 6, md: 8 }}
              borderRadius="lg"
              boxShadow="md"
            >
              <Heading size="md" textAlign="center">Get Started Today</Heading>
              
              <Magnet 
                padding={150}
                magnetStrength={1.8}
                disabled={!isCursorVisible || !window.matchMedia('(pointer: fine)').matches}
                innerClassName="magnetic-button"
              >
                <Button 
                  as={RouterLink}
                  to="/signup"
                  size="lg" 
                  colorScheme="brand" 
                  width="100%"
                  rightIcon={<FaArrowRight />}
                  position="relative"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                  }}
                  transition="all 0.2s"
                  boxShadow="md"
                >
                  Get Started Now
                </Button>
              </Magnet>
              
              <Button 
                as={RouterLink}
                to="/health-tests"
                size="lg" 
                variant="outline" 
                colorScheme="brand"
                width="100%"
              >
                Explore Health Tests
              </Button>
              
              <Text fontSize="sm" textAlign="center" color={ctaInfoTextColor}>
                No credit card required. Free basic account.
              </Text>
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
    icon: FaFlask,
    color: "teal",
    action: {
      text: "View Tests",
      link: "/health-tests"
    }
  },
  {
    title: "Healthy Recipes",
    description: "Access thousands of nutritionist-approved recipes tailored to your dietary needs and health goals.",
    icon: FaUtensils,
    color: "green",
    action: {
      text: "Browse Recipes",
      link: "/recipes"
    }
  },
  {
    title: "Disease Information",
    description: "Learn about various health conditions with our easy-to-understand guides and prevention tips.",
    icon: FaVirus,
    color: "purple",
    action: {
      text: "Explore Library",
      link: "/disease-library"
    }
  },
  {
    title: "Health Dashboard",
    description: "Track your health metrics over time with intuitive visualizations and personalized insights.",
    icon: FaChartLine,
    color: "blue",
    action: {
      text: "View Dashboard",
      link: "/dashboard"
    }
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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    icon: FaChartLine
  },
  {
    name: "Michael Chen",
    title: "Healthcare Professional",
    quote: "As a doctor, I recommend Panacureo to my patients. The platform provides valuable insights and makes it easy to monitor health progress between appointments.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    icon: FaVirus
  },
  {
    name: "Emily Rodriguez",
    title: "Working Mother",
    quote: "With my busy schedule, Panacureo has been invaluable. The recipe suggestions fit my family's dietary needs, and the health tracking keeps me accountable.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    icon: FaUtensils
  }
];

// Health Statistics data
const healthStats = [
  {
    label: "Health Tests Completed",
    value: "50K+",
    color: "green",
    icon: FaClipboardCheck
  },
  {
    label: "Active Users",
    value: "12K+",
    color: "blue",
    icon: FaUsers
  },
  {
    label: "Healthy Recipes",
    value: "3.5K+",
    color: "purple",
    icon: FaUtensils
  },
  {
    label: "Health Plans Created",
    value: "32K+",
    color: "orange",
    icon: FaBullseye
  }
];

// Trust logos data
const trustLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Mayo_Clinic_logo.svg",
    alt: "Mayo Clinic"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/cleveland-clinic-1.svg",
    alt: "Cleveland Clinic"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/LMU_Klinikum_Logo.svg",
    alt: "University Hospital"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9e/American_Heart_Association_Logo.svg",
    alt: "Heart Association"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/90/The_Washington_Hospital_logo.svg",
    alt: "Washington Hospital"
  }
];

// CTA features data
const ctaFeatures = [
  {
    title: "Personalized Health Plan",
    description: "Tailored to your health profile and goals"
  },
  {
    title: "Progress Tracking",
    description: "Monitor improvements with easy visualizations"
  },
  {
    title: "Expert Guidance",
    description: "Evidence-based health recommendations"
  },
  {
    title: "Community Support",
    description: "Connect with others on similar journeys"
  }
];

export default Home; 