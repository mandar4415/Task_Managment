import React, { useState } from 'react';
import { Box, Heading, Button, Input, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} rounded="lg" shadow="md" w="full" maxW="md">
        <Heading mb={6} textAlign="center" color="teal.500">Sign In</Heading>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          {error && <Text color="red.500">{error}</Text>}
          <Input placeholder="Email" type="email" size="lg" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" size="lg" value={password} onChange={e => setPassword(e.target.value)} />
          <Button colorScheme="teal" size="lg" w="full" type="submit">Login</Button>
        </VStack>
        <Text mt={4} textAlign="center">
          Don't have an account? <Button variant="link" colorScheme="teal" onClick={() => navigate('/signup')}>Sign Up</Button>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
