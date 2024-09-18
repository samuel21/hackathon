const sqlite3 = require('sqlite3').verbose();

// Get tomorrow's date
const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

const tomorrowDate = getTomorrowDate();

// Connect to the SQLite database
const db = new sqlite3.Database('../HackScheduler.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Insert dummy data
db.serialize(() => {
    // Insert a user
    db.run(`
        INSERT INTO Users (name, email, password_hash, gender, age, married, kids, occupation, location, role)
        VALUES ('John Doe', 'john.doe@example.com', 'hashed_password', 'male', 30, 0, 0, 'Software Engineer', 'New York', 'user')
    `, function(err) {
        if (err) {
            console.error("Error inserting user:", err.message);
        } else {
            const userId = this.lastID;
            console.log("User inserted successfully with user_id:", userId);

            // Insert user preferences
            db.run(`
                INSERT INTO UserPreferences (user_id, work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end)
                VALUES (${userId}, '09:00', '17:00', 60, 'reading, coding', '18:00', '07:00', '23:00', '07:00')
            `, (err) => {
                if (err) {
                    console.error("Error inserting user preferences:", err.message);
                } else {
                    console.log("User preferences inserted successfully");

                    // Insert work-related schedules
                    const schedules = [
                        ['Work on Project A', 'Development tasks', tomorrowDate, 'work', 'high', 'project', '09:00', '12:00', 'pending', 'openai'],
                        ['Team Meeting', 'Discuss project progress', tomorrowDate, 'work', 'high', 'meeting', '13:00', '14:00', 'pending', 'openai'],
                        ['Work on Project B', 'Development tasks', tomorrowDate, 'work', 'medium', 'project', '14:00', '17:00', 'pending', 'openai']
                    ];

                    const stmt = db.prepare(`
                        INSERT INTO Schedules (user_id, name, description, due_date, category, priority, labels, start_time, end_time, status, source)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `);

                    for (const schedule of schedules) {
                        stmt.run([userId, ...schedule], (err) => {
                            if (err) {
                                console.error("Error inserting schedule:", err.message);
                            }
                        });
                    }

                    stmt.finalize((err) => {
                        if (err) {
                            console.error("Error finalizing statement:", err.message);
                        } else {
                            console.log("Schedules inserted successfully");

                            // Insert user weekly check-ins
                            db.run(`
                                INSERT INTO UserWeeklyCheckIns (user_id, checkin_type, work_plan, health_plan, family_plan, checkin_date)
                                VALUES (${userId}, 'weekly', 'Complete Project A tasks', 'Maintain workout routine', 'Spend quality time with family', '${tomorrowDate}')
                            `, (err) => {
                                if (err) {
                                    console.error("Error inserting user weekly check-ins:", err.message);
                                } else {
                                    console.log("User weekly check-ins inserted successfully");

                                    // Insert meaningful dummy data into UserTodo table
                                    const todos = [
                                        [userId, 'Morning Exercise', tomorrowDate, 'health', 'high', 'daily'],
                                        [userId, 'Team Meeting', tomorrowDate, 'work', 'medium', 'weekly'],
                                        [userId, 'Grocery Shopping', tomorrowDate, 'personal', 'low', 'weekly'],
                                        [userId, 'Read a Book', tomorrowDate, 'hobby', 'medium', 'daily'],
                                        [userId, 'Doctor Appointment', tomorrowDate, 'health', 'high', 'none']
                                    ];

                                    const todoStmt = db.prepare(`
                                        INSERT INTO UserTodo (user_id, task_name, due_date, category, priority, recurrence)
                                        VALUES (?, ?, ?, ?, ?, ?)
                                    `);

                                    for (const todo of todos) {
                                        todoStmt.run(todo, (err) => {
                                            if (err) {
                                                console.error("Error inserting todo:", err.message);
                                            }
                                        });
                                    }

                                    todoStmt.finalize((err) => {
                                        if (err) {
                                            console.error("Error finalizing todo statement:", err.message);
                                        } else {
                                            console.log("UserTodo data inserted successfully");

                                            // Close the database
                                            db.close((err) => {
                                                if (err) {
                                                    console.error('Error closing the database:', err.message);
                                                } else {
                                                    console.log('Database closed successfully');
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});