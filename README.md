
# CryptoTracker
### CryptoTracker is a web application designed for traders and investors to track real-time cryptocurrency prices, store them in a database, and monitor the most trending coins of the day.

## Features:
Real-time Price Tracking: Users can track current prices of various cryptocurrencies without the need for an account.
Note-taking and Trend Analysis: To access features like adding notes or viewing the most trending prices, users are required to log in.

## Stack:
Frontend and Backend Division: The application is divided into frontend and backend components.
Frontend: Developed using React.js with Tailwind CSS.
Backend: Developed using Node.js, Express, and connected to a MySQL database.
HTTP Connection: Axios is utilized for handling HTTP connections.
Session Management: JWT tokens are employed to maintain user sessions.
Data Source: Cryptocurrency prices are fetched from the CoinGecko API and stored as a backup in JSON format to ensure data availability even in the absence of internet connection.

## Installation:
Clone the repository.
Navigate to the frontend and backend directories separately and install dependencies using npm install.
Set up the MySQL database and configure the connection in the backend.
Start the frontend and backend servers using npm start.

## Usage:
Access the application through the provided URL.
Explore current cryptocurrency prices without logging in.
Log in to access additional features like note-taking and trending prices.
Enjoy tracking your favorite cryptocurrencies!
