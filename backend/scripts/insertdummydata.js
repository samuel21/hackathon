const sqlite3 = require("sqlite3").verbose();

// Get today's and tomorrow's dates
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const todayDate = getTodayDate();
const tomorrowDate = getTomorrowDate();

// Connect to the SQLite database
const db = new sqlite3.Database("./HackScheduler.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Insert dummy data
db.serialize(() => {
  // Insert a user
  db.run(
    `
        INSERT INTO Users (name, email, password_hash, gender, age, married, kids, occupation, location, role)
        VALUES ('John Doe', 'john.doe@example.com', 'hashed_password', 'male', 30, 0, 0, 'Software Engineer', 'New York', 'user')
    `,
    function (err) {
      if (err) {
        console.error("Error inserting user:", err.message);
      } else {
        const userId = this.lastID;
        console.log("User inserted successfully with user_id:", userId);

        // Insert user preferences
        db.run(
          `
                INSERT INTO UserPreferences (user_id, work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end)
                VALUES (${userId}, '09:00', '17:00', 60, 'reading, coding', '18:00', '07:00', '23:00', '07:00')
            `,
          (err) => {
            if (err) {
              console.error("Error inserting user preferences:", err.message);
            } else {
              console.log("User preferences inserted successfully");

              // Insert schedules for today with varying status values
              const todaySchedules = [
                [
                  "Work on Project A",
                  "Development tasks",
                  todayDate,
                  "work",
                  "high",
                  "project",
                  "09:00",
                  "12:00",
                  "completed",
                  "openai",
                ],
                [
                  "Team Meeting",
                  "Discuss project progress",
                  todayDate,
                  "work",
                  "high",
                  "meeting",
                  "13:00",
                  "14:00",
                  "partial",
                  "openai",
                ],
                [
                  "Work on Project B",
                  "Development tasks",
                  todayDate,
                  "work",
                  "medium",
                  "project",
                  "14:00",
                  "17:00",
                  "pending",
                  "openai",
                ],
                [
                  "Gym Workout",
                  "Cardio and strength training",
                  todayDate,
                  "break",
                  "high",
                  "exercise",
                  "07:00",
                  "08:00",
                  "completed",
                  "openai",
                ],
                [
                  "Family Dinner",
                  "Dinner with family",
                  todayDate,
                  "break",
                  "medium",
                  "family",
                  "19:00",
                  "20:00",
                  "pending",
                  "openai",
                ],
                [
                  "Read a Book",
                  "Reading 'Clean Code'",
                  todayDate,
                  "hobby",
                  "low",
                  "reading",
                  "20:00",
                  "21:00",
                  "partial",
                  "openai",
                ],
              ];

              // Insert schedules for tomorrow with status "pending"
              const tomorrowSchedules = [
                [
                  "Work on Project A",
                  "Development tasks",
                  tomorrowDate,
                  "work",
                  "high",
                  "project",
                  "09:00",
                  "12:00",
                  "pending",
                  "openai",
                ],
                [
                  "Team Meeting",
                  "Discuss project progress",
                  tomorrowDate,
                  "work",
                  "high",
                  "meeting",
                  "13:00",
                  "14:00",
                  "pending",
                  "openai",
                ],
                [
                  "Work on Project B",
                  "Development tasks",
                  tomorrowDate,
                  "work",
                  "medium",
                  "project",
                  "14:00",
                  "17:00",
                  "pending",
                  "openai",
                ],
              ];

              const stmt = db.prepare(`
                        INSERT INTO Schedules (user_id, name, description, due_date, category, priority, labels, start_time, end_time, status, source)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `);

              for (const schedule of todaySchedules) {
                stmt.run([userId, ...schedule], (err) => {
                  if (err) {
                    console.error(
                      "Error inserting today's schedule:",
                      err.message
                    );
                  }
                });
              }

              for (const schedule of tomorrowSchedules) {
                stmt.run([userId, ...schedule], (err) => {
                  if (err) {
                    console.error(
                      "Error inserting tomorrow's schedule:",
                      err.message
                    );
                  }
                });
              }

              stmt.finalize((err) => {
                if (err) {
                  console.error("Error finalizing statement:", err.message);
                } else {
                  console.log("Schedules inserted successfully");

                  // Insert user weekly check-ins
                  db.run(
                    `
                                INSERT INTO UserWeeklyCheckIns (user_id, checkin_type, work_plan, health_plan, family_plan, checkin_date)
                                VALUES (${userId}, 'weekly', 'Complete Project A tasks', 'Maintain workout routine', 'Spend quality time with family', '${todayDate}')
                            `,
                    (err) => {
                      if (err) {
                        console.error(
                          "Error inserting user weekly check-ins:",
                          err.message
                        );
                      } else {
                        console.log(
                          "User weekly check-ins inserted successfully"
                        );

                        // Insert meaningful dummy data into UserTodo table
                        const todos = [
                          [
                            userId,
                            "Morning Exercise",
                            todayDate,
                            "break",
                            "high",
                            "daily",
                            "pending",
                          ],
                          [
                            userId,
                            "Team Meeting",
                            todayDate,
                            "work",
                            "medium",
                            "weekly",
                            "pending",
                          ],
                          [
                            userId,
                            "Grocery Shopping",
                            todayDate,
                            "break",
                            "low",
                            "weekly",
                            "pending",
                          ],
                          [
                            userId,
                            "Read a Book",
                            todayDate,
                            "hobby",
                            "medium",
                            "daily",
                            "pending",
                          ],
                          [
                            userId,
                            "Doctor Appointment",
                            todayDate,
                            "break",
                            "high",
                            "none",
                            "pending",
                          ],
                        ];

                        const todoStmt = db.prepare(`
                                        INSERT INTO UserTodo (user_id, task_name, due_date, category, priority, recurrence, status)
                                        VALUES (?, ?, ?, ?, ?, ?, ?)
                                    `);

                        for (const todo of todos) {
                          todoStmt.run(todo, (err) => {
                            if (err) {
                              console.error(
                                "Error inserting todo:",
                                err.message
                              );
                            }
                          });
                        }

                        todoStmt.finalize((err) => {
                          if (err) {
                            console.error(
                              "Error finalizing todo statement:",
                              err.message
                            );
                          } else {
                            console.log("UserTodo data inserted successfully");

                            // Close the database
                            db.close((err) => {
                              if (err) {
                                console.error(
                                  "Error closing the database:",
                                  err.message
                                );
                              } else {
                                console.log("Database closed successfully");
                              }
                            });
                          }
                        });
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
});
