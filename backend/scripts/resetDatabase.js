const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('../HackScheduler.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
});

// Drop tables
db.serialize(() => {
    const tables = ['Users', 'UserPreferences', 'Schedules', 'UserWeeklyCheckIns'];

    tables.forEach((table) => {
        db.run(`DROP TABLE IF EXISTS ${table}`, (err) => {
            if (err) {
                console.error(`Error dropping ${table} table:`, err.message);
            } else {
                console.log(`${table} table dropped successfully`);
            }
        });
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