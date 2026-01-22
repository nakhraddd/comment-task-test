# Task Comments API

## Description
This is a REST API module for a CRM system that handles task comments. It is built using NestJS, TypeORM, PostgreSQL, and TypeScript.

## Launch Instructions

### Prerequisites
- Docker and Docker Compose

### Steps
1. Clone the repository.
2. Run `docker-compose up --build` to build and start the application and database.

The API will be available at `http://localhost:3000`.
Swagger documentation is available at `http://localhost:3000/api`.

## Reasons for Actions
- **NestJS**: Chosen for its modular architecture and TypeScript support, which fits the requirements.
- **TypeORM**: Used as the ORM to interact with PostgreSQL, providing a clean and easy-to-use API.
- **PostgreSQL**: The required database for the task.
- **Docker**: Used to containerize the application and database, ensuring consistent environments.
- **JWT**: Implemented for user authorization as per the requirements.
- **Swagger**: Added for API documentation to make it easier to test and understand the endpoints.

## Endpoints
- `POST /users`: Create a user
- `GET /users/:id`: List users by ID
- `GET /users/`: Get a list of all users
- `PATCH /users/:id`: Edit a user
- `DELETE /users/:id`: Delete a user
- `POST /auth/login`: Login to get JWT token
- `POST /comments`: Create a comment (Author only)
- `GET /comments?taskId=...`: Get comments for a task
- `PATCH /comments/:id`: Update a comment (Owner only)
- `DELETE /comments/:id`: Delete a comment (Owner only)

## Business Rules
- Only the user can edit or delete a comment.
- Comment text is required (1-1000 characters).
- Comments are returned sorted by date (newest first).
- Only the author can create a comment.
