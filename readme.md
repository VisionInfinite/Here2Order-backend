# Here2Order Backend API Guide

## Base URL

```
http://localhost:3000
```

## Authentication

All routes under `/api` require JWT authentication.

### Signup

**Endpoint:** `POST /signup`

**Description:** Register a new user.

**Request Body:**

```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "number": "string"
}
```

**Response:**

```json
{
  "token": "JWT token"
}
```

### Login

**Endpoint:** `POST /login`

**Description:** Authenticate a user and get a JWT token.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "JWT token"
}
```

## Restaurant Routes

### Get Restaurant Info

**Endpoint:** `GET /api/info`

**Description:** Get information about the restaurant route.

**Response:**

```json
{
  "message": "Restaurant route"
}
```

### Get All Restaurants

**Endpoint:** `GET /api/restaurant`

**Description:** Retrieve a list of all restaurants.

**Response:**

```json
[
  {
    "id": "string",
    "name": "string",
    "address": "string",
    "phone": "string"
  }
]
```

### Create a Restaurant

**Endpoint:** `POST /api/restaurant`

**Description:** Create a new restaurant.

**Request Body:**

```json
{
  "name": "string",
  "table": "string",
  "address": "string",
  "phone": "string"
}
```

**Response:**

```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "phone": "string"
}
```

## Menu Routes

### Get Menu Items by ID

**Endpoint:** `GET /api/menu/:id`

**Description:** Retrieve menu items by restaurant ID.

**Parameters:**

-

id

(UUID): The ID of the restaurant.

**Response:**

```json
[
  {
    "id": "string",
    "name": "string",
    "category": "string",
    "description": "string",
    "image": "string",
    "price": "number"
  }
]
```

### Insert Menu Item by ID

**Endpoint:** `PUT /api/menu/:id`

**Description:** Insert a new menu item for a restaurant.

**Parameters:**

-

id

(UUID): The ID of the restaurant.

**Request Body:**

```json
{
  "name": "string",
  "category": "string",
  "description": "string",
  "image": "string",
  "price": "number"
}
```

**Response:**

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "description": "string",
  "image": "string",
  "price": "number"
}
```

### Delete Menu Item by ID

**Endpoint:** `DELETE /api/menu/:id`

**Description:** Delete a menu item by its ID.

**Parameters:**

-

id

(UUID): The ID of the menu item.

**Response:**

```json
{
  "message": "Menu item deleted"
}
```

## Environment Variables

Ensure the following environment variables are set in your

.env file:

```env
DATABASE_URL="your-database-url"
PORT=3000
JWT_SECRET="your-jwt-secret"
```

## Running the Server

To start the server, run:

```sh
npm run dev
```

This will start the server on `http://localhost:3000`.

For more details, refer to the source files:

```sh
server.ts
main.ts
user.ts
schema.prisma
```
