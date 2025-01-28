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
##ScreenShots
![shotk7](https://github.com/user-attachments/assets/b9a1105b-e1d3-42ac-a0a6-f6a7e179b64e)

![shotk6](https://github.com/user-attachments/assets/437b511c-745c-4c34-b7d1-77301839ca2d)

![shotk5](https://github.com/user-attachments/assets/21bbabf1-16cc-48f9-8384-dabeed380cf8)
![shotk4](https://github.com/user-attachments/assets/ad58b95c-b242-4f8a-b2a2-f7e1abee1c3c)
![shotk3](https://github.com/user-attachments/assets/cfde71b7-099![shotk2](https://github.com/user-attachments/assets/4ae633d0-c7e5-4de5-a8aa-c6d5a5f807d9)
2-4928-98bf-ac69b7dfec7b)

![shotk1](https://github.com/user-attachments/assets/94631042-53a1-4bb2-acd5-2088ec7895ad)

