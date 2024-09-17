const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('HackScheduler.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables
db.serialize(() => {
    // Create Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            gender TEXT CHECK(gender IN ('male', 'female', 'non-binary', 'other')) NOT NULL,
            age INTEGER,
            married BOOLEAN,
            kids BOOLEAN,
            occupation TEXT,
            location TEXT,
            role TEXT DEFAULT 'user' CHECK(role IN ('admin', 'user')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error("Error creating Users table:", err.message);
            } else {
                console.log("Users table created successfully");
            }
        });

    // Create Preferences table
    db.run(`
        CREATE TABLE IF NOT EXISTS UserPreferences (
            preference_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            work_hours_start TEXT,  -- Using TEXT to store TIME values
            work_hours_end TEXT,    -- Using TEXT to store TIME values
            preferred_break_length INTEGER,  -- in minutes
            hobbies TEXT,  -- A list of hobbies separated by commas
            preferred_learning_time TEXT,  -- Using TEXT to store TIME values
            preferred_workout_time TEXT,  -- Using TEXT to store TIME values
            sleep_schedule_start TEXT,  -- Using TEXT to store TIME values
            sleep_schedule_end TEXT,    -- Using TEXT to store TIME values
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.error("Error creating UserPreferences table:", err.message);
            } else {
                console.log("UserPreferences table created successfully");
            }
        });

    // Create WorkLearningPlans table
    db.run(`
        CREATE TABLE IF NOT EXISTS WorkLearningPlans (
            plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            task_name TEXT NOT NULL,
            task_type TEXT CHECK(task_type IN ('work', 'learning')) NOT NULL,
            priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high')),
            duration INTEGER,  -- in minutes
            due_date TEXT,  -- Using TEXT to store DATE values in ISO format (YYYY-MM-DD)
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.error("Error creating WorkLearningPlans table:", err.message);
            } else {
                console.log("WorkLearningPlans table created successfully");
            }
        });

    // Create Schedules table
    db.run(`
        CREATE TABLE IF NOT EXISTS Schedules (
        schedule_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT NOT NULL,  -- Task name
        description TEXT,  -- Task description
        due_date TEXT,  -- Due date of the task (stored as TEXT in ISO format)
        category TEXT CHECK(category IN ('work', 'learning', 'hobby', 'break', 'sleep')) NOT NULL,  -- Category of the task
        priority TEXT CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',  -- Task priority
        labels TEXT,  -- A comma-separated list of labels/tags
        start_time TEXT NOT NULL,  -- Task start time (stored as TEXT)
        end_time TEXT NOT NULL,    -- Task end time (stored as TEXT)
        status TEXT CHECK(status IN ('completed', 'partial', 'pending')) DEFAULT 'pending',  -- Task status
        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    )`, (err) => {
            if (err) {
                console.error("Error creating Schedules table:", err.message);
            } else {
                console.log("Schedules table created successfully");
            }
        });

    // Create Hobbies table
    db.run(`
        CREATE TABLE IF NOT EXISTS Hobbies (
            hobby_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            hobby_name TEXT NOT NULL,
            preferred_duration INTEGER,  -- in minutes per day
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.error("Error creating Hobbies table:", err.message);
            } else {
                console.log("Hobbies table created successfully");
            }
        });

    // Create UserCheckIns table
    db.run(`
        CREATE TABLE IF NOT EXISTS UserCheckIns (
            checkin_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            checkin_type TEXT CHECK(checkin_type IN ('weekly', 'monthly')) NOT NULL,
            work_plan TEXT,  -- User's work-related goals for the upcoming week/month
            health_plan TEXT,  -- User's health-related goals for the upcoming week/month
            family_plan TEXT,  -- User's family-related goals for the upcoming week/month
            checkin_date TEXT NOT NULL,  -- Using TEXT to store DATE values in ISO format (YYYY-MM-DD)
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.error("Error creating UserCheckIns table:", err.message);
            } else {
                console.log("UserCheckIns table created successfully");
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
