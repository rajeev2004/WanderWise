# WanderWise - Travel Agency Application

WanderWise is a comprehensive travel agency application that facilitates smooth trip management for both users and administrators. Users can explore and book packages, while administrators have additional control over managing package details and bookings.

## Features

### User Features:
1. **Authentication**: Users must register or log in to access the application.
2. **Explore Packages**: View detailed information about available travel packages.
3. **Book Packages**: Select and book desired travel packages.
4. **Manage Bookings**: Cancel bookings if necessary.
5. **Invoice Generation**: Basic invoice generation for each booking.

### Admin Features:
1. **User Functions**: Perform all actions available to users.
2. **Package Management**: Create, edit, or delete package details.
3. **View Bookings**: Access a list of all booked packages by users.
4. **Cancel Bookings**: Cancel any user's booking.

## Technologies Used

- **Frontend**: React.js for building the user interface.
- **Backend**: Node.js and Express.js for handling server-side logic.
- **Database**: PostgreSQL for storing user and package data.
- **Styling**: CSS for styling the application.
- **Libraries**: Axios for API communication, React Router for navigation.

## Link

- **Backend Repository**: https://github.com/rajeev2004/travel-agency-backend

## **Setup Instructions**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rajeev2004/travel-agency-backend.git
   cd travel-agency-backend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file and add the following environment variables: 
    ```bash
    PGHOST=pg_host
    PGPORT=pg_port
    PGUSER=pg_user
    PGPASSWORD=pg_password
    PGDATABASE=pg_database
    JWT_SECRET=your_secret_key

4. Start the backend server (ensure the database is set up):
    ```bash
    node server.js

### **Frontend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rajeev2004/WanderWise.git
   cd WanderWise

2. Install dependencies:
    ```bash
    npm install

3. Configure the backend URL in the frontend code (e.g., the backend constant in the Dashboard.jsx file).
    ```bash
    backend=http://localhost:5000

4. Start the frontend development server:
    ```bash
    npm run dev

5. Access the application at http://localhost:5173

## Demo

You can check out the live website [here](https://rajeev2004.github.io/WanderWise/).

![WanderWise Screenshot](https://github.com/rajeev2004/WanderWise/blob/main/src/assets/Screenshot%202025-01-01%20194816.png?raw=true)
