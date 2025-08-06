import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Heading, Text, Box, Progress, VStack } from '@chakra-ui/react';
import API_URL from '../config';

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/summary/daily`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    })
      .then(res => res.json())
      .then(data => {
        // Ensure completedTasks and activeTasks are always arrays
        setSummary({
          ...data,
          completedTasks: Array.isArray(data.completedTasks) ? data.completedTasks : [],
          activeTasks: Array.isArray(data.activeTasks) ? data.activeTasks : [],
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load summary');
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <Heading color="teal.500">Summary</Heading>
      <VStack align="start" spacing={6} mt={4}>
        {error && <Text color="red.500">{error}</Text>}
        {loading ? (
          <Text color="gray.500">Loading summary...</Text>
        ) : summary ? (
          <>
            <Box>
              <Text fontWeight="bold">Today's Productivity</Text>
              <Text>Tasks Completed: {summary.completedTasks.length} / {summary.completedTasks.length + summary.activeTasks.length}</Text>
              <Progress value={
                (summary.completedTasks.length + summary.activeTasks.length) > 0
                  ? summary.completedTasks.length / (summary.completedTasks.length + summary.activeTasks.length) * 100
                  : 0
              } colorScheme="teal" size="md" rounded="md" />
            </Box>
            <Box>
              <Text fontWeight="bold">Total Time Tracked</Text>
              <Text>{Math.round((summary.totalTimeTrackedSeconds || 0) / 60)} min today</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Reminders</Text>
              <Text color="red.500">{summary.activeTasks.length} active tasks</Text>
            </Box>
          </>
        ) : null}
      </VStack>
    </DashboardLayout>
  );
};

export default Summary;
