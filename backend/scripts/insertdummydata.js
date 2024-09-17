const sqlite3 = require('sqlite3').verbose();

// Function to get tomorrow's date in 'YYYY-MM-DD' format
function getTomorrowsDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// Get tomorrow's date
const tomorrowDate = getTomorrowsDate();

// Connect to the SQLite database
const db = new sqlite3.Database('HackScheduler.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Insert dummy data
db.serialize(() => {
    // Insert into Users table
    db.run(`
        INSERT INTO Users (name, email, password_hash, gender, age, married, kids, occupation, location, role)
        VALUES 
        ('John Doe', 'john.doe@example.com', 'hashed_password_1', 'male', 30, 1, 0, 'Engineer', 'New York', 'user'),
        ('Jane Smith', 'jane.smith@example.com', 'hashed_password_2', 'female', 28, 0, 0, 'Designer', 'San Francisco', 'user')
    `, (err) => {
        if (err) {
            console.error("Error inserting into Users table:", err.message);
        } else {
            console.log("Dummy data inserted into Users table successfully");
        }
    });

    // Insert into UserPreferences table
    db.run(`
        INSERT INTO UserPreferences (user_id, work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end)
        VALUES 
        (1, '09:00', '17:00', 60, 'reading,swimming', '18:00', '07:00', '23:00', '07:00'),
        (2, '10:00', '18:00', 45, 'painting,running', '19:00', '06:00', '00:00', '08:00')
    `, (err) => {
        if (err) {
            console.error("Error inserting into UserPreferences table:", err.message);
        } else {
            console.log("Dummy data inserted into UserPreferences table successfully");
        }
    });

    // Insert into WorkLearningPlans table
    db.run(`
        INSERT INTO WorkLearningPlans (user_id, task_name, task_type, priority, duration, due_date)
        VALUES 
        (1, 'Complete project report', 'work', 'high', 120, '2023-10-15'),
        (2, 'Learn new design tool', 'learning', 'medium', 90, '2023-10-20')
    `, (err) => {
        if (err) {
            console.error("Error inserting into WorkLearningPlans table:", err.message);
        } else {
            console.log("Dummy data inserted into WorkLearningPlans table successfully");
        }
    });

    // Insert into Schedules table
    db.run(`
        INSERT INTO Schedules (user_id, name, description, due_date, category, priority, labels, start_time, end_time, status)
        VALUES 
        (1, 'Morning Run', 'Daily morning run', '${tomorrowDate}', 'hobby', 'medium', 'exercise,health', '06:00', '07:00', 'pending'),
        (2, 'Team Meeting', 'Weekly sync-up meeting', '${tomorrowDate}', 'work', 'high', 'meeting,work', '10:00', '11:00', 'pending'),
        (1, 'Code Review', 'Review team code submissions', '${tomorrowDate}', 'work', 'high', 'code,review', '11:00', '12:00', 'pending'),
        (1, 'Lunch Break', 'Lunch with colleagues', '${tomorrowDate}', 'break', 'medium', 'lunch,break', '12:00', '13:00', 'pending'),
        (1, 'Client Call', 'Call with client to discuss project', '${tomorrowDate}', 'work', 'high', 'call,client', '14:00', '15:00', 'pending'),
        (1, 'Gym', 'Workout session', '${tomorrowDate}', 'hobby', 'medium', 'workout,health', '18:00', '19:00', 'pending'),
        (1, 'Dinner', 'Dinner with family', '${tomorrowDate}', 'break', 'medium', 'dinner,family', '20:00', '21:00', 'pending'),
        (1, 'Reading', 'Read a book', '${tomorrowDate}', 'hobby', 'low', 'reading,relax', '21:00', '22:00', 'pending'),
        (2, 'Morning Yoga', 'Daily yoga session', '${tomorrowDate}', 'hobby', 'medium', 'yoga,health', '07:00', '08:00', 'pending'),
        (2, 'Design Workshop', 'Attend design workshop', '${tomorrowDate}', 'learning', 'high', 'workshop,design', '09:00', '11:00', 'pending'),
        (2, 'Lunch Break', 'Lunch with friends', '${tomorrowDate}', 'break', 'medium', 'lunch,break', '12:00', '13:00', 'pending'),
        (2, 'Project Work', 'Work on design project', '${tomorrowDate}', 'work', 'high', 'project,design', '13:00', '17:00', 'pending'),
        (2, 'Evening Run', 'Evening run in the park', '${tomorrowDate}', 'hobby', 'medium', 'run,health', '18:00', '19:00', 'pending'),
        (2, 'Dinner', 'Dinner with family', '${tomorrowDate}', 'break', 'medium', 'dinner,family', '20:00', '21:00', 'pending'),
        (2, 'Painting', 'Work on painting', '${tomorrowDate}', 'hobby', 'low', 'painting,relax', '21:00', '22:00', 'pending')
    `, (err) => {
        if (err) {
            console.error("Error inserting into Schedules table:", err.message);
        } else {
            console.log("Dummy data inserted into Schedules table successfully");
        }
    });

    // Insert into UserCheckIns table
    db.run(`
        INSERT INTO UserCheckIns (user_id, checkin_type, work_plan, health_plan, family_plan, checkin_date)
        VALUES 
        (1, 'weekly', 'Finish project', 'Run daily', 'Call parents', '2023-10-09'),
        (2, 'monthly', 'Learn new skills', 'Eat healthy', 'Visit family', '2023-10-01')
    `, (err) => {
        if (err) {
            console.error("Error inserting into UserCheckIns table:", err.message);
        } else {
            console.log("Dummy data inserted into UserCheckIns table successfully");
        }
    });

    // Close the database
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Database closed successfully');
        }
    });
});