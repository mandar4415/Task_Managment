import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import EditTaskModal from '../components/EditTaskModal';
import { useNavigate } from 'react-router-dom';
import { Heading, Text, Box, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import DashboardLayout from '../components/DashboardLayout';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TimeTracker from '../components/TimeTracker';
import DailySummary from '../components/DailySummary';
import API_URL from '../config';

const Dashboard = () => {
  // Placeholder for tasks state and add handler (API integration later)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeTracked, setTimeTracked] = useState(0); // For summary
  const navigate = useNavigate();
  const [editingTask, setEditingTask] = useState(null);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [deletingTask, setDeletingTask] = useState(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // Fetch tasks from backend API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetch(`${API_URL}/api/tasks`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    })
      .then(async res => {
        let data;
        try {
          data = await res.json();
        } catch (e) {
          data = {};
        }
        if (!res.ok) {
          // Show backend error message if available
          setError(data.message || `Failed to load tasks (status ${res.status})`);
          setLoading(false);
          return;
        }
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load tasks (network error)');
        setLoading(false);
      });
  }, [navigate]);

  // Add new task via API
  const handleAddTask = async (task) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(task)
      });
      if (!res.ok) throw new Error('Failed to add task');
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
    } catch {
      setTasks(prev => [...prev, { ...task, id: Date.now(), status: 'Pending' }]);
    }
  };

  return (
    <DashboardLayout>
      <Heading color="teal.500">Dashboard</Heading>
      <Text mt={4}>Welcome to your productivity dashboard!</Text>
      <Box mt={8}>
        {error && <Text color="red.500">{error}</Text>}
        {loading ? (
          <Text color="gray.500">Loading tasks...</Text>
        ) : (
          <>
            <TaskForm onAdd={handleAddTask} />
            <TaskList
              tasks={tasks}
              onEdit={(task) => {
                setEditingTask(task);
                onEditOpen();
              }}
              onDelete={(task) => {
                setDeletingTask(task);
                onDeleteOpen();
              }}
              onComplete={async (task) => {
                const token = localStorage.getItem('token');
                try {
                  const res = await fetch(`${API_URL}/api/tasks/${task._id || task.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': token ? `Bearer ${token}` : '',
                    },
                    body: JSON.stringify({ status: 'Completed' })
                  });
                  if (!res.ok) throw new Error('Failed to mark complete');
                  const updated = await res.json();
                  setTasks(prev => prev.map(t => (t._id === updated._id || t.id === updated._id) ? updated : t));
                } catch {}
              }}
            />
            <EditTaskModal
              isOpen={isEditOpen}
              onClose={() => { setEditingTask(null); onEditClose(); }}
              task={editingTask}
              onSave={async ({ title, description }) => {
                const token = localStorage.getItem('token');
                try {
                  const res = await fetch(`${API_URL}/api/tasks/${editingTask._id || editingTask.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': token ? `Bearer ${token}` : '',
                    },
                    body: JSON.stringify({ title, description })
                  });
                  if (!res.ok) throw new Error('Failed to update task');
                  const updated = await res.json();
                  setTasks(prev => prev.map(t => (t._id === updated._id || t.id === updated._id) ? updated : t));
                  setEditingTask(null);
                  onEditClose();
                } catch {}
              }}
            />
            <Modal isOpen={isDeleteOpen} onClose={() => { setDeletingTask(null); onDeleteClose(); }}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text mb={4}>Are you sure you want to delete this task?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={async () => {
                    const token = localStorage.getItem('token');
                    try {
                      const res = await fetch(`${API_URL}/api/tasks/${deletingTask._id || deletingTask.id}`, {
                        method: 'DELETE',
                        headers: {
                          'Authorization': token ? `Bearer ${token}` : '',
                        },
                      });
                      if (!res.ok) throw new Error('Failed to delete task');
                      setTasks(prev => prev.filter(t => (t._id || t.id) !== (deletingTask._id || deletingTask.id)));
                      setDeletingTask(null);
                      onDeleteClose();
                    } catch {}
                  }}>Delete</Button>
                  <Button onClick={() => { setDeletingTask(null); onDeleteClose(); }}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <TimeTracker />
            <DailySummary tasks={tasks} timeTracked={timeTracked} />
          </>
        )}
      </Box>
      {/* Next: Add time tracker, summary, etc. */}
    </DashboardLayout>
  );
};

export default Dashboard;
