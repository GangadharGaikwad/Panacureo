import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  VStack,
  HStack,
  Divider,
  Progress,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Image,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Radio,
  RadioGroup,
  Select
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getTestById } from '../../utils/api';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaHeartbeat, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const HeartRateVariability = () => {
  const [testData, setTestData] = useState(null);
  const [age, setAge] = useState(35);
  const [gender, setGender] = useState('male');
  const [restingHeartRate, setRestingHeartRate] = useState(70);
  const [hrvValue, setHrvValue] = useState(55);
  const [stressLevel, setStressLevel] = useState('moderate');
  const [hrvCategory, setHrvCategory] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [sleepQuality, setSleepQuality] = useState('good');
  const [physicalActivity, setPhysicalActivity] = useState('moderate');
  
  const navigate = useNavigate();
  const toast = useToast();
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('gray.700', 'white');
  
  // HRV reference ranges based on age and gender
  const hrvRanges = {
    male: {
      '18-25': { low: 0, belowAverage: 55, average: 65, aboveAverage: 75, excellent: 85, max: 150 },
      '26-35': { low: 0, belowAverage: 50, average: 60, aboveAverage: 70, excellent: 80, max: 150 },
      '36-45': { low: 0, belowAverage: 45, average: 55, aboveAverage: 65, excellent: 75, max: 150 },
      '46-55': { low: 0, belowAverage: 40, average: 50, aboveAverage: 60, excellent: 70, max: 150 },
      '56+': { low: 0, belowAverage: 35, average: 45, aboveAverage: 55, excellent: 65, max: 150 }
    },
    female: {
      '18-25': { low: 0, belowAverage: 60, average: 70, aboveAverage: 80, excellent: 90, max: 150 },
      '26-35': { low: 0, belowAverage: 55, average: 65, aboveAverage: 75, excellent: 85, max: 150 },
      '36-45': { low: 0, belowAverage: 50, average: 60, aboveAverage: 70, excellent: 80, max: 150 },
      '46-55': { low: 0, belowAverage: 45, average: 55, aboveAverage: 65, excellent: 75, max: 150 },
      '56+': { low: 0, belowAverage: 40, average: 50, aboveAverage: 60, excellent: 70, max: 150 }
    }
  };
  
  // Load test data
  useEffect(() => {
    const data = getTestById('heart-rate-variability');
    if (data) {
      setTestData(data);
    } else {
      toast({
        title: 'Error',
        description: 'Test data not found',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);
  
  // Calculate HRV category when HRV value changes
  useEffect(() => {
    if (hrvValue) {
      // Get the appropriate age group
      let ageGroup = '56+';
      if (age <= 25) ageGroup = '18-25';
      else if (age <= 35) ageGroup = '26-35';
      else if (age <= 45) ageGroup = '36-45';
      else if (age <= 55) ageGroup = '46-55';
      
      // Get reference range for age and gender
      const ranges = hrvRanges[gender][ageGroup];
      
      // Determine category
      let category = '';
      if (hrvValue < ranges.belowAverage) {
        category = 'Low';
      } else if (hrvValue < ranges.average) {
        category = 'Below Average';
      } else if (hrvValue < ranges.aboveAverage) {
        category = 'Average';
      } else if (hrvValue < ranges.excellent) {
        category = 'Above Average';
      } else {
        category = 'Excellent';
      }
      
      setHrvCategory(category);
    }
  }, [hrvValue, age, gender]);
  
  // Get HRV category color
  const getHrvCategoryColor = (category) => {
    switch (category) {
      case 'Low':
        return 'red';
      case 'Below Average':
        return 'orange';
      case 'Average':
        return 'yellow';
      case 'Above Average':
        return 'teal';
      case 'Excellent':
        return 'green';
      default:
        return 'gray';
    }
  };
  
  // Save results
  const handleSaveResults = () => {
    // Simulate saving results
    toast({
      title: 'Results Saved',
      description: 'Your Heart Rate Variability results have been saved to your profile.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Navigate to results page
    navigate('/test-results', { 
      state: { 
        testId: 'heart-rate-variability',
        hrvValue,
        hrvCategory,
        age,
        gender,
        restingHeartRate,
        stressLevel,
        sleepQuality,
        physicalActivity
      } 
    });
  };
  
  // Get age group
  const getAgeGroup = () => {
    if (age <= 25) return '18-25';
    else if (age <= 35) return '26-35';
    else if (age <= 45) return '36-45';
    else if (age <= 55) return '46-55';
    else return '56+';
  };
  
  // Get reference ranges for current age and gender
  const getCurrentRanges = () => {
    const ageGroup = getAgeGroup();
    return hrvRanges[gender][ageGroup];
  };
  
  // Generate recommendations based on HRV and other factors
  const getRecommendations = () => {
    const recommendations = [];
    
    // Basic HRV recommendations
    if (hrvCategory === 'Low' || hrvCategory === 'Below Average') {
      recommendations.push('Focus on stress management techniques like meditation or deep breathing.');
      recommendations.push('Ensure you\'re getting adequate sleep (7-9 hours per night).');
      recommendations.push('Consider reducing intense exercise temporarily to allow recovery.');
    } else if (hrvCategory === 'Average') {
      recommendations.push('Continue balanced lifestyle with regular exercise and adequate rest.');
      recommendations.push('Practice mindfulness for 10-15 minutes daily to manage stress.');
    } else {
      recommendations.push('Your HRV indicates good cardiovascular health and stress resilience.');
      recommendations.push('Maintain your current lifestyle while monitoring for any significant changes.');
    }
    
    // Sleep quality recommendations
    if (sleepQuality === 'poor') {
      recommendations.push('Improve sleep environment: keep room cool, dark and quiet.');
      recommendations.push('Establish a regular sleep schedule, even on weekends.');
    }
    
    // Stress level recommendations
    if (stressLevel === 'high') {
      recommendations.push('Consider incorporating stress-reduction activities like yoga or tai chi.');
      recommendations.push('Take regular breaks during work hours to reset mentally.');
    }
    
    return recommendations;
  };
  
  if (!testData) {
    return (
      <Container centerContent py={10}>
        <Text>Loading test data...</Text>
      </Container>
    );
  }
  
  return (
    <Container maxW="900px" py={8}>
      {/* Back Navigation */}
      <Button 
        leftIcon={<ArrowBackIcon />} 
        variant="ghost" 
        mb={6}
        onClick={() => navigate('/tests')}
      >
        Back to Health Tests
      </Button>
      
      {/* Header */}
      <Flex 
        direction="column" 
        align="center" 
        bg={bgColor} 
        p={8} 
        borderRadius="lg" 
        boxShadow="md" 
        mb={8}
      >
        <Heading as="h1" size="xl" mb={4} color={headingColor}>
          {testData.title}
        </Heading>
        <Text color={textColor} textAlign="center" mb={4}>
          {testData.longDescription}
        </Text>
        
        <HStack spacing={4} mt={2}>
          <Text fontWeight="bold" color={textColor}>
            Estimated Time: {testData.estimatedTime} min
          </Text>
          <Divider orientation="vertical" height="20px" />
          <Text fontWeight="bold" color={textColor}>
            Difficulty: {testData.difficulty}
          </Text>
        </HStack>
      </Flex>
      
      {/* Test Content */}
      <Grid templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }} gap={8}>
        {/* Input Section */}
        <GridItem>
          <Box 
            bg={bgColor} 
            p={6} 
            borderRadius="lg" 
            boxShadow="md"
            height="100%"
          >
            <Heading as="h2" size="md" mb={6} color={headingColor}>
              Enter Your Information
            </Heading>
            
            <VStack spacing={6} align="stretch">
              {/* Age input */}
              <FormControl>
                <FormLabel>Age</FormLabel>
                <NumberInput 
                  min={18} 
                  max={100}
                  value={age}
                  onChange={(value) => setAge(parseInt(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              {/* Gender selection */}
              <FormControl>
                <FormLabel>Biological Sex</FormLabel>
                <RadioGroup 
                  value={gender}
                  onChange={setGender}
                  colorScheme="brand"
                >
                  <HStack spacing={6}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </HStack>
                </RadioGroup>
                <FormHelperText>
                  Biological sex affects normal HRV ranges
                </FormHelperText>
              </FormControl>
              
              {/* HRV Input */}
              <FormControl>
                <FormLabel>
                  Heart Rate Variability (ms)
                </FormLabel>
                <NumberInput 
                  min={0} 
                  max={150}
                  value={hrvValue}
                  onChange={(value) => setHrvValue(parseFloat(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  Input your measured HRV value in milliseconds (ms)
                </FormHelperText>
              </FormControl>
              
              {/* Resting Heart Rate */}
              <FormControl>
                <FormLabel>
                  Resting Heart Rate (bpm)
                </FormLabel>
                <NumberInput 
                  min={40} 
                  max={120}
                  value={restingHeartRate}
                  onChange={(value) => setRestingHeartRate(parseFloat(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              {/* Stress Level */}
              <FormControl>
                <FormLabel>Current Stress Level</FormLabel>
                <Select
                  value={stressLevel}
                  onChange={(e) => setStressLevel(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>
              
              {/* Sleep Quality */}
              <FormControl>
                <FormLabel>Recent Sleep Quality</FormLabel>
                <Select
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(e.target.value)}
                >
                  <option value="poor">Poor</option>
                  <option value="fair">Fair</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                </Select>
              </FormControl>
              
              {/* Physical Activity */}
              <FormControl>
                <FormLabel>Physical Activity Level</FormLabel>
                <Select
                  value={physicalActivity}
                  onChange={(e) => setPhysicalActivity(e.target.value)}
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="vigorous">Vigorous</option>
                  <option value="athlete">Athlete</option>
                </Select>
              </FormControl>
            </VStack>
            
            <Button 
              colorScheme="brand" 
              size="lg" 
              width="full" 
              mt={8}
              onClick={handleSaveResults}
            >
              Save Results
            </Button>
          </Box>
        </GridItem>
        
        {/* Results Section */}
        <GridItem>
          <VStack spacing={8}>
            <Box 
              bg={bgColor} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              width="100%"
            >
              <Heading as="h2" size="md" mb={6} color={headingColor}>
                Your HRV Results
              </Heading>
              
              {hrvValue ? (
                <VStack spacing={8} align="stretch">
                  <Box textAlign="center">
                    <HStack justifyContent="center" alignItems="center" mb={2}>
                      <FaHeartbeat size={24} color="red" />
                      <Heading size="xl" color={getHrvCategoryColor(hrvCategory)}>
                        {hrvValue} ms
                      </Heading>
                    </HStack>
                    <Text 
                      fontWeight="bold" 
                      color={getHrvCategoryColor(hrvCategory)}
                      fontSize="lg"
                    >
                      {hrvCategory}
                    </Text>
                  </Box>
                  
                  <Box position="relative" pt={10} pb={6}>
                    <Slider
                      id="hrv-slider"
                      min={0}
                      max={150}
                      colorScheme="brand"
                      value={hrvValue}
                      onChange={(val) => setHrvValue(val)}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      {/* Slider marks for the reference ranges */}
                      {Object.entries(getCurrentRanges()).map(([key, value]) => (
                        key !== 'max' && key !== 'low' && (
                          <SliderMark
                            key={key}
                            value={value}
                            mt={4}
                            ml={-2.5}
                            fontSize="sm"
                          >
                            {value}
                          </SliderMark>
                        )
                      ))}
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        bg={getHrvCategoryColor(hrvCategory)}
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${hrvValue} ms - ${hrvCategory}`}
                      >
                        <SliderThumb boxSize={6} />
                      </Tooltip>
                    </Slider>
                  </Box>
                  
                  <Box>
                    <Text mb={2} fontWeight="semibold">
                      Reference Ranges for {gender === 'male' ? 'Males' : 'Females'}, Age: {getAgeGroup()}
                    </Text>
                    <Flex 
                      justify="space-between" 
                      py={2}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Text fontWeight="semibold">Category</Text>
                      <Text fontWeight="semibold">Range (ms)</Text>
                    </Flex>
                    <Flex 
                      justify="space-between" 
                      py={2}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Text fontWeight={hrvCategory === 'Low' ? "bold" : "normal"}>
                        Low
                      </Text>
                      <Text color={textColor}>
                        &lt; {getCurrentRanges().belowAverage}
                      </Text>
                    </Flex>
                    <Flex 
                      justify="space-between" 
                      py={2}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Text fontWeight={hrvCategory === 'Below Average' ? "bold" : "normal"}>
                        Below Average
                      </Text>
                      <Text color={textColor}>
                        {getCurrentRanges().belowAverage} - {getCurrentRanges().average}
                      </Text>
                    </Flex>
                    <Flex 
                      justify="space-between" 
                      py={2}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Text fontWeight={hrvCategory === 'Average' ? "bold" : "normal"}>
                        Average
                      </Text>
                      <Text color={textColor}>
                        {getCurrentRanges().average} - {getCurrentRanges().aboveAverage}
                      </Text>
                    </Flex>
                    <Flex 
                      justify="space-between" 
                      py={2}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Text fontWeight={hrvCategory === 'Above Average' ? "bold" : "normal"}>
                        Above Average
                      </Text>
                      <Text color={textColor}>
                        {getCurrentRanges().aboveAverage} - {getCurrentRanges().excellent}
                      </Text>
                    </Flex>
                    <Flex 
                      justify="space-between" 
                      py={2}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Text fontWeight={hrvCategory === 'Excellent' ? "bold" : "normal"}>
                        Excellent
                      </Text>
                      <Text color={textColor}>
                        &gt; {getCurrentRanges().excellent}
                      </Text>
                    </Flex>
                  </Box>
                </VStack>
              ) : (
                <Text>Enter your heart rate variability value to see results</Text>
              )}
            </Box>
            
            {/* Recommendations Section */}
            {hrvValue > 0 && (
              <Box 
                bg={bgColor} 
                p={6} 
                borderRadius="lg" 
                boxShadow="md"
                width="100%"
              >
                <Heading as="h2" size="md" mb={6} color={headingColor}>
                  Personalized Recommendations
                </Heading>
                
                <VStack spacing={4} align="stretch">
                  {getRecommendations().map((recommendation, index) => (
                    <HStack key={index} spacing={3} align="flex-start">
                      <Box mt={1}>
                        <FaInfoCircle color="teal" />
                      </Box>
                      <Text color={textColor}>{recommendation}</Text>
                    </HStack>
                  ))}
                  
                  {(hrvCategory === 'Low' || stressLevel === 'high') && (
                    <Alert status="warning" mt={4} borderRadius="md">
                      <AlertIcon />
                      <Box>
                        <Text fontWeight="bold">Important:</Text>
                        <Text fontSize="sm">
                          Low HRV combined with high stress levels may indicate autonomic nervous system imbalance. 
                          Consider consulting with a healthcare professional if this persists.
                        </Text>
                      </Box>
                    </Alert>
                  )}
                </VStack>
              </Box>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default HeartRateVariability; 