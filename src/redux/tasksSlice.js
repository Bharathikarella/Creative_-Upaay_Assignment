import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filters: { category: "", priority: "", dueDate: "" },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    moveTask: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.status = status;
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) Object.assign(task, updates);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  addTask,
  moveTask,
  reorderTasks,
  setFilters,
  setTasks,
  updateTask,
  deleteTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
