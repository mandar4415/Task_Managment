import React from 'react';
import { Box, Flex, VStack, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box w="220px" bg="white" p={6} shadow="md">
        <VStack align="start" spacing={6}>
          <Heading size="md" color="teal.500">Menu</Heading>
          <Button as={Link} to="/" variant="ghost" colorScheme="teal" w="full" justifyContent="flex-start">Tasks</Button>
          <Button as={Link} to="/timelogs" variant="ghost" colorScheme="teal" w="full" justifyContent="flex-start">Time Logs</Button>
          <Button as={Link} to="/summary" variant="ghost" colorScheme="teal" w="full" justifyContent="flex-start">Summary</Button>
        </VStack>
      </Box>
      {/* Main Content */}
      <Box flex={1} p={8}>
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
