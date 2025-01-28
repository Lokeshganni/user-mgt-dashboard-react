# User Management Dashboard

## Introduction
A simple web application where users can view, add, edit, and delete user details from a mock API.

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

## snaps of dashboard
![Image](https://github.com/user-attachments/assets/510435b5-4cf6-4045-8a40-8b4c97c22643)

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
