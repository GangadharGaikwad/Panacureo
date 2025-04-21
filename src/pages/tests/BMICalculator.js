import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
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
  Radio,
  RadioGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getTestById, bmiRanges } from '../../data/healthTests';
import { ArrowBackIcon } from '@chakra-ui/icons';

const BMICalculator = () => {
  const [testData, setTestData] = useState(null);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const navigate = useNavigate();
  const toast = useToast();
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('gray.700', 'white');
  
  // Load test data
  useEffect(() => {
    const data = getTestById('bmi-calculator');
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
  
  // Calculate BMI when height or weight changes
  useEffect(() => {
    if (height && weight) {
      let bmiValue;
      
      if (measurementUnit === 'metric') {
        // BMI formula: weight(kg) / height(m)²
        bmiValue = weight / Math.pow(height / 100, 2);
      } else {
        // BMI formula for imperial: (weight(lb) * 703) / height(in)²
        bmiValue = (weight * 703) / Math.pow(height, 2);
      }
      
      setBmi(bmiValue);
      
      // Set category
      const category = getBMICategory(bmiValue);
      setBmiCategory(category);
      
      // Set slider value
      setSliderValue(bmiValue);
    }
  }, [height, weight, measurementUnit]);
  
  // Get BMI category
  const getBMICategory = (bmiValue) => {
    for (const range of bmiRanges) {
      if (bmiValue >= range.min && bmiValue <= range.max) {
        return range.category;
      }
    }
    return 'Unknown';
  };
  
  // Get BMI category color
  const getBMICategoryColor = (category) => {
    switch (category) {
      case 'Underweight':
        return 'blue';
      case 'Normal':
        return 'green';
      case 'Overweight':
        return 'yellow';
      case 'Obese':
        return 'orange';
      case 'Severely Obese':
        return 'red';
      default:
        return 'gray';
    }
  };
  
  // Save results
  const handleSaveResults = () => {
    // Simulate saving results
    toast({
      title: 'Results Saved',
      description: 'Your BMI results have been saved to your profile.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Navigate to results page
    navigate('/test-results', { 
      state: { 
        testId: 'bmi-calculator',
        bmi,
        bmiCategory,
        height,
        weight,
        measurementUnit
      } 
    });
  };
  
  // Handle unit change
  const handleUnitChange = (value) => {
    if (value === measurementUnit) return;
    
    setMeasurementUnit(value);
    
    // Convert values when switching units
    if (value === 'imperial') {
      // cm to inches
      setHeight(Math.round(height / 2.54));
      // kg to pounds
      setWeight(Math.round(weight * 2.205));
    } else {
      // inches to cm
      setHeight(Math.round(height * 2.54));
      // pounds to kg
      setWeight(Math.round(weight / 2.205));
    }
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
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        {/* Input Section */}
        <Box 
          flex="1" 
          bg={bgColor} 
          p={6} 
          borderRadius="lg" 
          boxShadow="md"
        >
          <Heading as="h2" size="md" mb={6} color={headingColor}>
            Enter Your Information
          </Heading>
          
          <VStack spacing={6} align="stretch">
            {/* Unit selection */}
            <FormControl as="fieldset">
              <FormLabel as="legend">Measurement System</FormLabel>
              <RadioGroup 
                onChange={handleUnitChange} 
                value={measurementUnit}
                colorScheme="brand"
              >
                <HStack spacing={6}>
                  <Radio value="metric">Metric (cm, kg)</Radio>
                  <Radio value="imperial">Imperial (in, lb)</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            
            {/* Height input */}
            <FormControl>
              <FormLabel>
                Height {measurementUnit === 'metric' ? '(cm)' : '(inches)'}
              </FormLabel>
              <NumberInput 
                min={measurementUnit === 'metric' ? 50 : 20} 
                max={measurementUnit === 'metric' ? 250 : 96}
                value={height}
                onChange={(value) => setHeight(parseFloat(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            
            {/* Weight input */}
            <FormControl>
              <FormLabel>
                Weight {measurementUnit === 'metric' ? '(kg)' : '(lb)'}
              </FormLabel>
              <NumberInput 
                min={measurementUnit === 'metric' ? 20 : 44} 
                max={measurementUnit === 'metric' ? 250 : 550}
                value={weight}
                onChange={(value) => setWeight(parseFloat(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
        
        {/* Results Section */}
        <Box 
          flex="1" 
          bg={bgColor} 
          p={6} 
          borderRadius="lg" 
          boxShadow="md"
        >
          <Heading as="h2" size="md" mb={6} color={headingColor}>
            Your BMI Results
          </Heading>
          
          {bmi ? (
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading size="xl" color={getBMICategoryColor(bmiCategory)}>
                  {bmi.toFixed(1)}
                </Heading>
                <Text 
                  fontWeight="bold" 
                  color={getBMICategoryColor(bmiCategory)}
                  fontSize="lg"
                >
                  {bmiCategory}
                </Text>
              </Box>
              
              <Box position="relative" pt={10} pb={6}>
                <Slider
                  id="bmi-slider"
                  min={10}
                  max={40}
                  colorScheme="brand"
                  value={sliderValue}
                  onChange={(val) => setSliderValue(val)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  isReadOnly
                >
                  {bmiRanges.map((range) => (
                    <SliderMark
                      key={range.min}
                      value={range.min}
                      mt={4}
                      ml={-2.5}
                      fontSize="sm"
                    >
                      {range.min}
                    </SliderMark>
                  ))}
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg={getBMICategoryColor(bmiCategory)}
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${bmi.toFixed(1)} - ${bmiCategory}`}
                  >
                    <SliderThumb boxSize={6} />
                  </Tooltip>
                </Slider>
              </Box>
              
              <Box>
                {bmiRanges.map((range) => (
                  <Flex 
                    key={range.category} 
                    justify="space-between" 
                    py={2}
                    borderBottom="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontWeight={bmiCategory === range.category ? "bold" : "normal"}>
                      {range.category}
                    </Text>
                    <Text color={textColor}>
                      {range.min} - {range.max}
                    </Text>
                  </Flex>
                ))}
              </Box>
              
              <Alert 
                status={bmiCategory === 'Normal' ? 'success' : 'info'}
                borderRadius="md"
              >
                <AlertIcon />
                {bmiCategory === 'Normal' 
                  ? 'Your BMI is within the healthy range. Keep up the good work!' 
                  : `Your BMI indicates you are ${bmiCategory.toLowerCase()}. Consider consulting with a healthcare professional for personalized advice.`
                }
              </Alert>
            </VStack>
          ) : (
            <Text>Enter your height and weight to calculate BMI</Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default BMICalculator; 