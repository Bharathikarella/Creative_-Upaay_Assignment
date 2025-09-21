import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const priorityOptions = ['Low', 'Medium', 'High'];
const categoryOptions = ['Work', 'Personal', 'Urgent'];

function AddTaskModal({ open, onClose, onAdd, status }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({
      id: Date.now().toString(),
      title,
      description,
      status,
      priority,
      category,
      dueDate: dueDate || '2025-12-31',
      comments: Math.floor(Math.random() * 15),
      files: Math.floor(Math.random() * 3),
      users: ['JD', 'AS', 'MT'], // example initials
    });
    setTitle('');
    setDescription('');
    setPriority('Low');
    setCategory('Work');
    setDueDate('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Add Task - {status}</Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          {priorityOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          {categoryOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button variant="contained" onClick={handleAdd} fullWidth>Add Task</Button>
      </Box>
    </Modal>
  );
}

export default AddTaskModal;