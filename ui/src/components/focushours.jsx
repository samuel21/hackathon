import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";

// Dummy goals data
const goalsData = {
  Work: [
    { goal: "Complete Project Alpha" },
    { goal: "Prepare for Team Presentation" },
  ],
  Health: [
    { goal: "Run 5km every morning" },
    { goal: "Drink 8 glasses of water" },
  ],
  Hobbies: [
    { goal: "Read 30 pages of a book" },
    { goal: "Practice guitar for 1 hour" },
  ],
};

const FocusHoursComponent = () => {
  // State to store focus hours for each category (both start and end time)
  const [focusHours, setFocusHours] = useState({
    Work: { start: null, end: null },
    Health: { start: null, end: null },
    Hobbies: { start: null, end: null },
  });

  // Handle time change for focus hours
  const handleFocusHoursChange = (category, type, newValue) => {
    setFocusHours((prevFocusHours) => ({
      ...prevFocusHours,
      [category]: {
        ...prevFocusHours[category],
        [type]: newValue,
      },
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Typography variant="h5" gutterBottom>
          Set Focus Hours for Each Category
        </Typography>
        <Grid container spacing={3}>
          {/* Work Category */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "background.paper", border: '1px solid #ddd', borderRadius: "8px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <WorkIcon color="primary" sx={{ mr: 1 }} /> Work
                </Typography>
                <Divider />
                <List>
                  {goalsData.Work.map((goal, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={goal.goal} />
                    </ListItem>
                  ))}
                </List>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Start Time"
                      value={focusHours.Work.start}
                      onChange={(newValue) =>
                        handleFocusHoursChange("Work", "start", newValue)
                      }
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="End Time"
                      value={focusHours.Work.end}
                      onChange={(newValue) =>
                        handleFocusHoursChange("Work", "end", newValue)
                      }
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Health Category */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "background.paper", border: '1px solid #ddd', borderRadius: "8px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <FitnessCenterIcon color="success" sx={{ mr: 1 }} /> Health
                </Typography>
                <Divider />
                <List>
                  {goalsData.Health.map((goal, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={goal.goal} />
                    </ListItem>
                  ))}
                </List>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Start Time"
                      value={focusHours.Health.start}
                      onChange={(newValue) =>
                        handleFocusHoursChange("Health", "start", newValue)
                      }
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="End Time"
                      value={focusHours.Health.end}
                      onChange={(newValue) =>
                        handleFocusHoursChange("Health", "end", newValue)
                      }
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Hobbies Category */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "background.paper", border: '1px solid #ddd', borderRadius: "8px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <BookIcon color="secondary" sx={{ mr: 1 }} /> Hobbies
                </Typography>
                <Divider />
                <List>
                  {goalsData.Hobbies.map((goal, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={goal.goal} />
                    </ListItem>
                  ))}
                </List>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Start Time"
                      value={focusHours.Hobbies.start}
                      onChange={(newValue) =>
                        handleFocusHoursChange("Hobbies", "start", newValue)
                      }
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="End Time"
                      value={focusHours.Hobbies.end}
                      onChange={(newValue) =>
                        handleFocusHoursChange("Hobbies", "end", newValue)
                      }
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Display Focus Hours */}
        <Typography variant="h6" sx={{ mt: 4 }}>
          Your Focus Hours Summary:
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Card sx={{ bgcolor: "background.default", p: 2 }}>
              <List>
                {Object.keys(focusHours).map((category, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${category} Focus Hours: ${
                        focusHours[category].start && focusHours[category].end
                          ? `${focusHours[category].start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${focusHours[category].end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                          : "Not set"
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Save Focus Hours
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default FocusHoursComponent;
