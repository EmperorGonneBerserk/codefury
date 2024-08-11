import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const ShelterManagement = () => {
  // States for registering shelters
  const [shelterName, setShelterName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  // States for finding shelters
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState({
    latitude: 28.6139,  // Default latitude for New Delhi
    longitude: 77.2090, // Default longitude for New Delhi
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Collapsible section states
  const [isRegisterOpen, setIsRegisterOpen] = useState(true);
  const [isFindOpen, setIsFindOpen] = useState(true);

  const handleRegister = async () => {
    if (!shelterName || !latitude || !longitude || !city || !country) {
      Alert.alert('Input Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Register the new shelter
      console.log({
        name: shelterName,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        city,
        country,
      });

      Alert.alert('Success', 'Shelter registered successfully.');
      // Optionally, clear the fields or perform additional actions here
    } catch (error) {
      console.error('Error registering shelter:', error.message);
      Alert.alert('Error', 'Error registering shelter. Please try again later.');
    }
  };

  const fetchShelters = async () => {
    if (!city || !country) {
      Alert.alert('Input Error', 'Please enter both city and country.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Geocoding: Convert city and country to coordinates
      const geocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&format=json&limit=1`
      );

      if (geocodeResponse.data.length === 0) {
        setError('Location not found. Please try a different city or country.');
        setLoading(false);
        return;
      }

      const location = geocodeResponse.data[0];
      const lat = parseFloat(location.lat);
      const lon = parseFloat(location.lon);

      setRegion({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Fetch shelters near the location
      const overpassQuery = `
        [out:json];
        node["amenity"="shelter"](around:5000,${lat},${lon});
        out body;
      `;
      const shelterResponse = await axios.post('https://overpass-api.de/api/interpreter', overpassQuery, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const shelterData = shelterResponse.data.elements.map((element) => ({
        id: element.id,
        name: element.tags.name || 'Unnamed Shelter',
        latitude: element.lat,
        longitude: element.lon,
      }));

      setShelters(shelterData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shelters:', error.message);
      setError('Error fetching shelters. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Register Shelter Section */}
      <TouchableOpacity onPress={() => setIsRegisterOpen(!isRegisterOpen)} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>{isRegisterOpen ? 'Collapse Register Shelter' : 'Expand Register Shelter'}</Text>
      </TouchableOpacity>
      {isRegisterOpen && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Register Shelter</Text>
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
          <Button title="Register Shelter" onPress={handleRegister} color="#28a745" />
        </View>
      )}

      {/* Find Shelters Section */}
      <TouchableOpacity onPress={() => setIsFindOpen(!isFindOpen)} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>{isFindOpen ? 'Collapse Find Shelters' : 'Expand Find Shelters'}</Text>
      </TouchableOpacity>
      {isFindOpen && (
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Find Shelters</Text>
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
          <Button title="Find Shelters" onPress={fetchShelters} color="#007bff" />
        </View>
      )}

      {loading && (
        <ActivityIndicator size="large" color="#1976D2" style={styles.loader} />
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <MapView style={styles.map} region={region}>
        {shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            coordinate={{
              latitude: shelter.latitude,
              longitude: shelter.longitude,
            }}
            title={shelter.name}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  map: {
    flex: 1,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  toggleButton: {
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default ShelterManagement;
