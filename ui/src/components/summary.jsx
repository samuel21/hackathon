import React, { useState, useEffect } from "react";
import {
  LinearProgress,
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from "@mui/material";

// Dummy task data
const initialTasks = [
  {
    name: "Morning Yoga",
    category: "Health",
    completed: true,
    duration: 30, // in minutes
    isMeeting: false,
  },
  {
    name: "Client Meeting",
    category: "Work",
    completed: true,
    duration: 60, // in minutes
    isMeeting: true,
  },
  {
    name: "Lunch Break",
    category: "Personal",
    completed: true,
    duration: 45, // in minutes
    isMeeting: false,
  },
  {
    name: "Code Review",
    category: "Work",
    completed: true,
    duration: 90, // in minutes
    isMeeting: false,
  },
  {
    name: "Evening Reading",
    category: "Hobbies",
    completed: true,
    duration: 30, // in minutes
    isMeeting: false,
  },
];

// Dummy goal data
const goals = {
  Health: { stepsCompleted: 3, totalSteps: 5 },
  Personal: { stepsCompleted: 2, totalSteps: 3 },
  Hobbies: { stepsCompleted: 1, totalSteps: 2 },
  Work: { stepsCompleted: 4, totalSteps: 5 },
};

const SummaryComponent = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [timeFocused, setTimeFocused] = useState({});
  const [meetingsAttended, setMeetingsAttended] = useState({});
  const [open, setOpen] = useState(false); // For modal state

  useEffect(() => {
    // Filter tasks to get only the completed ones
    const filteredCompletedTasks = initialTasks.filter((task) => task.completed);
    setCompletedTasks(filteredCompletedTasks);

    // Calculate the total time focused per category
    const timeByCategory = filteredCompletedTasks.reduce((acc, task) => {
      if (!acc[task.category]) acc[task.category] = 0;
      acc[task.category] += task.duration;
      return acc;
    }, {});
    setTimeFocused(timeByCategory);

    // Filter meetings attended
    const meetings = filteredCompletedTasks.filter((task) => task.isMeeting);
    const meetingsByCategory = meetings.reduce((acc, task) => {
      if (!acc[task.category]) acc[task.category] = [];
      acc[task.category].push(task.name);
      return acc;
    }, {});
    setMeetingsAttended(meetingsByCategory);
  }, []);

  const renderProgress = (category) => {
    const goal = goals[category];
    const progress = (goal.stepsCompleted / goal.totalSteps) * 100;
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <Typography variant="body2">{category} Goals</Typography>
        <LinearProgress variant="determinate" value={progress} color="success" />
        <Typography variant="body2">{`${goal.stepsCompleted}/${goal.totalSteps} steps completed`}</Typography>
      </Box>
    );
  };

  // Open the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Summary
      </Button>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle sx={{color:"darkgreen"}}>Today's Summary</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {['Health', 'Personal', 'Hobbies', 'Work'].map((category) => (
              <Grid item xs={12} md={5} key={category} sx={{m:2, p:2, border:'1px solid #ddd', borderRadius:'10px', boxShadow:3, bgcolor:"#eff8f2"}}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5">{category}</Typography>

                  {/* Completed tasks */}
                  <Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>Tasks Completed</Typography>
                    <List>
                      {completedTasks.filter((task) => task.category === category).map((task, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={task.name} secondary={`Duration: ${task.duration} mins`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Steps towards goals */}
                  {renderProgress(category)}

                  {/* Time Focused */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">Time Focused Today</Typography>
                    <Chip label={`${timeFocused[category] || 0} mins`} color="success" />
                  </Box>

                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SummaryComponent;
