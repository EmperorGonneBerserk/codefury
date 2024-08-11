# SANJEEVINI: Disaster Management App

**SANJEEVINI** is a comprehensive disaster management application designed to help users stay informed and safe during emergencies. It provides real-time disaster alerts, safety tips, critical updates, and the latest disaster news. The app features push notifications to keep users updated even when the app is running in the background.

## Features

- **Real-time Disaster Alerts:** Get notified about imminent disasters and emergency alerts.
- **Safety Tips:** Receive essential safety tips to prepare for and handle various emergencies.
- **Critical Updates:** Stay informed about critical updates related to disasters.
- **Latest Disaster News:** Access the latest news articles related to disasters and emergencies.
- **Push Notifications:** Get push notifications for new disaster news and updates even when the app is in the background.
- **Weather Updates:** View current weather conditions and forecasts for any city.

## Technologies Used

- **React Native:** Framework for building cross-platform mobile applications.
- **Expo:** Toolchain for developing and deploying React Native apps.
- **Axios:** HTTP client for making API requests.
- **Expo Notifications:** Library for handling push notifications.
- **AsyncStorage:** Persistent storage for storing app data.
- **Expo Background Fetch:** For fetching data in the background.

## Getting Started

To get started with SANJEEVINI, follow these instructions:

### Prerequisites

- Node.js (version 14 or later)
- Expo CLI
- An Expo account (for push notifications)

### Installation

1. **Clone the repository:**

   ```bash
# SANJEEVINI: Disaster Management App

**SANJEEVINI** is a comprehensive disaster management application designed to help users stay informed and safe during emergencies. It provides real-time disaster alerts, safety tips, critical updates, and the latest disaster news. The app features push notifications to keep users updated even when the app is running in the background.

## Features

- **Real-time Disaster Alerts:** Get notified about imminent disasters and emergency alerts.
- **Safety Tips:** Receive essential safety tips to prepare for and handle various emergencies.
- **Critical Updates:** Stay informed about critical updates related to disasters.
- **Latest Disaster News:** Access the latest news articles related to disasters and emergencies.
- **Push Notifications:** Get push notifications for new disaster news and updates even when the app is in the background.
- **Weather Updates:** View current weather conditions and forecasts for any city.

## Technologies Used

- **React Native:** Framework for building cross-platform mobile applications.
- **Expo:** Toolchain for developing and deploying React Native apps.
- **Axios:** HTTP client for making API requests.
- **Expo Notifications:** Library for handling push notifications.
- **AsyncStorage:** Persistent storage for storing app data.
- **Expo Background Fetch:** For fetching data in the background.

## Getting Started

To get started with SANJEEVINI, follow these instructions:

### Prerequisites

- Node.js (version 14 or later)
- Expo CLI
- An Expo account (for push notifications)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/sanjeevini.git
   cd sanjeevini

   cd sanjeevini
****
npm install
or yarn install
npm start
or 
yarn start
This will open Expo DevTools in your browser. From there, you can run the app on an iOS simulator, Android emulator, or your physical device.
### File Structure
App.js: Main entry point of the application, includes navigation setup.
HomeScreen.js: Displays disaster alerts, safety tips, critical updates, and disaster news. Includes background fetch for news updates.
WeatherUpdates.js: Allows users to search for weather updates by city.
BackgroundFetch.js: Handles background fetch tasks for checking new disaster news.
Notifications.js: Configures and handles push notifications.
### Code Details
<h1>App.js</h1>
Sets up navigation between the HomeScreen and WeatherUpdates components.
<h1>HomeScreen.js</h1>
Manages disaster alerts, safety tips, critical updates, and disaster news. Includes background fetch for news updates and push notifications setup.
<h1>WeatherUpdates.js</h1>
Allows users to fetch and view weather data for specified cities.
<h1>BackgroundFetch.js</h1>
Defines and registers a background fetch task to periodically check for new disaster news.
<h1>Notifications.js</h1>
Configures push notifications for new disaster news and handles user interactions with notifications.

### Configuration
<h1>API Keys</h1>
Replace a3056361ae624fdfb591257ab6106047 in the HomeScreen.js and BackgroundFetch.js files with your actual News API key.

<h1>Expo Push Token</h1>
The Expo push token is used for sending notifications. Ensure that you handle this token securely and use it in your notification setup.
<h1>Contributing</h1>
Feel free to open issues, submit pull requests, or suggest improvements. Contributions are welcome!

<h1>License</h1>
This project is licensed under the MIT License - see the LICENSE file for details.

For any questions or feedback, you can reach me at todinson255@gmail.com.


