import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import the vector icon library

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Map from './screens/Map';
import IncidentReportingScreen from './screens/incidentreport';
import Rescue from './screens/rescue';
import AboutUsScreen from './screens/AboutUs';
import ContactUsScreen from './screens/ContactUsScreen';
import DisasterPreparednessGuideScreen from './screens/DisasterGuide';
import EmergencyContactScreen from './screens/EmergencyContact';
import ProfileScreen from './screens/ProfileScreen';
import SafetyCheckInScreen from './screens/SafetyCheckInScreen';
import WeatherUpdates from './screens/WeatherUpdates';
import ShelterManagement from './screens/sheltermanagement';
import SplashScreen from './splashscreen'; // Import the SplashScreen component

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Map':
            iconName = 'map';
            break;
          case 'Report Incident':
            iconName = 'alert';
            break;
          default:
            iconName = 'home';
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#1976D2',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
    <Tab.Screen options={{headerShown:false}} name="Map" component={Map} />
    <Tab.Screen options={{headerShown:false}} name="Report Incident" component={IncidentReportingScreen} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true,
      drawerStyle: {
        backgroundColor: '#fff',
        width: 240,
      },
      drawerLabelStyle: {
        fontSize: 16,
      },
    }}
    drawerContentOptions={{
      activeTintColor: '#1976D2',
      itemStyle: { marginVertical: 5 },
    }}
  >
    <Drawer.Screen name="Feed" component={BottomTabs} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="DisasterGuide" component={DisasterPreparednessGuideScreen} />
    <Drawer.Screen name="EmergencyContacts" component={EmergencyContactScreen} />
    <Drawer.Screen name="SafetyCheckin" component={SafetyCheckInScreen} />
    <Drawer.Screen name="Weather" component={WeatherUpdates} />
    <Drawer.Screen name='Shelter' component={ShelterManagement} />
    <Drawer.Screen name="Rescue" component={Rescue} />
    <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
    <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
