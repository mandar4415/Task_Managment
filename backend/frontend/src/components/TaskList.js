import React from 'react';
import { Box, Heading, VStack, Text, Badge, Button, HStack } from '@chakra-ui/react';


const TaskList = ({ tasks = [], onEdit, onDelete, onComplete }) => {
  return (
    <Box>
      <Heading size="md" mb={4} color="teal.500">Tasks</Heading>
      <VStack align="stretch" spacing={4}>
        {tasks.length === 0 ? (
          <Text color="gray.500">No tasks yet. Add your first task!</Text>
        ) : (
          tasks.map(task => (
            <Box key={task.id || task._id} p={4} bg="white" rounded="md" shadow="sm">
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="bold">{task.title}</Text>
                  <Text fontSize="sm" color="gray.600">{task.description}</Text>
                </Box>
                <Badge colorScheme={task.status === 'Completed' ? 'green' : task.status === 'In Progress' ? 'yellow' : 'gray'}>{task.status}</Badge>
              </HStack>
              <HStack mt={2}>
                <Button size="sm" colorScheme="teal" onClick={() => onEdit(task)}>Edit</Button>
                <Button size="sm" colorScheme="red" variant="outline" onClick={() => onDelete(task)}>Delete</Button>
                <Button size="sm" colorScheme="green" variant="outline" onClick={() => onComplete(task)} isDisabled={task.status === 'Completed'}>Mark Completed</Button>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default TaskList;
