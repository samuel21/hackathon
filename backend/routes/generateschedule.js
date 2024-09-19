const { AzureOpenAI } = require("openai");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("HackScheduler.db");

dotenv.config();

const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const callAzureOpenAI = async (messages) => {
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = "2023-03-15-preview";
  const deployment = "gpt-4o"; // This must match your deployment name

  const client = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
  });

  const result = await client.chat.completions.create({
    messages,
    max_tokens: 4000,
    temperature: 0.7,
    top_p: 0.05,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null,
  });

  return result.choices[0].message.content;
};

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    // Get user info from db
    const userInfoSql = `
      SELECT Users.gender, Users.age, Users.married, Users.kids, Users.occupation, Users.location, 
             UserPreferences.work_hours_start, UserPreferences.work_hours_end, 
             UserPreferences.preferred_break_length, UserPreferences.hobbies, 
             UserPreferences.preferred_learning_time, UserPreferences.preferred_workout_time, 
             UserPreferences.sleep_schedule_start, UserPreferences.sleep_schedule_end 
      FROM Users 
      JOIN UserPreferences ON Users.user_id = UserPreferences.user_id 
      WHERE Users.user_id = ?`;

    const user_info = (await executeQuery(userInfoSql, [user_id]))[0];
    console.log(user_info);

    // Get user's free slots
    const freeSlotsSql = `
      WITH UserSchedules AS (
          SELECT start_time, end_time 
          FROM Schedules 
          WHERE user_id = ? AND DATE(due_date) = DATE('now', '+1 day')
      )
      SELECT start_time, end_time 
      FROM UserSchedules
      ORDER BY start_time`;

    const scheduleRows = await executeQuery(freeSlotsSql, [user_id]);
    const freeSlots = [];
    let dayStartTime = user_info.sleep_schedule_end;
    let dayEndTime = user_info.sleep_schedule_start;

    scheduleRows.forEach((row) => {
      if (dayStartTime < row.start_time && row.start_time < dayEndTime) {
        freeSlots.push({ start: dayStartTime, end: row.start_time });
      }
      dayStartTime = row.end_time;
    });

    if (dayStartTime < dayEndTime) {
      freeSlots.push({ start: dayStartTime, end: dayEndTime });
    }

    console.log(
      "Free slots for the next date between 6 AM and 10 PM:",
      freeSlots
    );

    // Fetch tasks due in the next 7 days
    const tasksSql = `
      SELECT task_name, due_date, category, priority, recurrence, status 
      FROM UserTodo 
      WHERE user_id = ? AND DATE(due_date) BETWEEN DATE('now') AND DATE('now', '+7 days')
      ORDER BY due_date`;

    const tasks = await executeQuery(tasksSql, [user_id]);
    console.log("Tasks due in the next 7 days:", tasks);

    // Get user check-ins from the last 7 days
    const checkInsSql = `
      SELECT * FROM UserWeeklyCheckIns
      WHERE user_id = ? AND checkin_date >= date('now', '-7 days')`;

    const checkIns = await executeQuery(checkInsSql, [user_id]);
    console.log("Check-ins from the last 7 days:", checkIns);

    // Generate query on basis of the data fetched from database
    let query = await generateQuery(user_info, freeSlots, tasks, checkIns);
    console.log("Generated query:", query);

    const messages = [
      {
        role: "system",
        content:
          "You are an AI assistant that only responds with json output and helps manage daily and weekly schedules. Ensure work, personal tasks, health, and family time are balanced. Prioritize tasks and include breaks. Respond only in minified JSON with date, start time, end time, task name, and priority. Do not wrap the response with markdown or code blocks.",
      },
      { role: "user", content: query },
    ];

    const result = await callAzureOpenAI(messages);
    res.status(200).send(JSON.parse(result));
  } catch (err) {
    res.status(500).send(err);
  } finally {
    // Close the database
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Database closed successfully");
      }
    });
  }
});

const generateQuery = async (user_info, freeSlots, tasks, checkIns) => {
  let query =
    "Consolidate user info into a gpt query. User info: " +
    JSON.stringify(user_info) +
    "\n" +
    "free slots: " +
    JSON.stringify(freeSlots) +
    "\n" +
    "tasks: " +
    JSON.stringify(tasks) +
    "\n" +
    "check-ins: " +
    JSON.stringify(checkIns);

  const messages = [
    {
      role: "system",
      content:
        "You are an AI assistant that is given user's schedule, tasks and interest in json format. Your task is to understand the data summarise it using less tokens and keep it concise for a gpt to understand",
    },
    {
      role: "user",
      content: query,
    },
  ];

  return await callAzureOpenAI(messages);
};

module.exports = router;
