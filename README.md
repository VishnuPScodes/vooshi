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
   git clone <repository-url>

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
- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Log in with existing credentials.
- **PATCH** `/auth/profile/update/:userId`: Update user information (authorized users only).
- **GET** `/users/admin/allUsers?isPrivate=true`: Get all public and private users (admin-only).
- **GET** `/users/publicUsers`: Get all public users.
- **GET** `/auth/google`: Initiate Google OAuth login and registration.

## Usage

- Use the provided API endpoints to register, login, and manage users.
- Authenticate users using the Google OAuth endpoint.
- Ensure proper authorization for accessing restricted endpoints.
- Validate input data according to the specified requirements.
   
   
