<Text>SANJEEVINI: Disaster Management App
SANJEEVINI is a comprehensive disaster management application designed to help users stay informed and safe during emergencies. It provides real-time disaster alerts, safety tips, critical updates, and the latest disaster news. The app features push notifications to keep users updated even when the app is running in the background.

Features
Real-time Disaster Alerts: Get notified about imminent disasters and emergency alerts.
Safety Tips: Receive essential safety tips to prepare for and handle various emergencies.
Critical Updates: Stay informed about critical updates related to disasters.
Latest Disaster News: Access the latest news articles related to disasters and emergencies.
Push Notifications: Get push notifications for new disaster news and updates even when the app is in the background.
Weather Updates: View current weather conditions and forecasts for any city.
Technologies Used
React Native: Framework for building cross-platform mobile applications.
Expo: Toolchain for developing and deploying React Native apps.
Axios: HTTP client for making API requests.
Expo Notifications: Library for handling push notifications.
AsyncStorage: Persistent storage for storing app data.
Expo Background Fetch: For fetching data in the background.
Getting Started
To get started with SANJEEVINI, follow these instructions:

Prerequisites
Node.js (version 14 or later)
Expo CLI
An Expo account (for push notifications)
Installation
Clone the repository:

bash
Copy code
https://github.com/EmperorGonneBerserk/codefury/tree/main
cd sanjeevini
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open the app in Expo Go:

Scan the QR code displayed in the terminal with the Expo Go app on your mobile device.

Usage
Home Screen: Displays disaster alerts, safety tips, critical updates, and the latest news.
Weather Updates Screen: Shows current weather conditions and forecasts.
Background Notifications: Receives notifications for new disaster news even when the app is in the background.
Background Tasks
The app uses background tasks to periodically fetch and notify users about the latest disaster news. The BackgroundNewsTask.js file handles background fetch and push notifications.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Fork the repository
Create a new branch (git checkout -b feature/YourFeature)
Make your changes
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature/YourFeature)
Create a new Pull Request
Acknowledgements
React Native
Expo
Axios
Expo Notifications
Expo Background Fetch



</Text>
