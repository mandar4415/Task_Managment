import React, { useState, useRef } from 'react';
import { Box, Button, Text, Heading, HStack } from '@chakra-ui/react';

const TimeTracker = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setElapsed(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box mt={8} p={4} bg="white" rounded="md" shadow="sm">
      <Heading size="sm" mb={2} color="teal.600">Time Tracker</Heading>
      <Text fontSize="2xl" fontWeight="bold" color="teal.700">{formatTime(elapsed)}</Text>
      <HStack mt={4}>
        <Button colorScheme="teal" onClick={startTimer} isDisabled={isRunning}>Start</Button>
        <Button colorScheme="red" onClick={stopTimer} isDisabled={!isRunning}>Stop</Button>
        <Button colorScheme="gray" onClick={resetTimer}>Reset</Button>
      </HStack>
    </Box>
  );
};

export default TimeTracker;
