# New generation smart calendar

For backend code:

1. Execute code from the `backend` folder only.
2. Obtain azure openapi endpoint and key to run the ai code. Also make sure to have some model deployed like 'gpt-4o`.
3. Populate the database if not already using refreshDB.cmd residing in the `backend` folder.
4. Run the backend APIs using `npm start` command.
5. Hit http://localhost:8080/generateschedule/1 in the browser and voila! :D


For frontend code:
1. Execute code from the `frontend` folder only.
2. Run `npm install` to install all the dependencies.
3. Run `npm start` to run the react server. It would automatically open browser on port `3000`.
