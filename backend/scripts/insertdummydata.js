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

                    // Insert schedules
                    const schedules = [
                        ['Morning Workout', 'Exercise routine', tomorrowDate, 'hobby', 'high', 'fitness', '07:00', '08:00', 'completed', 'openai'],
                        ['Breakfast', 'Healthy breakfast', tomorrowDate, 'break', 'medium', 'meal', '08:00', '08:30', 'completed', 'openai'],
                        ['Work on Project A', 'Development tasks', tomorrowDate, 'work', 'high', 'project', '09:00', '12:00', 'pending', 'openai'],
                        ['Lunch Break', 'Lunch with colleagues', tomorrowDate, 'break', 'medium', 'meal', '12:00', '13:00', 'pending', 'openai'],
                        ['Team Meeting', 'Discuss project progress', tomorrowDate, 'work', 'high', 'meeting', '13:00', '14:00', 'pending', 'openai'],
                        ['Work on Project B', 'Development tasks', tomorrowDate, 'work', 'medium', 'project', '14:00', '17:00', 'pending', 'openai'],
                        ['Evening Walk', 'Relaxing walk in the park', tomorrowDate, 'hobby', 'low', 'fitness', '17:00', '18:00', 'pending', 'openai'],
                        ['Dinner', 'Dinner with family', tomorrowDate, 'break', 'medium', 'meal', '18:00', '19:00', 'pending', 'openai'],
                        ['Reading', 'Read a book', tomorrowDate, 'hobby', 'low', 'leisure', '19:00', '20:00', 'pending', 'openai'],
                        ['Sleep', 'Night sleep', tomorrowDate, 'sleep', 'high', 'rest', '23:00', '07:00', 'pending', 'openai']
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
});