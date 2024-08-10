import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
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
      <Text style={styles.title}>Dog Whistle App</Text>
      <Button title="Play Whistle" onPress={playSound} />
      <Button title="Stop Whistle" onPress={stopSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
