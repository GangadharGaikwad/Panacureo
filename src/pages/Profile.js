import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Divider,
  Badge,
  Checkbox
} from '@chakra-ui/react';

const Profile = () => {
  return (
    <Container maxW="1200px" py={8}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8} align="flex-start">
        {/* Profile Overview */}
        <Box w={{ base: '100%', md: '30%' }} bg="white" p={6} borderRadius="md" boxShadow="sm">
          <VStack spacing={6} align="center">
            <Avatar size="2xl" name="John Doe" src="" />
            <Box textAlign="center">
              <Heading size="md">John Doe</Heading>
              <Text color="gray.600">john.doe@example.com</Text>
              <Badge colorScheme="teal" mt={2}>Premium Member</Badge>
            </Box>
            <Divider />
            <Box w="full">
              <Text fontWeight="bold" mb={2}>Account Information</Text>
              <HStack justify="space-between">
                <Text color="gray.600">Member since</Text>
                <Text>Jan 2023</Text>
              </HStack>
              <HStack justify="space-between" mt={1}>
                <Text color="gray.600">Last login</Text>
                <Text>Today</Text>
              </HStack>
            </Box>
          </VStack>
        </Box>

        {/* Profile Details and Settings */}
        <Box w={{ base: '100%', md: '70%' }} bg="white" p={6} borderRadius="md" boxShadow="sm">
          <Tabs>
            <TabList>
              <Tab>Personal Info</Tab>
              <Tab>Health Data</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Heading size="md" mb={4}>Personal Information</Heading>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input defaultValue="John Doe" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input defaultValue="john.doe@example.com" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input defaultValue="1990-01-01" type="date" />
                  </FormControl>
                  <Button colorScheme="teal" alignSelf="flex-end" mt={4}>
                    Save Changes
                  </Button>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Heading size="md" mb={4}>Health Information</Heading>
                  <FormControl>
                    <FormLabel>Height (cm)</FormLabel>
                    <Input defaultValue="180" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Weight (kg)</FormLabel>
                    <Input defaultValue="75" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Blood Type</FormLabel>
                    <Input defaultValue="O+" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Allergies</FormLabel>
                    <Input defaultValue="None" />
                  </FormControl>
                  <Button colorScheme="teal" alignSelf="flex-end" mt={4}>
                    Update Health Data
                  </Button>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Heading size="md" mb={4}>Account Settings</Heading>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Email Notifications</FormLabel>
                    <Checkbox defaultChecked />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Change Password</FormLabel>
                    <Input type="password" placeholder="New password" mb={2} />
                    <Input type="password" placeholder="Confirm new password" />
                  </FormControl>
                  <Button colorScheme="teal" alignSelf="flex-end" mt={4}>
                    Save Settings
                  </Button>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Container>
  );
};

export default Profile; 