import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Grid2, Checkbox, Chip, Modal, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckInTodoList = () => {
  // Sample tasks with due time
  const initialTasks = [
    {
      name: "Task 1",
      description: "Morning task description",
      dueDate: "2024-09-16",
      dueTime: "10:00", // 10:00 AM
      category: "Work",
      priority: "High",
      labels: "Urgent, Client meeting",
      status: "pending",
    },
    {
      name: "Task 2",
      description: "Mid-day task description",
      dueDate: "2024-09-17",
      dueTime: "14:00", // 2:00 PM
      category: "Personal",
      priority: "Medium",
      labels: "Exercise, Health",
      status: "pending",
    },
    {
      name: "Task 3",
      description: "End of the day task description",
      dueDate: "2024-09-17",
      dueTime: "17:30", // 5:30 PM
      category: "Study",
      priority: "Low",
      labels: "Reading, Research",
      status: "completed",
    },{
        name: "Task 4",
        description: "End of the day task description",
        dueDate: "2024-09-16",
        dueTime: "17:30", // 5:30 PM
        category: "Study",
        priority: "Low",
        labels: "Reading, Research",
        status: "partially done",
      },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [currentSlot, setCurrentSlot] = useState("");
  const [overdueTasks, setOverdueTasks] = useState([]);

  // Function to get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  };

  // Function to determine the current time slot
  const determineTimeSlot = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Mid-day";
    } else {
      return "End of Day";
    }
  };

  useEffect(() => {
    // Set the initial slot based on the current time
    const slot = determineTimeSlot();
    setCurrentSlot(slot);
  }, []);

  useEffect(() => {
    // Check for overdue tasks (tasks with due dates and times before the current date and time)
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();
    
    const overdue = tasks.filter((task) => {
        return task.dueDate < currentDate || (task.dueDate === currentDate && task.dueTime < currentTime);
    });

    setOverdueTasks(overdue);
  }, [tasks]);

  // Function to filter tasks based on the current time slot and due time
  const filterTasksForSlot = () => {
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();
    return tasks.filter((task) => {
      return task.dueTime > currentTime && task.dueDate === currentDate;
    });
  };

  // Get the tasks for the current time slot
  const [slotTasks, setSlotTasks] = useState(filterTasksForSlot());

  // Handle the task completion toggle
  const handleOverdueTaskCompletion = (index) => {
    const updatedTasks = [...overdueTasks];
    updatedTasks[index].status === "completed" ? updatedTasks[index].status = "pending" : updatedTasks[index].status = "completed";
    setOverdueTasks(updatedTasks);
  };
  const handleCurrentTaskCompletion = (index) => {
    const updatedTasks = [...slotTasks];
    updatedTasks[index].status === "completed" ? updatedTasks[index].status = "pending" : updatedTasks[index].status = "completed";
    setSlotTasks(updatedTasks);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Check-in Tasks for {currentSlot}</h3>

      {/* Display overdue tasks */}
      {overdueTasks.length > 0 && (
        <div className="mb-4">
          <h5 className="text-danger">Overdue Tasks</h5>
          <List>
            {overdueTasks.map((task, index) => (
              <ListItem key={index}>
                <Grid2 container spacing={2}>
                  <Grid2 item xs={1}>
                    <Checkbox
                      checked={task.status === "completed"}
                      onChange={() => handleOverdueTaskCompletion(index)}
                      color={
                        task.priority === "High" ? "error" : task.priority === "Medium" ? "warning" : "success"
                      }
                    />
                  </Grid2>
                  <Grid2 item xs={5}>
                    <ListItemText
                      primary={task.name}
                      secondary={task.description}
                      style={{ textDecoration: task.status === "completed" ? "line-through" : "none" }}
                    />
                    <ListItemText primary={`Due: ${task.dueDate} at ${task.dueTime}`} />
                    <Chip label={task.category} color="primary" variant="outlined" />
                    {/* Split the labels by ',' and display each one as a Chip */}
                    {task.labels.split(",").map((label, idx) => (
                      <Chip
                        key={idx}
                        label={label.trim()}
                        variant="outlined"
                        style={{ marginLeft: 4 }}
                      />
                    ))}
                  </Grid2>
                  <Grid2 item xs={6}>
                    <Chip
                      label={`${task.priority}`}
                      color={
                        task.priority === "High"
                          ? "error"
                          : task.priority === "Medium"
                          ? "warning"
                          : "success"
                      }
                    />
                  </Grid2>
                </Grid2>
              </ListItem>
            ))}
          </List>
        </div>
      )}

      {/* Display tasks for the current slot */}
      <h5 className="text-success">Tasks due soon</h5>
      {slotTasks.length > 0 ? (
        <List className="mt-4">
          {slotTasks.map((task, index) => (
            <ListItem key={index}>
              <Grid2 container spacing={2}>
                <Grid2 item xs={1}>
                  <Checkbox
                    checked={task.status === "completed"}
                    onChange={() => handleCurrentTaskCompletion(index)}
                    color={
                        task.priority === "High" ? "error" : task.priority === "Medium" ? "warning" : "success"
                    }
                  />
                </Grid2>
                <Grid2 item xs={5}>
                  <ListItemText
                    primary={task.name}
                    secondary={task.description}
                    style={{ textDecoration: task.status === "completed" ? "line-through" : "none" }}
                  />
                  <ListItemText primary={`Due: ${task.dueDate} at ${task.dueTime}`} />
                  <Chip label={task.category} color="primary" variant="outlined" />
                  {task.labels.split(",").map((label, idx) => (
                    <Chip
                      key={idx}
                      label={label.trim()}
                      variant="outlined"
                      style={{ marginLeft: 4 }}
                    />
                  ))}
                </Grid2>
                <Grid2 item xs={6}>
                  <Chip
                    label={`${task.priority}`}
                    color={
                      task.priority === "High"
                        ? "error"
                        : task.priority === "Medium"
                        ? "warning"
                        : "success"
                    }
                  />
                </Grid2>
              </Grid2>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No tasks for this time slot.</p>
      )}
    </div>
  );
};

const DesktopNotification = ({ onClick }) => {
    useEffect(() => {
      // Request permission for notifications
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
  
      // Schedule notifications at 10 AM, 2 PM, and 6 PM
      const notificationTimes = ["10:00", "14:39", "18:00"];
  
      const checkNotificationTime = () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
  
        if (notificationTimes.includes(currentTime)) {
          // Show notification
          const notification = new Notification("Check-in Time!", {
            body: "Click to open your check-in tasks.",
          });
  
          // When notification is clicked, trigger onClick function to open modal
          notification.onclick = () => {
            onClick();
          };
        }
      };
  
      // Set interval to check every minute for the notification times
      const interval = setInterval(checkNotificationTime, 30000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, [onClick]);
  
    return null; // This component only manages notifications, no UI output
  };
  
  const CheckInApp = () => {
    const [modalOpen, setModalOpen] = useState(false);
  
    const handleNotificationClick = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    return (
      <div>
        {/* Component that manages desktop notifications */}
        <DesktopNotification onClick={handleNotificationClick} />
  
        {/* Modal that shows the CheckInTodoList component */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <CheckInTodoList />
          </Box>
        </Modal>
      </div>
    );
  };
  
export default CheckInApp;
