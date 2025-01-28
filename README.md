# CheckOutEat
Here's a README file for your project:

---

# DinePay

DinePay is a platform that simplifies the dining experience by allowing customers to easily order food and pay their bill through an app. The app includes features like sales dashboards, item management, and a message room, designed for restaurant staff and admins.

## Technologies Used

- **Frontend**: React, TypeScript (.tsx), Vite
- **Backend**: Node.js, Express.js
- **Database**: MySql 
- **Authentication**: Admin login (no backend authentication, frontend only)

## Features

- **Dashboard**: View today's sales, profits, and graphs displaying sales data.
- **Admin Room**: Create, read, update, and delete items in the restaurant menu.
- **Message Room**: A message area to communicate within the app (without using `socket.io`).
- **Login Page**: Simple admin login for accessing the admin room (not authenticated; frontend-only).

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm run dev
    ```

4. The frontend will be available at `http://localhost:3000`.

### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    node server.js
    ```

4. The backend will be available at `http://localhost:5000`.

## Usage

- **Admin Login**: Use the frontend login page to access the admin section (no authentication at the backend).
- **Dashboard**: View real-time sales and profit data in the dashboard.
- **CRUD Operations**: In the admin room, perform CRUD operations to manage restaurant menu items.
- **Message Room**: Send and receive messages through the message room.

## Notes

- The app does not include backend authentication for the admin login; it's a placeholder for testing purposes.
- The message room functionality is simple, with no real-time updates since `socket.io` is not implemented.
  
## Future Enhancements

- Implement backend authentication for the admin login.
- Add real-time functionality to the message room using `socket.io`.
- Enhance the dashboard with more analytics and reporting features.

---
