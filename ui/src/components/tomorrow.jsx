import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  CardHeader,
  Button,
  ListItemIcon,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import TaskIcon from "@mui/icons-material/Task";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Groups2Icon from '@mui/icons-material/Groups2';
import FlagIcon from '@mui/icons-material/Flag';
import TodayIcon from '@mui/icons-material/Today';

// Dummy data
const tasksForTomorrow = [
  { name: "Complete project documentation", category: "Work", time: "9:00 AM" },
  { name: "Morning Exercise", category: "Health", time: "7:00 AM" },
  { name: "Team Standup Meeting", category: "Work", time: "10:00 AM" },
  { name: "Lunch with Client", category: "Personal", time: "1:00 PM" },
  { name: "Evening Reading", category: "Hobbies", time: "8:00 PM" },
];

const meetingsForTomorrow = [
  { name: "Project Planning Meeting", time: "11:00 AM" },
  { name: "One-on-One with Manager", time: "4:00 PM" },
];

const goalsForTomorrow = [
  { goal: "Complete 80% of Project Alpha tasks", category: "Work" },
  { goal: "Run 5km in the morning", category: "Health" },
  { goal: "Read 30 pages of a book", category: "Hobbies" },
];

const motivationalQuotes = [
  "The best way to get started is to quit talking and begin doing.",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "Don’t let yesterday take up too much of today.",
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
  "It’s not whether you get knocked down, it’s whether you get up.",
];

// Generate a random quote
const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

const TomorrowScheduleComponent = ({ onopen, onClose }) => {
  const [motivationalQuote, setMotivationalQuote] = useState("");
//   const [open, setOpen] = useState(onopen); // For modal state
  // If onclick is true, show modal immediately
  // If onclick is false, show modal with present useEffect
  useEffect(() => {
    // Set random motivational quote on component mount
    setMotivationalQuote(getRandomQuote());
    const lastMeetingTime = new Date();
    lastMeetingTime.setHours(16, 0, 0); // Set to 4:00 PM

    const now = new Date();
    const timeUntilNotification = lastMeetingTime - now;

    if (timeUntilNotification > 0) {
      const timer = setTimeout(() => {
        if (Notification.permission === "granted") {
          new Notification("Here's your Schedule for Tomorrow", {
            body: "Click here to view your draft schedule for tomorrow!",
            icon: "https://via.placeholder.com/150", // Add your own icon URL if needed
          }).onclick = () => {
            onClose();
          };
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Here's your Schedule for Tomorrow", {
                body: "Click here to view your draft schedule for tomorrow!",
                icon: "https://via.placeholder.com/150", // Add your own icon URL if needed
              }).onclick = () => {
                onClose();
              };
            }
          });
        }
      }, timeUntilNotification);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div id="tomorrow-modal">
      {/* Modal Dialog */}
      <Dialog open={onopen} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle><TodayIcon/> How's Tomorrow?</DialogTitle>
        <DialogContent dividers>
              <Grid container spacing={3}>
                {/* Tasks Section */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',  bgcolor: 'background.paper', border:'1px solid #ddd', borderRadius:"8px"}}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom >
                        <TaskIcon color="primary" sx={{ mr: 1 }} /> Tasks
                      </Typography>
                      <Divider />
                      <List>
                        {tasksForTomorrow.map((task, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <TaskAltIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={task.name}
                              secondary={`Category: ${task.category} | Time: ${task.time}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Meetings Section */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',  bgcolor: 'background.paper', border:'1px solid #ddd', borderRadius:"8px"}}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom >
                        <EventIcon color="secondary" sx={{ mr: 1 }} /> Meetings & Events
                      </Typography>
                      <Divider />
                      <List>
                        {meetingsForTomorrow.map((meeting, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Groups2Icon color="secondary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={meeting.name}
                              secondary={`Time: ${meeting.time}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Goals Section */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',  bgcolor: 'background.paper', border:'1px solid #ddd', borderRadius:"8px"}}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom >
                        <EmojiEventsIcon color="success" sx={{ mr: 1 }} /> Goals & Targets
                      </Typography>
                      <Divider />
                      <List>
                        {goalsForTomorrow.map((goal, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <FlagIcon color="success" />
                            </ListItemIcon>
                            <ListItemText
                              primary={goal.goal}
                              secondary={`Category: ${goal.category}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Motivational Quote Section */}
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <FormatQuoteIcon sx={{ mr: 2, fontSize: 40, color: "success.main" }} />
                <Typography variant="h6" textAlign="center">
                  {motivationalQuote}
                </Typography>
              </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TomorrowScheduleComponent;
