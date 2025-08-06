import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Heading, Text, Box, VStack, Input, Button, Divider } from '@chakra-ui/react';


const TimeLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Manual log entry (optional, not yet wired to backend)
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/timelogs', {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setLogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load time logs');
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <Heading color="teal.500">Time Logs</Heading>
      {/* Manual log entry UI can be wired to backend if needed */}
      <Box mt={4} mb={6}>
        <Text fontWeight="bold" mb={2}>Add Manual Time Log (demo only)</Text>
        <VStack align="start" spacing={2}>
          <Input placeholder="Task" value={task} onChange={e => setTask(e.target.value)} />
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <Input placeholder="Duration (min)" type="number" value={duration} onChange={e => setDuration(e.target.value)} />
          <Button colorScheme="teal" isDisabled>Backend integration required</Button>
        </VStack>
      </Box>
      <Divider mb={6} />
      <Text fontWeight="bold" mb={2}>Log History</Text>
      {error && <Text color="red.500">{error}</Text>}
      {loading ? (
        <Text color="gray.500">Loading time logs...</Text>
      ) : (
        <VStack align="stretch" spacing={3}>
          {logs.length === 0 ? (
            <Text color="gray.500">No time logs yet.</Text>
          ) : (
            logs.map(log => (
              <Box key={log._id} p={3} bg="white" rounded="md" shadow="sm">
                <Text><b>Task:</b> {log.task?.title || log.task}</Text>
                <Text><b>Start:</b> {new Date(log.startTime).toLocaleString()}</Text>
                <Text><b>End:</b> {log.endTime ? new Date(log.endTime).toLocaleString() : 'In progress'}</Text>
                <Text><b>Duration:</b> {log.duration ? Math.round(log.duration / 60) : 0} min</Text>
              </Box>
            ))
          )}
        </VStack>
      )}
    </DashboardLayout>
  );
};

export default TimeLogs;
