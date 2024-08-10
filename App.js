import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Map from './screens/Map';
import IncidentReportingScreen from './screens/incidentreport';
import Rescue from './screens/rescue';
import ShelterFinder from './screens/shelterfinder';
import RegisterShelter from './screens/shelterregister';
import AboutUsScreen from './screens/AboutUs';
import ContactUsScreen from './screens/ContactUsScreen';
import DisasterPreparednessGuideScreen from './screens/DisasterGuide';
import EmergencyContactScreen from './screens/EmergencyContact';
import ProfileScreen from './screens/ProfileScreen';
import SafetyCheckInScreen from './screens/SafetyCheckInScreen';
import WeatherUpdates from './screens/WeatherUpdates';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator for the main screens
function MainTabs() {
  const phide = false;
  return (
    <Tab.Navigator>
      {phide && (
        <Tab.Screen name="Rescue" component={Rescue} />
      )}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Report Incident" component={IncidentReportingScreen} />
    </Tab.Navigator>
  );
}

// Drawer Navigator including MainTabs and Notifications
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={MainTabs} />
      <Drawer.Screen name="Shelters" component={ShelterFinder} />
      <Drawer.Screen name="Register" component={RegisterShelter} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen}/>
      <Drawer.Screen name="DisasterGuide" component={DisasterPreparednessGuideScreen} />
      <Drawer.Screen name= "EmergencyContacts" component={EmergencyContactScreen} />
      <Drawer.Screen name="SafetyCheckin" component={SafetyCheckInScreen} />
      <Drawer.Screen name="Weather" component={WeatherUpdates} />
    </Drawer.Navigator>
  );
}

// Main App component with Stack Navigator for Login and DrawerNavigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
