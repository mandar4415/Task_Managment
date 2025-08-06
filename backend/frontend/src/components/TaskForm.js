import React, { useState } from 'react';
import { Box, Input, Button, VStack, Heading } from '@chakra-ui/react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <Box mb={6}>
      <Heading size="sm" mb={2} color="teal.600">Add New Task</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={2} align="stretch">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            bg="white"
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            bg="white"
          />
          <Button type="submit" colorScheme="teal">Add Task</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TaskForm;
