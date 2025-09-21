import React from "react";
import {
  useTheme,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  AvatarGroup,
  Avatar,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const priorityStyles = (mode) => ({
  Low: {
    bg: mode === "dark" ? "#2D3A4A" : "#FEF6ED",
    color: mode === "dark" ? "#FFCB86" : "#C27803",
  },
  Medium: {
    bg: mode === "dark" ? "#3C3832" : "#FFF3CD",
    color: mode === "dark" ? "#FFEB99" : "#AF850E",
  },
  High: {
    bg: mode === "dark" ? "#3B2324" : "#FDECEE",
    color: mode === "dark" ? "#FF8E8B" : "#BF3030",
  },
});

function TaskCard({ task }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { bg, color } = priorityStyles(theme.palette.mode)[task.priority] || {
    bg: isDark ? "#232A3B" : "#E7EAF3",
    color: isDark ? "#aaa" : "#555",
  };

  return (
    <Card
      variant="outlined"
      sx={{
        border: "1.5px solid",
        borderColor: isDark ? theme.palette.divider : "#e7eaf3",
        borderRadius: 2,
        background: isDark ? theme.palette.background.paper : "#fff",
        boxShadow: isDark
          ? "0 4px 24px 0 rgba(16, 18, 27, 0.15)"
          : "0 4px 24px 0 rgba(52, 64, 84, 0.04)",
        mt: 2,
        mb: 2,
        p: 0,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Chip
            size="small"
            label={task.priority}
            sx={{
              background: bg,
              color: color,
              fontWeight: 600,
              fontSize: 12,
              border: 0,
            }}
          />
          <Tooltip title="More Options">
            <IconButton
              size="small"
              sx={{ color: isDark ? "#bbb" : "#8a92a6", p: 0 }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          mb={0.5}
          color={isDark ? theme.palette.text.primary : undefined}
        >
          {task.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: 13,
            mb: 2,
            color: isDark ? theme.palette.text.secondary : "#74798C",
          }}
        >
          {task.description}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <AvatarGroup
            max={3}
            sx={{
              ".MuiAvatar-root": {
                width: 28,
                height: 28,
                fontSize: 13,
                border: "2px solid #fff",
              },
            }}
          >
            {task.users.map((user, i) => (
              <Avatar
                key={i}
                sx={{ bgcolor: isDark ? "#3A3A3A" : "#FFF6DE", color: color }}
              >
                {user}
              </Avatar>
            ))}
          </AvatarGroup>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              color: isDark ? "#DDD" : "#A9B1C1",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <CommentIcon sx={{ fontSize: 16 }} />
              <span>{task.comments} comments</span>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachFileIcon sx={{ fontSize: 16 }} />
              <span>{task.files} files</span>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
