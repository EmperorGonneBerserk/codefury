import React, { useEffect, useState } from 'react';
import { View, Button, Alert, StyleSheet, ActivityIndicator, Linking, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';

export default function HomeScreen({ navigation }) {
  const [accelerometerData, setAccelerometerData] = useState({});
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndStartAccelerometer = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('Location permission status:', status);

        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('Location fetched:', location);
        setLocation(location);

        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        console.log('Region set:', newRegion);

        // Start the accelerometer
        const subscription = Accelerometer.addListener(data => {
          console.log('Accelerometer data:', data);
          setAccelerometerData(data);
          detectEmergency(data);
        });

        Accelerometer.setUpdateInterval(500); // Adjust as needed
        setLoading(false);

        return () => subscription && subscription.remove(); // Clean up the subscription
      } catch (error) {
        console.error('Error fetching location or starting sensors:', error);
        setLoading(false);
      }
    };

    fetchLocationAndStartAccelerometer();
  }, []);

  const detectEmergency = (data) => {
    const { x, y, z } = data;
    const acceleration = Math.sqrt(x * x + y * y + z * z);

    console.log('Calculated acceleration:', acceleration);

    if (acceleration > 1.5) {
      console.log('Emergency detected! Sending SOS...');
      sendSOS();
    }
  };

  const sendSOS = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      console.log('Location fetched for SOS:', location);

      if (!location) {
        Alert.alert('Location is not available. Unable to send SOS.');
        return;
      }

      const phoneNumber = '1234567890'; // Replace with the actual phone number
      const message = `SOS! I need help. My current location is: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;
      const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            Alert.alert('Error', 'SMS is not supported on this device.');
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('Error occurred', err));
    } catch (error) {
      console.error('Error fetching location for SOS:', error);
      Alert.alert('Error', 'Unable to fetch location for SOS.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <>
          {region && (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={region}
              showsUserLocation
              showsMyLocationButton
              showsTraffic
            >
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="You are here"
                  description="Current Location"
                />
              )}
            </MapView>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Send SOS" onPress={sendSOS} color="#dc3545" />
            <Button
              title="Go to Rescue"
              onPress={() => navigation.navigate('Rescue')}
              color="#007bff"
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light gray background for a calming effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
