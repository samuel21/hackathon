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
  Grid,
  ListItemIcon
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TomorrowScheduleComponent from "./tomorrow";

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

    // Schedule notification for 6 PM
    scheduleNotification();
  }, []);

  const renderProgress = (category) => {
    const goal = goals[category];
    const progress = (goal.stepsCompleted / goal.totalSteps) * 100;
    return (
      <Box sx={{ width: "100%", mt: 2 }}>
        <Typography variant="body2">{category} Goals</Typography>
        <LinearProgress variant="determinate" value={progress} color="success" />
        <Typography variant="body2">{`${goal.stepsCompleted}/${goal.totalSteps} steps completed`}</Typography>
      </Box>
    );
  };

  const scheduleNotification = () => {
    const now = new Date();
    const lastMeetingTime = new Date();
    lastMeetingTime.setHours(18, 0, 0, 0); // 6 PM

    // Calculate the time remaining until 6 PM
    const timeUntilLastMeet = lastMeetingTime - now;
    
    // If 6 PM is already passed for today, schedule it for tomorrow
    if (timeUntilLastMeet < 0) {
      lastMeetingTime.setDate(lastMeetingTime.getDate() + 1);
    }

    const timeLeft = lastMeetingTime.getTime() - now.getTime();

    // Schedule notification at 6 PM
    setTimeout(() => {
      sendNotification();
    }, timeLeft);
  };

  const sendNotification = () => {
    if (Notification.permission === "granted") {
      const notification = new Notification("It's 6 PM! Here's your task summary.");
      notification.onclick = () => {
        handleClickOpen();// Open the modal when notification is clicked
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("It's 6 PM! Here's your task summary.");
          notification.onclick = () => {
            setOpen(true); // Open the modal when notification is clicked
          };
        }
      });
    }
  };

  // Open the modal manually (if needed)
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const [openModal, setOpenModal] = useState(false);

  // Function to open the modal
  const openTomorrowSchedule = () => {
    setOpenModal(true);
  };

  return (
    <div>
      {/* Button to trigger the modal manually */}

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
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Tasks Completed
                    </Typography>
                    <List>
                      {completedTasks
                        .filter((task) => task.category === category)
                        .map((task, index) => (
                          <ListItem key={index}>
                            <ListItemIcon><CheckCircleIcon color="success"/></ListItemIcon>
                            <ListItemText
                              primary={task.name}
                              secondary={`Duration: ${task.duration} mins`}
                            />
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
          <Button onClick={openTomorrowSchedule} color="success">
            Tomorrow's Schedule
          </Button>
          <TomorrowScheduleComponent onopen={openModal} onClose={() => setOpenModal(false)} />
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div id="tomorrow-modal"></div>
    </div>
  );
};

export default SummaryComponent;
