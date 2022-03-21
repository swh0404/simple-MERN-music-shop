Version Info:

MongoDB version v4.4.5
nodejs version v16.3.0
jquery version v.3.6.0
react version v17.0.2
react-dom version v17.0.2
react-router-dom version v5.2.0
react-scripts version v4.0.3
express version v4.16.1
express-session version v1.17.1


How to start the app:

1.Move to file project

2.Start MongoDB database
	mongod --dbpath "path to project"/data

3.Move to file backend 
	cd backend
	npm install
	
4.Start the Web Server (runs on port 3001)
	npm start

5.Move to file frontend 
	cd frontend
	npm install
	
6.Start the frontend (runs on port 3000)
	npm start

5.Access to the app:
	The app runs on http://localhost:3000/


Files in the folder project:

1. The folder "frontend": The react frontend

2. The folder "backend": The express backend

3. The folder "data: The database

4. The file user.json: Stores the initial users data to be inserted into the database

5. The file music.json: Stores the initial music data to be inserted into the database






