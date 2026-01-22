# Руководство по тестированию

Это руководство содержит примеры `JSON` и ожидаемые коды ответов для тестирования `endpoints` `API`. Вы можете использовать такие инструменты, как `Postman`, `Insomnia` или `curl` для отправки этих запросов.

## Предварительные требования

1.  Убедитесь, что приложение запущено (`docker-compose up`).
2.  `API` доступен по адресу `http://localhost:3000`.

## Коды ответов `HTTP`

*   **200 OK**: Запрос выполнен успешно (например, для `GET`, `PATCH`).
*   **201 Created**: Ресурс был успешно создан (например, для `POST`).
*   **204 No Content**: Запрос выполнен успешно, но нет содержимого для возврата (например, для `DELETE`).
*   **400 Bad Request**: Сервер не может обработать запрос из-за ошибки клиента (например, неверный `JSON`, ошибка `validation`).
*   **401 Unauthorized**: Запрос требует `authentication`, а клиент не аутентифицирован (например, отсутствует или недействителен `JWT`).
*   **403 Forbidden**: Клиент аутентифицирован, но не имеет разрешения на выполнение запрошенного действия (например, `user` пытается создать `comment`).
*   **404 Not Found**: Запрошенный ресурс не найден.
*   **409 Conflict**: Запрос не может быть выполнен из-за конфликта с текущим состоянием целевого ресурса (например, `username` уже существует).
*   **500 Internal Server Error**: Общее сообщение об ошибке, выдаваемое при возникновении непредвиденного условия.

---

## 1. Управление `User`

### Создать `User` (может создавать `tasks`)
*   **Endpoint:** `POST /users`
*   **Успешный ответ:** `201 Created`
*   **Ответы об ошибках:** `409 Conflict` (если `username` существует)
*   **Тело запроса (`Body`):**
    ```json
    {
      "username": "testuser",
      "password": "password123",
      "role": "user"
    }
    ```
*Ответ:* Скопируйте `id` из ответа.

### Создать `Author` (может создавать `comments`)
*   **Endpoint:** `POST /users`
*   **Успешный ответ:** `201 Created`
*   **Ответы об ошибках:** `409 Conflict` (если `username` существует)
*   **Тело запроса (`Body`):**
    ```json
    {
      "username": "testauthor",
      "password": "password123",
      "role": "author"
    }
    ```
*Ответ:* Скопируйте `id` из ответа.

### Вход в систему (`Login`)
*   **Endpoint:** `POST /auth/login`
*   **Успешный ответ:** `201 Created`
*   **Ответы об ошибках:** `401 Unauthorized`
*   **Тело запроса (`Body`):**
    ```json
    {
      "username": "<ВАШ_USER_ИЛИ_AUTHOR_USERNAME>",
      "password": "password123"
    }
    ```
*Ответ:* Скопируйте `access_token` и `refresh_token`. Вам понадобится `access_token` для заголовка `Authorization` (`Bearer <access_token>`) для защищенных `endpoints`.

### Обновить `Token` (`Refresh Token`)
*   **Endpoint:** `POST /auth/refresh`
*   **Успешный ответ:** `201 Created`
*   **Ответы об ошибках:** `401 Unauthorized`
*   **Тело запроса (`Body`):**
    ```json
    {
      "refreshToken": "<ВАШ_REFRESH_TOKEN>"
    }
    ```
*Ответ:* Новый `access_token` и `refresh_token`.

### Обновить `User`
*   **Endpoint:** `PATCH /users/:id`
*   **Успешный ответ:** `200 OK`
*   **Тело запроса (`Body`):**
    ```json
    {
      "password": "newpassword123"
    }
    ```

---

## 2. `Tasks` (Требуется `Token` с ролью `User`)

### Создать `Task`
*   **Endpoint:** `POST /tasks`
*   **Успешный ответ:** `201 Created`
*   **Ответы об ошибках:** `401 Unauthorized`, `403 Forbidden`
*   **Заголовки (`Headers`):** `Authorization: Bearer <USER_ACCESS_TOKEN>`
*   **Тело запроса (`Body`):**
    ```json
    {
      "description": "Исправить ошибку входа на главной странице."
    }
    ```
*Ответ:* Скопируйте `id` (`Task ID`) для создания `comments`.

### Обновить `Task`
*   **Endpoint:** `PATCH /tasks/:id`
*   **Успешный ответ:** `200 OK`
*   **Ответы об ошибках:** `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
*   **Заголовки (`Headers`):** `Authorization: Bearer <USER_ACCESS_TOKEN>`
*   **Тело запроса (`Body`):**
    ```json
    {
      "description": "Исправить ошибку входа на главной странице (Срочно)."
    }
    ```

---

## 3. `Comments` (Требуется `Token` с ролью `Author`)

### Создать `Comment`
*   **Endpoint:** `POST /comments`
*   **Успешный ответ:** `201 Created`
*   **Ответы об ошибках:** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`
*   **Заголовки (`Headers`):** `Authorization: Bearer <AUTHOR_ACCESS_TOKEN>`
*   **Тело запроса (`Body`):**
    ```json
    {
      "text": "Я начал работать над этим.",
      "task_id": "<TASK_ID_ИЗ_ПРЕДЫДУЩЕГО_ШАГА>"
    }
    ```

### Обновить `Comment`
*   **Endpoint:** `PATCH /comments/:id`
*   **Успешный ответ:** `200 OK`
*   **Ответы об ошибках:** `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
*   **Заголовки (`Headers`):** `Authorization: Bearer <AUTHOR_ACCESS_TOKEN>`
*   **Тело запроса (`Body`):**
    ```json
    {
      "text": "Я начал работать над этим. ETA: 2 часа."
    }
    ```

---

## 4. `GET` запросы (без тела запроса)

*   **Получить всех `Users`:** `GET /users` -> `200 OK`
*   **Получить `User` по `ID`:** `GET /users/:id` -> `200 OK` / `404 Not Found`
*   **Получить все `Tasks`:** `GET /tasks` -> `200 OK`
*   **Получить `Task` по `ID`:** `GET /tasks/:id` -> `200 OK` / `404 Not Found`
*   **Получить `Comments` для `Task`:** `GET /comments?task_id=<TASK_ID>` -> `200 OK`
*   **Получить `Comment` по `ID`:** `GET /comments/:id` -> `200 OK` / `404 Not Found`

---

## 5. `DELETE` запросы (без тела запроса)

*   **Удалить `User`:** `DELETE /users/:id` -> `200 OK` / `404 Not Found`
*   **Удалить `Task`:** `DELETE /tasks/:id` (Требуется `Token` `User`) -> `200 OK` / `404 Not Found`
*   **Удалить `Comment`:** `DELETE /comments/:id` (Требуется `Token` `Author`) -> `200 OK` / `404 Not Found`
