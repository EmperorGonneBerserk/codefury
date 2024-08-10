import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';

const RegisterShelter = () => {
  const [shelterName, setShelterName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleRegister = async () => {
    if (!shelterName || !latitude || !longitude || !city || !country) {
      Alert.alert('Input Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Post the new shelter to your database or an API endpoint
      // For demonstration, we'll log it to the console
      console.log({
        name: shelterName,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        city,
        country,
      });

      Alert.alert('Success', 'Shelter registered successfully.');
    } catch (error) {
      console.error('Error registering shelter:', error.message);
      Alert.alert('Error', 'Error registering shelter. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Shelter Name"
          value={shelterName}
          onChangeText={setShelterName}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <Button title="Register Shelter" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default RegisterShelter;