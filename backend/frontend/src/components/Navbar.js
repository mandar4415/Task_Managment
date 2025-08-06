import React from 'react';
import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Flex as="nav" align="center" p={4} bg="white" shadow="sm">
      <Heading size="md" color="teal.500">TaskTracker</Heading>
      <Spacer />
      <Button as={Link} to="/" variant="ghost" colorScheme="teal" mr={2}>Dashboard</Button>
      {isLoggedIn ? (
        <Button colorScheme="red" variant="outline" onClick={handleLogout}>Logout</Button>
      ) : (
        <>
          <Button as={Link} to="/login" variant="outline" colorScheme="teal" mr={2}>Login</Button>
          <Button as={Link} to="/signup" colorScheme="teal">Sign Up</Button>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
