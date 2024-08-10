import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const SafetyCheckInScreen = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleCheckIn = () => {
    if (!name || !contact || !message) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    if (!location) {
      Alert.alert('Unable to get location.');
      return;
    }

    const locationMessage = `Location: ${location.coords.latitude}, ${location.coords.longitude}`;
    const fullMessage = `${message}\n\n${locationMessage}`;

    // Here you can handle the check-in logic, like sending a message or saving data
    console.log('Safety Check-in Reported:', { name, contact, message: fullMessage });

    // Reset the form
    setName('');
    setContact('');
    setMessage('');

    Alert.alert('Your safety check-in has been sent!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Safety Check-in</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Message (e.g., I'm safe)"
        value={message}
        onChangeText={setMessage}
        multiline={true}
        numberOfLines={4}
      />

      <Button title="Send Check-in" onPress={handleCheckIn} />
      
      {locationErrorMsg ? <Text style={styles.errorText}>{locationErrorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SafetyCheckInScreen;