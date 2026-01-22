# Testing Guide

This guide provides example JSON payloads and expected response codes for testing the API endpoints. You can use tools like Postman, Insomnia, or `curl` to send these requests.

## Prerequisites

1.  Ensure the application is running (`docker-compose up`).
2.  The API is accessible at `http://localhost:3000`.

## HTTP Response Codes

*   **200 OK**: The request was successful (e.g., for `GET`, `PATCH`).
*   **201 Created**: The resource was successfully created (e.g., for `POST`).
*   **204 No Content**: The request was successful, but there is no content to return (e.g., for `DELETE`).
*   **400 Bad Request**: The server cannot process the request due to a client error (e.g., invalid JSON, validation error).
*   **401 Unauthorized**: The request requires authentication, and the client is not authenticated (e.g., missing or invalid JWT).
*   **403 Forbidden**: The client is authenticated, but does not have permission to perform the requested action (e.g., a 'user' trying to create a comment).
*   **404 Not Found**: The requested resource could not be found.
*   **409 Conflict**: The request could not be completed due to a conflict with the current state of the target resource (e.g., username already exists).
*   **500 Internal Server Error**: A generic error message, given when an unexpected condition was encountered.

---

## 1. User Management

### Create a "User" (Can create tasks)
*   **Endpoint:** `POST /users`
*   **Success Response:** `201 Created`
*   **Error Responses:** `409 Conflict` (if username exists)
*   **Body:**
    ```json
    {
      "username": "testuser",
      "password": "password123",
      "role": "user"
    }
    ```
*Response:* Copy the `id` from the response.

### Create an "Author" (Can create comments)
*   **Endpoint:** `POST /users`
*   **Success Response:** `201 Created`
*   **Error Responses:** `409 Conflict` (if username exists)
*   **Body:**
    ```json
    {
      "username": "testauthor",
      "password": "password123",
      "role": "author"
    }
    ```
*Response:* Copy the `id` from the response.

### Login
*   **Endpoint:** `POST /auth/login`
*   **Success Response:** `201 Created`
*   **Error Responses:** `401 Unauthorized`
*   **Body:**
    ```json
    {
      "username": "<YOUR_USER_OR_AUTHOR_USERNAME>",
      "password": "password123"
    }
    ```
*Response:* Copy the `access_token` and `refresh_token`. You will need the `access_token` for the `Authorization` header (`Bearer <access_token>`) for protected endpoints.

### Refresh Token
*   **Endpoint:** `POST /auth/refresh`
*   **Success Response:** `201 Created`
*   **Error Responses:** `401 Unauthorized`
*   **Body:**
    ```json
    {
      "refreshToken": "<YOUR_REFRESH_TOKEN>"
    }
    ```
*Response:* New `access_token` and `refresh_token`.

### Update User
*   **Endpoint:** `PATCH /users/:id`
*   **Success Response:** `200 OK`
*   **Body:**
    ```json
    {
      "password": "newpassword123"
    }
    ```

---

## 2. Tasks (Requires "User" Role Token)

### Create a Task
*   **Endpoint:** `POST /tasks`
*   **Success Response:** `201 Created`
*   **Error Responses:** `401 Unauthorized`, `403 Forbidden`
*   **Headers:** `Authorization: Bearer <USER_ACCESS_TOKEN>`
*   **Body:**
    ```json
    {
      "description": "Fix the login bug on the homepage."
    }
    ```
*Response:* Copy the `id` (Task ID) for creating comments.

### Update a Task
*   **Endpoint:** `PATCH /tasks/:id`
*   **Success Response:** `200 OK`
*   **Error Responses:** `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
*   **Headers:** `Authorization: Bearer <USER_ACCESS_TOKEN>`
*   **Body:**
    ```json
    {
      "description": "Fix the login bug on the homepage (Urgent)."
    }
    ```

---

## 3. Comments (Requires "Author" Role Token)

### Create a Comment
*   **Endpoint:** `POST /comments`
*   **Success Response:** `201 Created`
*   **Error Responses:** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`
*   **Headers:** `Authorization: Bearer <AUTHOR_ACCESS_TOKEN>`
*   **Body:**
    ```json
    {
      "text": "I have started working on this.",
      "task_id": "<TASK_ID_FROM_PREVIOUS_STEP>"
    }
    ```

### Update a Comment
*   **Endpoint:** `PATCH /comments/:id`
*   **Success Response:** `200 OK`
*   **Error Responses:** `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
*   **Headers:** `Authorization: Bearer <AUTHOR_ACCESS_TOKEN>`
*   **Body:**
    ```json
    {
      "text": "I have started working on this. ETA: 2 hours."
    }
    ```

---

## 4. GET Requests (No Body)

*   **Get All Users:** `GET /users` -> `200 OK`
*   **Get User by ID:** `GET /users/:id` -> `200 OK` / `404 Not Found`
*   **Get All Tasks:** `GET /tasks` -> `200 OK`
*   **Get Task by ID:** `GET /tasks/:id` -> `200 OK` / `404 Not Found`
*   **Get Comments for a Task:** `GET /comments?task_id=<TASK_ID>` -> `200 OK`
*   **Get Comment by ID:** `GET /comments/:id` -> `200 OK` / `404 Not Found`

---

## 5. DELETE Requests (No Body)

*   **Delete User:** `DELETE /users/:id` -> `200 OK` / `404 Not Found`
*   **Delete Task:** `DELETE /tasks/:id` (Requires User Token) -> `200 OK` / `404 Not Found`
*   **Delete Comment:** `DELETE /comments/:id` (Requires Author Token) -> `200 OK` / `404 Not Found`
