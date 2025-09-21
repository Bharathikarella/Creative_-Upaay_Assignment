import React, { useState } from "react";
import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import FilterBar from "./FilterBar";
import {
  addTask,
  moveTask,
  reorderTasks,
  setFilters,
} from "../redux/tasksSlice";
import { toggleTheme } from "../redux/themeSlice";

const columns = [
  { id: "toDo", label: "To Do", color: "#7f56d9" },
  { id: "onProgress", label: "On Progress", color: "#ff9f43" },
  { id: "done", label: "Done", color: "#2ecc71" },
];

function Dashboard() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filters = useSelector((state) => state.tasks.filters);
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("To Do");

  // Filtering tasks based on filters
  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      !filters.category || task.category === filters.category;
    const priorityMatch =
      !filters.priority || task.priority === filters.priority;
    const dueDateMatch = !filters.dueDate || task.dueDate === filters.dueDate;
    return categoryMatch && priorityMatch && dueDateMatch;
  });

  // Group filtered tasks by column
  const tasksByStatus = {
    toDo: [],
    onProgress: [],
    done: [],
  };

  filteredTasks.forEach((task) => {
    if (task.status === "To Do") tasksByStatus.toDo.push(task);
    else if (task.status === "On Progress") tasksByStatus.onProgress.push(task);
    else if (task.status === "Done") tasksByStatus.done.push(task);
  });

  const handleAddClick = (statusLabel) => {
    setModalStatus(statusLabel);
    setModalOpen(true);
  };

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Moving inside same column - reorder tasks
    if (source.droppableId === destination.droppableId) {
      const columnTasks = Array.from(tasksByStatus[source.droppableId]);
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);

      const otherTasks = tasks.filter(
        (t) =>
          t.status !== columns.find((c) => c.id === source.droppableId)?.label
      );
      const reorderedTasks = [...otherTasks, ...columnTasks];
      dispatch(reorderTasks(reorderedTasks));
    } else {
      // Moving to a different column - update task's status
      dispatch(
        moveTask({
          id: draggableId,
          status: columns.find((c) => c.id === destination.droppableId)?.label,
        })
      );
    }
  };

  return (
    <Box
      sx={{
        p: 5,
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Mobile App
        </Typography>
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <FilterBar
        filters={filters}
        setFilters={(newFilters) => dispatch(setFilters(newFilters))}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {columns.map((col) => (
            <Grid item xs={12} md={4} key={col.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  borderTop: `4px solid ${col.color}`,
                  minHeight: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                }}
                elevation={2}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {col.label} {tasksByStatus[col.id].length}
                  </Typography>
                  <IconButton onClick={() => handleAddClick(col.label)}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        flexGrow: 1,
                        mt: 2,
                        minHeight: 200,
                        bgcolor: snapshot.isDraggingOver
                          ? "action.hover"
                          : "inherit",
                        overflowY: "auto",
                        pb: 1,
                      }}
                    >
                      {tasksByStatus[col.id].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                mb: 2,
                                boxShadow: snapshot.isDragging
                                  ? "0 0 10px rgba(0,0,0,0.3)"
                                  : "none",
                                borderRadius: 2,
                                bgcolor: "background.default",
                              }}
                            >
                              <TaskCard task={task} />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddTask}
        status={modalStatus}
      />
    </Box>
  );
}

export default Dashboard;
