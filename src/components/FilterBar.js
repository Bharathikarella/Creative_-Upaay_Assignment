import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const categoryOptions = ["", "Work", "Personal", "Urgent"];
const priorityOptions = ["", "High", "Medium", "Low"];

function FilterBar({ filters, setFilters }) {
  const handleDueDateChange = (event) => {
    setFilters({ ...filters, dueDate: event.target.value });
  };

  return (
    <Box sx={{ display: "flex", gap: 3, mb: 3, flexWrap: "wrap" }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          {categoryOptions.map((c) => (
            <MenuItem key={c} value={c}>
              {c || "All"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          {priorityOptions.map((p) => (
            <MenuItem key={p} value={p}>
              {p || "All"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        size="small"
        label="Due Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filters.dueDate || ""}
        onChange={handleDueDateChange}
        sx={{ minWidth: 150 }}
      />
    </Box>
  );
}

export default FilterBar;
