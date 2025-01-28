# User Management Dashboard

## Introduction
A simple web application where users can view, add, edit, and delete user details from a mock backend API.

## Features
This User Management Dashboard provides a comprehensive solution for managing users, offering essential CRUD (Create, Read, Update, Delete) operations. Below are the key features of the project:

- validation and error handling for API requests
- searching users with search bar
- A form allows adding new user and update existing user details. On submission, the data is sent to the mock backend API (JSONPlaceholder) via a POST/PUT request.
- Fully responsive layout optimized for mobile, tablet, and desktop devices.

## Deployed link
[link](https://user-mgt-dashboard-react-lokeshgannis-projects.vercel.app/)

## Installation or How to run the app
If you want to run our code then please read the instructions below :
- Clone our repository `https://github.com/Lokeshganni/user-mgt-dashboard-react.git`
- Open the code in your VS code or any text editor, open project folder in the terminal by running `cd user-management-dashboard`
- Now run `npm install` or `npm i` which will install all the required packages of node
- After installation, now run `npm start` and  you will see a new window will be opening in the default browser which is running on port `http://localhost:3000`
- Now you see app running, and the user management dashboard page should display.

## Usage
As there are some validations please follow this when using -
- On the homepage, a list of users is displayed with details such as ID, First Name, Last Name, Username, Email, and Phone Number.
- Use the search bar at the top of the page to find users by their First Name, Last Name or User Name.
- The search is case-insensitive and filters results dynamically as you type.
- Click the "Add User" button to open the form.
- Fill in the user's First Name, Last Name, Username, Email, and Phone.
- Click "Add User" to add the user. The data will be sent to the backend and added to the user list.
- Click the edit icon button next to a user's details to open the edit form.
- Update the desired fields and click "Update User" to apply changes.
- Click the Delete icon button next to a user's details to remove the user from the list.

## Technology Stack
List and provide a brief overview of the technologies used in the project.

- React JS
- HTML
- CSS

 ### Dependencies and packages

 - `react-router-dom`<br/>
  implementaion of dynamic routing 
 - `react-icons`<br/>
  to use icons in the UI
 - `jest` `@testing-library/react`<br/>
  for unit and integration testing













This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
