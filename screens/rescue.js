import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function DogWhistleApp() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Dog-whistle-sound-11.200-Hz.wav') // Replace this with your own whistle sound file
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/littlegirl.png')} style={styles.icon} />
      <Text style={styles.title}>Dog Whistle</Text>
      <Text style={styles.subtitle}>A Call to Find, A Signal to Rescue!</Text>
      
      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Text style={styles.buttonText}>Play Whistle</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={stopSound}>
        <Text style={styles.buttonText}>Stop Whistle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light cyan background
  },
  icon: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b', // Darker teal color for text
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#004d40', // Even darker teal color for subtitle
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00796b', // Matching the title color
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
