import React from 'react';
import { Box, Heading, Text, Progress, VStack } from '@chakra-ui/react';

const DailySummary = ({ tasks = [], timeTracked = 0 }) => {
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const totalTasks = tasks.length;
  const percentComplete = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Box mt={8} p={4} bg="white" rounded="md" shadow="sm">
      <Heading size="sm" mb={2} color="teal.600">Daily Summary</Heading>
      <VStack align="stretch" spacing={2}>
        <Text>Tasks Completed: {completedTasks} / {totalTasks}</Text>
        <Progress value={percentComplete} colorScheme="teal" size="sm" rounded="md" />
        <Text>Time Tracked: {Math.floor(timeTracked / 60)} min {timeTracked % 60} sec</Text>
      </VStack>
    </Box>
  );
};

export default DailySummary;
