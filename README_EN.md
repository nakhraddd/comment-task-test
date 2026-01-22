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
- **Clean Architecture**: The project is structured using Clean Architecture principles to separate concerns, making the codebase more maintainable, testable, and scalable. The core business logic is isolated from external frameworks and libraries.
- **Repository Pattern**: Used to decouple the business logic from the data access layer. This allows for easier swapping of data sources and better unit testing of the service layer.
- **Dependency Injection**: Utilized throughout the application to manage dependencies, promoting loose coupling and easier testing.
- **DTOs (Data Transfer Objects)**: Implemented to define the shape of data being sent over the network and to perform validation using `class-validator`, ensuring data integrity before it reaches the business logic.
- **JWT Strategy**: Employed for secure stateless authentication. A refresh token mechanism is also implemented to enhance security and user experience.
- **SOLID Principles**: Applied to ensure that classes and modules have single responsibilities, are open for extension but closed for modification, and depend on abstractions rather than concretions.

## Endpoints
- `POST /users`: Create a user
- `GET /users/:id`: List users by ID
- `GET /users/`: Get a list of all users
- `PATCH /users/:id`: Edit a user
- `DELETE /users/:id`: Delete a user
- `POST /auth/login`: Login to get JWT token
- `POST /tasks`: Create a task (User only)
- `GET /tasks`: Get a list of all tasks
- `GET /tasks/:id`: Get a task by ID
- `PATCH /tasks/:id`: Edit a task (Owner only)
- `DELETE /tasks/:id`: Delete a task (Owner only)
- `POST /comments`: Create a comment (Author only)
- `GET /comments?task_id=...`: Get comments for a task
- `GET /comments/:id`: Get a comment by ID
- `PATCH /comments/:id`: Update a comment (Owner only)
- `DELETE /comments/:id`: Delete a comment (Owner only)

## Business Rules
- Only the user can edit or delete a comment.
- Comment text is required (1-1000 characters).
- Comments are returned sorted by date (newest first).
- Only the author can create a comment.
- Only the user can create a task.
- Only the user of a task can edit or delete it.
- Tasks are returned sorted by date (newest first).
- Each task can have multiple comments, and a comment can only be linked to one task.
