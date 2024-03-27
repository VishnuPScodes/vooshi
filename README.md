# Project Name

## Description

This project is a Node.js application built with TypeScript, designed to provide user authentication and user management features. It leverages Express.js for handling HTTP requests and responses, along with various middleware and validators to ensure security and data integrity.

## Features

- User registration with validation for password, email, username, profile status, and phone number.
- User login with validation for password and email.
- User profile updates for authorized users.
- Admin-only API endpoints for managing users.
- Integration with Google OAuth for authentication.
- Password hashing for enhanced security.
- Use of JWT (JSON Web Tokens) for authentication and authorization.
- Express Validator for input validation.
- Built-in error handling and response formatting.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VishnuPScodes/vooshi.git

2. Navigate to the project directory:

   ```bash
   cd vooshi
   
3. Install dependencies:
   
   ```bash
   npm i
   
4. Start the application:
   
   ```bash
   nodemon index.ts

## API Endpoints

- **GET** `/auth/profile/update/:userId`: Retrieve user profile information.
  
    By using the userId , user can get his informations .
  
    Only logged in user can access the api
  
- **POST** `/auth/register`: Register a new user.
  
   User can register them with this api .
  
   Using express-validators to make sure the body has -strong password,email,userName,phoneNumber and profileStatus(private or public)
  
   Token will be generated and send after registration
  
- **POST** `/auth/login`: Log in with existing credentials.
  
   express-validator implemented to check body has -strong password and email
  
- **PATCH** `/auth/profile/update/:userId`: Update user information (authorized users only).
  
   user can edit his details
  
   user can upload profile picture
  
- **GET** `/users/admin/allUsers?isPrivate=true`: Get all public and private users (admin-only) ,if isPrivate query not added user will get only public users.
  
   only admin can access the API
  
   admin can get all users ie both privare abd public if the query , isPrivate=true is send
  
   if no query is send by default admin will get only the public users - this customization is added.
  
   pagination is added
  
- **GET** `/users/publicUsers`: Get all public users.
  
   pagination added
  
   only logged in user can access the API
  
- **GET** `/auth/google`: Initiate Google OAuth login and registration.
  
  social login
  
## Usage

- Use the provided API endpoints to register, login, and manage user details.
- Ensure proper authorization for accessing restricted endpoints.
- Validate input data according to the specified requirements.
   
   
