import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Flex,
  Heading,
  Divider,
  Badge,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Circle,
  HStack,
  Icon
} from '@chakra-ui/react';
import { FaBell, FaTimes, FaCheck, FaCheckDouble, FaFilter, FaTrash } from 'react-icons/fa';
import { useGlobal } from '../context/GlobalContext';
import { motion } from 'framer-motion';

// Framer Motion variants for animations
const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MotionBox = motion(Box);

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const readTextColor = useColorModeValue('gray.500', 'gray.400');
  const unreadTextColor = useColorModeValue('gray.900', 'white');
  const timeColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  
  // Type-based colors and icons
  const getTypeColor = (type) => {
    switch (type) {
      case 'test': return 'blue';
      case 'recipe': return 'green';
      case 'goal': return 'purple';
      case 'article': return 'orange';
      default: return 'gray';
    }
  };
  
  return (
    <MotionBox 
      variants={itemVariants}
      p={4}
      bg={notification.isRead ? bgColor : useColorModeValue('gray.50', 'gray.700')}
      borderRadius="md"
      boxShadow={notification.isRead ? 'none' : 'sm'}
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ bg: hoverBg }}
      cursor="default"
      mb={2}
      position="relative"
    >
      <Flex justify="space-between" align="flex-start">
        <VStack align="start" spacing={1} width="calc(100% - 40px)">
          <Flex w="100%" justify="space-between" align="center">
            <Badge colorScheme={getTypeColor(notification.type)} mb={1}>
              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            </Badge>
            <Text fontSize="xs" color={timeColor}>
              {notification.time}
            </Text>
          </Flex>
          <Text 
            fontWeight={notification.isRead ? 'normal' : 'bold'} 
            color={notification.isRead ? readTextColor : unreadTextColor}
            fontSize="sm"
          >
            {notification.title}
          </Text>
          <Text 
            fontSize="xs" 
            color={notification.isRead ? readTextColor : unreadTextColor}
            noOfLines={2}
          >
            {notification.description}
          </Text>
        </VStack>
        
        {!notification.isRead && (
          <Tooltip label="Mark as read" placement="top">
            <IconButton
              aria-label="Mark as read"
              icon={<FaCheck />}
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={() => onMarkAsRead(notification.id)}
            />
          </Tooltip>
        )}
      </Flex>
    </MotionBox>
  );
};

const NotificationsPanel = () => {
  const { 
    notifications, 
    isNotificationsPanelOpen, 
    setIsNotificationsPanelOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications
  } = useGlobal();
  
  const [filter, setFilter] = useState('all');
  
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return notif.type === filter;
  });
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const headerBgColor = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <Drawer
      isOpen={isNotificationsPanelOpen}
      placement="right"
      onClose={() => setIsNotificationsPanelOpen(false)}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerHeader bg={headerBgColor} py={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md" display="flex" alignItems="center">
              <Icon as={FaBell} mr={2} /> Notifications
            </Heading>
            <HStack>
              <Menu>
                <Tooltip label="Filter notifications">
                  <MenuButton
                    as={IconButton}
                    icon={<FaFilter />}
                    variant="ghost"
                    aria-label="Filter notifications"
                    size="sm"
                  />
                </Tooltip>
                <MenuList>
                  <MenuItem onClick={() => setFilter('all')}>All</MenuItem>
                  <MenuItem onClick={() => setFilter('unread')}>Unread</MenuItem>
                  <Divider />
                  <MenuItem onClick={() => setFilter('test')}>Health Tests</MenuItem>
                  <MenuItem onClick={() => setFilter('recipe')}>Recipes</MenuItem>
                  <MenuItem onClick={() => setFilter('goal')}>Goals</MenuItem>
                  <MenuItem onClick={() => setFilter('article')}>Articles</MenuItem>
                </MenuList>
              </Menu>
              <Tooltip label="Mark all as read">
                <IconButton
                  icon={<FaCheckDouble />}
                  variant="ghost"
                  aria-label="Mark all as read"
                  size="sm"
                  onClick={markAllNotificationsAsRead}
                />
              </Tooltip>
              <Tooltip label="Clear all">
                <IconButton
                  icon={<FaTrash />}
                  variant="ghost"
                  aria-label="Clear all notifications"
                  size="sm"
                  onClick={clearNotifications}
                />
              </Tooltip>
            </HStack>
          </Flex>
        </DrawerHeader>
        <DrawerCloseButton />
        
        <DrawerBody p={4}>
          {filter !== 'all' && (
            <Badge colorScheme="blue" mb={4}>
              Filtering: {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Badge>
          )}
          
          {filteredNotifications.length > 0 ? (
            <MotionBox
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {filteredNotifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markNotificationAsRead}
                />
              ))}
            </MotionBox>
          ) : (
            <Flex 
              direction="column" 
              align="center" 
              justify="center" 
              h="60vh" 
              textAlign="center"
            >
              <Icon as={FaBell} fontSize="5xl" color="gray.300" mb={4} />
              <Text color="gray.500">
                {filter !== 'all' 
                  ? `No ${filter} notifications` 
                  : 'No notifications yet'}
              </Text>
              {filter !== 'all' && (
                <Button 
                  mt={4} 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  View all notifications
                </Button>
              )}
            </Flex>
          )}
        </DrawerBody>
        
        <DrawerFooter>
          <Button 
            variant="outline" 
            colorScheme="brand"
            onClick={() => setIsNotificationsPanelOpen(false)}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationsPanel; 