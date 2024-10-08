import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../notification'; 

const WeatherUpdates = () => {
  const [city, setCity] = useState('New Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousWeatherData = useRef(null);

  const API_KEY = '9805dc161cb8c86a1d6a568156f8ab38';

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchWeatherData(city);
  }, []);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const newWeatherData = response.data;

      if (previousWeatherData.current) {
        checkForWeatherChange(previousWeatherData.current, newWeatherData);
      }

      setWeatherData(newWeatherData);
      previousWeatherData.current = newWeatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setError('Error fetching weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const checkForWeatherChange = (oldData, newData) => {
    // Simple example: Check if the temperature has changed
    if (oldData.main.temp !== newData.main.temp) {
      sendPushNotification(newData);
    }
  };

  const sendPushNotification = async (weatherData) => {
    const message = {
      to: (await Notifications.getExpoPushTokenAsync()).data,
      sound: 'default',
      title: 'Weather Update',
      body: `The temperature in ${weatherData.name} is now ${weatherData.main.temp}°C.,
      data: { weatherData }`,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const handleSearch = () => {
    fetchWeatherData(city);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button
        title="Search"
        onPress={handleSearch}
        color="#1976D2"
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" color="#1976D2" style={styles.loadingIndicator} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {weatherData && !loading && !error && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          <Text style={styles.weatherDescription}>
            {weatherData.weather[0].description}
          </Text>
          <View style={styles.weatherDetails}>
            <Text>Humidity: {weatherData.main.humidity}%</Text>
            <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text>Pressure: {weatherData.main.pressure} hPa</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  searchBox: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
    padding: 10,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 8,
    padding: 10,
  },
  weatherDescription: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#757575',
    marginBottom: 16,
    padding: 10,
  },
  weatherDetails: {
    marginTop: 20,
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    padding: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default WeatherUpdates;