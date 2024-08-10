import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const ShelterFinder = () => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState({
    latitude: 28.6139,  // Default latitude for New Delhi
    longitude: 77.2090, // Default longitude for New Delhi
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

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
      <View style={styles.searchContainer}>
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
        <Button title="Find Shelters" onPress={fetchShelters} />
      </View>

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
  searchContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
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
});

export default ShelterFinder;