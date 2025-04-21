import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Progress,
  Badge,
  SimpleGrid,
  useColorModeValue,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import userProfile from '../data/userProfile';
import { updateHealthGoals } from '../utils/api';

const HealthGoals = () => {
  const [goals, setGoals] = useState(userProfile.healthGoals);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isDeleteAlertOpen, 
    onOpen: onDeleteAlertOpen, 
    onClose: onDeleteAlertClose 
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteGoalId, setDeleteGoalId] = useState(null);
  const cancelRef = React.useRef();
  const toast = useToast();
  const [newGoal, setNewGoal] = useState({
    id: '',
    name: '',
    category: 'fitness',
    target: '',
    currentValue: '',
    unit: '',
    progress: 0,
    startDate: '',
    targetDate: '',
    status: 'in-progress'
  });
  const [isEditing, setIsEditing] = useState(false);

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headerBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  // Load goals from localStorage if available
  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      const parsed = JSON.parse(storedUserProfile);
      if (parsed.healthGoals && Array.isArray(parsed.healthGoals)) {
        setGoals(parsed.healthGoals);
      }
    } else {
      // Initialize localStorage with the default profile if not found
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, []);

  // Helper function to get badge color based on progress
  const getProgressColor = (progress) => {
    if (progress < 25) return 'red';
    if (progress < 50) return 'orange';
    if (progress < 75) return 'blue';
    return 'green';
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Helper function to calculate days remaining
  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const timeDiff = target - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'at-risk': return 'orange';
      case 'missed': return 'red';
      default: return 'gray';
    }
  };

  const handleAddGoal = () => {
    // Reset form and open modal
    setNewGoal({
      id: Date.now().toString(),
      name: '',
      category: 'fitness',
      target: '',
      currentValue: '',
      unit: '',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: '',
      status: 'in-progress'
    });
    setIsEditing(false);
    onOpen();
  };

  const handleEditGoal = (goal) => {
    setNewGoal({...goal});
    setIsEditing(true);
    onOpen();
  };

  const handleDeleteClick = (goalId) => {
    setDeleteGoalId(goalId);
    onDeleteAlertOpen();
  };

  const handleDeleteGoal = async () => {
    try {
      setIsLoading(true);
      
      // Filter out the goal to delete
      const updatedGoals = goals.filter(goal => goal.id !== deleteGoalId);
      
      // Update local state
      setGoals(updatedGoals);
      
      // Persist to backend/localStorage
      const result = await updateHealthGoals(updatedGoals);
      
      if (result.success) {
        toast({
          title: 'Goal deleted',
          description: 'Your health goal has been deleted successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete your health goal. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error deleting goal:', error);
    } finally {
      setIsLoading(false);
      onDeleteAlertClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({...newGoal, [name]: value});
  };

  const handleNumberInputChange = (name, value) => {
    setNewGoal({...newGoal, [name]: value});
  };

  const handleSaveGoal = async () => {
    try {
      setIsLoading(true);
      let updatedGoals;
      
      if (isEditing) {
        // Update existing goal
        updatedGoals = goals.map(goal => goal.id === newGoal.id ? newGoal : goal);
      } else {
        // Add new goal
        updatedGoals = [...goals, newGoal];
      }
      
      // Update goals in state
      setGoals(updatedGoals);
      
      // Persist to backend/localStorage
      const result = await updateHealthGoals(updatedGoals);
      
      if (result.success) {
        toast({
          title: isEditing ? 'Goal updated' : 'Goal added',
          description: `Your health goal has been ${isEditing ? 'updated' : 'added'} successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save your health goal. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error saving goal:', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Box
      p={5}
      bg={cardBg}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Health Goals</Heading>
        <Button 
          leftIcon={<AddIcon />} 
          colorScheme="brand" 
          size="sm"
          onClick={handleAddGoal}
        >
          Add Goal
        </Button>
      </Flex>

      {goals.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text color={textColor}>No health goals set. Add your first goal to start tracking!</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {goals.map((goal) => (
            <Box
              key={goal.id}
              borderWidth="1px"
              borderRadius="md"
              borderColor={borderColor}
              overflow="hidden"
            >
              <Flex 
                bg={headerBg} 
                p={3} 
                justify="space-between" 
                align="center"
              >
                <Flex align="center">
                  <Badge colorScheme={getStatusColor(goal.status)} mr={2}>
                    {goal.status.replace('-', ' ')}
                  </Badge>
                  <Text fontWeight="bold">{goal.name}</Text>
                </Flex>
                <Flex>
                  <IconButton
                    icon={<EditIcon />}
                    variant="ghost"
                    size="sm"
                    aria-label="Edit goal"
                    mr={1}
                    onClick={() => handleEditGoal(goal)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    variant="ghost"
                    size="sm"
                    colorScheme="red"
                    aria-label="Delete goal"
                    onClick={() => handleDeleteClick(goal.id)}
                  />
                </Flex>
              </Flex>
              
              <Box p={4}>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" color={textColor}>
                    {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {goal.currentValue} / {goal.target} {goal.unit}
                  </Text>
                </Flex>
                
                <Progress 
                  value={goal.progress} 
                  colorScheme={getProgressColor(goal.progress)}
                  size="sm"
                  borderRadius="full"
                  mb={3}
                />
                
                <Flex justify="space-between" fontSize="xs" color={textColor}>
                  <Text>{formatDate(goal.startDate)}</Text>
                  <Text>{formatDate(goal.targetDate)}</Text>
                </Flex>
                
                <Text fontSize="xs" color={textColor} textAlign="right" mt={1}>
                  {getDaysRemaining(goal.targetDate)} days remaining
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Add/Edit Goal Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit Goal' : 'Add New Goal'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Goal Name</FormLabel>
              <Input 
                name="name" 
                value={newGoal.name} 
                onChange={handleInputChange} 
                placeholder="e.g., Run a Marathon"
              />
            </FormControl>
            
            <FormControl mb={3}>
              <FormLabel>Category</FormLabel>
              <Select 
                name="category" 
                value={newGoal.category} 
                onChange={handleInputChange}
              >
                <option value="fitness">Fitness</option>
                <option value="nutrition">Nutrition</option>
                <option value="wellness">Wellness</option>
                <option value="medical">Medical</option>
                <option value="weight">Weight</option>
              </Select>
            </FormControl>
            
            <Flex gap={4} mb={3}>
              <FormControl>
                <FormLabel>Current Value</FormLabel>
                <NumberInput 
                  min={0} 
                  value={newGoal.currentValue}
                  onChange={(value) => handleNumberInputChange('currentValue', value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              <FormControl>
                <FormLabel>Target Value</FormLabel>
                <NumberInput 
                  min={0} 
                  value={newGoal.target}
                  onChange={(value) => handleNumberInputChange('target', value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
            
            <FormControl mb={3}>
              <FormLabel>Unit</FormLabel>
              <Input 
                name="unit" 
                value={newGoal.unit} 
                onChange={handleInputChange} 
                placeholder="e.g., km, kg, hours"
              />
            </FormControl>
            
            <Flex gap={4} mb={3}>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input 
                  name="startDate" 
                  type="date" 
                  value={newGoal.startDate} 
                  onChange={handleInputChange} 
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Target Date</FormLabel>
                <Input 
                  name="targetDate" 
                  type="date" 
                  value={newGoal.targetDate} 
                  onChange={handleInputChange} 
                />
              </FormControl>
            </Flex>
            
            <FormControl mb={3}>
              <FormLabel>Status</FormLabel>
              <Select 
                name="status" 
                value={newGoal.status} 
                onChange={handleInputChange}
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="at-risk">At Risk</option>
                <option value="missed">Missed</option>
              </Select>
            </FormControl>
            
            <FormControl mb={3}>
              <FormLabel>Progress (%)</FormLabel>
              <NumberInput 
                min={0} 
                max={100} 
                value={newGoal.progress}
                onChange={(value) => handleNumberInputChange('progress', parseInt(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button 
              colorScheme="brand" 
              onClick={handleSaveGoal} 
              isLoading={isLoading}
              loadingText={isEditing ? "Updating..." : "Adding..."}
            >
              {isEditing ? 'Update Goal' : 'Add Goal'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Goal
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this goal? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteAlertClose} isDisabled={isLoading}>
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleDeleteGoal} 
                ml={3}
                isLoading={isLoading}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default HealthGoals; 