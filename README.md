# Blood Donation Rest API

### Description

I Built REST API for the Public Blood Donation System. The user will be able to log in. Every authenticated user can request blood. Authenticate users can request to become a blood donor member. Users can update their own information. Admin can manage users,, blood requests, volunteer requests, and others.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication) (if applicable)
- [Endpoints](#endpoints)
- [Request Examples](#request-examples)
- [Response Examples](#request-and-response-examples)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

# Installation

```bash
   # Clone the repository
   git clone <repository-url>

   # Install dependencies
   npm install

   # Start the server
   yarn run dev

```

- .env

```js
   DB_NAME = your db name
   DB_URL = your db url
```

# Usage

Describe how to use your API, including any setup or configuration required. Provide examples of common use cases and any relevant code snippets.

# Endpoints

All of the Endpoints is here

- Create a new User
  - POST /api/v1/auth/register
- Login for use the rest api
  - POST /api/v1/auth/register

# Authentication

Explain any authentication mechanisms used in your API, such as API keys, JWT tokens, or OAuth. Include instructions on how to authenticate requests.

# Request and Response Examples

Provide detailed examples of request payloads and response payloads for each endpoint. Use code blocks or JSON examples to make it clear.

- Request

```json
   POST /api/v1/auth/register

   {
      "name": "john",
      "email": "john@gmail.com",
      "password": "test1122",
   }
```

- Response

```json
{
  "code": 210,
  "message": "User Created Successfull",
  "data": {
    "id": "kuytfcvswedgmnbghtyrcd",
    "name": "john",
    "email": "john@gmail.com",
    "password": "john@gmail.com"
  },
  "links": {
    "self": "/api/v1/auth/register",
    "login": "/api/v1/auth/login"
  }
}
```

# Error Handling

How i handle Error for my API. Below I have explained

- #### 400 Bad Request
  - The server cannot process the request due to client error or malformed request syntax.
  - Common scenarios: Invalid request parameters, missing required fields, or validation errors.

```js
   {
      code: 400,
      message: 'Bad Request',
      errros: [
         {
            field: 'email',
            message: 'email is not valid'
         }
      ]
   }
```

- #### 401 Unauthorized
  - The client is not authenticated and needs to provide valid credentials for access.
  - Common scenarios: Missing or invalid authentication credentials, expired or revoked tokens.

```js
   {
      code: 401,
      message: 'Unauthorized'
   }
```

- #### 403 Forbidden:
  - The client is authenticated, but does not have sufficient permissions to access the requested resource.
  - Common scenarios: Accessing restricted resources, performing unauthorized actions.

```js
   {
      code: 403,
      message: 'Permison Denied'
   }
```

- #### 404 Not Found:
  - The requested resource could not be found on the server.
  - Common scenarios: Non-existent endpoints, invalid resource identifiers..

```js
   {
      code: 404,
      message: 'Resource Not found'
   }
```

- #### 409 Conflict:
  - The server detected a conflict with the current state of the resource.
  - Common scenarios: Duplicated resource creation, conflicting updates.

```js
   {
      code: 409,
      message: 'Alread Exist'
   }
```

- #### 500 Internal Server Error:
  - An unexpected error occurred on the server, indicating a server-side issue.
  - Common scenarios: Unhandled exceptions, database errors, or infrastructure failures

```js
   {
      code: 500,
      message: 'Internal Server Error'
   }
```

# Testing

Provide instructions on how to test your API, including any test scripts, testing frameworks, or tools that should be used.

# Deployment

Explain how to deploy your API to a production environment. Include deployment scripts, server setup, and any other relevant information.

# License

Specify the license under which your API is distributed. Include a link to the license file if applicable.

```js
   This project is licensed under the Rayhan abdullah License - see the [LICENSE.md](LICENSE.md) file for details.
```
