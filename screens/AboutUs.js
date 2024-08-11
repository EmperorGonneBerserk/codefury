import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';

const AboutUsScreen = () => {
  const { width, height } = useWindowDimensions();

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingVertical: height * 0.05 }]}>
      <Image
        source={require('../assets/logo.png')} // Replace with your logo's path
        style={[styles.logo, { width: width * 0.7, height: width * 0.5 }]}
      />
      <Text style={[styles.welcomeText, { fontSize: width * 0.07 }]}>Welcome to SANJEEVINI!</Text>
      <Text style={[styles.introText, { fontSize: width * 0.05 }]}>
        Introducing our app, developed by Team Yashas, designed to symbolize hope and rescue.
      </Text>
      <Text style={[styles.appDescription, { fontSize: width * 0.045 }]}>
        SANJEEVINI is here to offer timely alerts for potential disasters like floods and landslides.
        The app provides notifications from local authorities and helps you locate nearby shelters.
      </Text>
      <Text style={[styles.appPurpose, { fontSize: width * 0.045 }]}>
        Our goal is to guide you through safety measures and ensure you have access to emergency contact information.
      </Text>
      <Text style={[styles.appFeatures, { fontSize: width * 0.045 }]}>
        By utilizing location data, SANJEEVINI predicts incidents globally and keeps you updated with the latest information.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light teal background for a calm feel
    paddingHorizontal: 16,
  },
  logo: {
    marginBottom: 20,
    borderRadius: 10, // Slight rounding of corners for logo
    overflow: 'hidden', // Ensures no overflow from the rounded corners
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#00796b', // Darker teal color for text
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 10, // Padding for better alignment
  },
  introText: {
    color: '#004d40', // Darker shade for introductory text
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10, // Padding for better alignment
  },
  appDescription: {
    color: '#004d40', // Consistent text color
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10, // Padding for better alignment
  },
  appPurpose: {
    color: '#004d40', // Consistent text color
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10, // Padding for better alignment
  },
  appFeatures: {
    color: '#004d40', // Consistent text color
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10, // Padding for better alignment
  },
});

export default AboutUsScreen;
