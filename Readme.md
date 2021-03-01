# Employee Manager Aplication

### Project Setup
- Download the code from the repository from the Git repository (https://github.com/JassNAIT/DMIT2008-employee-manager-app.git)
- Install node modules
- Install the required dependencies
- Instal ejs and express

### Other Tools Used for the App
- express-validator:
- https://www.npmjs.com/package/express-validator
- express-session :
- https://www.npmjs.com/package/express-session
- uuid :
- https://www.npmjs.com/package/uuid
- cors :
- https://www.npmjs.com/package/cors

### Registration
- Create a view for the home,registration,dashboard,login
- Set the routes in the server/index.js
- Post the data from the register form
- Validate the fields using express-validator
- create unique id for the user using uuid module
- Render to the login page after successfull registration
- Write the information into json file for the login authentication

### Login
- Post data from login form
- Authenticate email and password
- Display errors if user not exists
- Redirect to the dashboard after successfull login

### Dashboard
- Display dashboard after login
- Set routes on server/index.js

### Users
- Fetch the data from json file and display on Users view
- Display information such as username, email, password

### Live app link
- Link : https://jaswinder-employee-manager-app.herokuapp.com/



