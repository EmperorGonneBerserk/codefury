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
      <Text style={[styles.welcomeText, { fontSize: width * 0.06 }]}>Hello everyone!</Text>
      <Text style={[styles.introText, { fontSize: width * 0.05 }]}>
        A great welcome to our project of app development by team Yashas.
      </Text>
      <Text style={[styles.appDescription, { fontSize: width * 0.045 }]}>
        I would like to introduce you to our new app called "SANJEEVINI," which
        symbolizes hope and rescue.
      </Text>
      <Text style={[styles.appPurpose, { fontSize: width * 0.045 }]}>
        The main intention of our app is to provide alerts in case of potential
        occurrences of floods, landslides, etc. It helps users receive
        notifications from local authorities and find nearby shelters. The app
        also guides users on safety measures to follow.
      </Text>
      <Text style={[styles.appFeatures, { fontSize: width * 0.045 }]}>
        With location access, "SANJEEVINI" can predict incidents worldwide,
        provide the latest updates, and offer emergency contacts for reaching
        out to those in need.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
  },
  logo: {
    marginBottom: 20,
  },
  welcomeText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  introText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  appDescription: {
    textAlign: 'center',
    marginBottom: 10,
  },
  appPurpose: {
    textAlign: 'center',
    marginBottom: 10,
  },
  appFeatures: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AboutUsScreen;
