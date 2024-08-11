import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const IncidentReportingScreen = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [reportedIncidents, setReportedIncidents] = useState([]);
  const [showIncidents, setShowIncidents] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitReport = () => {
    if (!description || !location || !image) {
      Alert.alert('Please fill in all fields and attach an image.');
      return;
    }

    const newIncident = {
      id: Math.random().toString(),
      location,
      description,
      image,
    };

    setReportedIncidents((prevIncidents) => [...prevIncidents, newIncident]);

    setDescription('');
    setLocation('');
    setImage(null);

    Alert.alert('Incident reported successfully!');
  };

  const renderIncidentItem = ({ item }) => (
    <View style={styles.incidentCard}>
      <Text style={styles.incidentLocation}>{item.location}</Text>
      <Text>{item.description}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.incidentImage} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report an Incident</Text>

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the incident"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>
          {image ? 'Change Photo' : 'Attach Photo'}
        </Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Submit Report" onPress={submitReport} />
      <Button
        title={showIncidents ? "Hide Reported Incidents" : "Show Reported Incidents"}
        onPress={() => setShowIncidents(!showIncidents)}
        color="#1976D2"
      />

      {showIncidents && (
        <FlatList
          data={reportedIncidents}
          keyExtractor={(item) => item.id}
          renderItem={renderIncidentItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf2f8', // Light blue background for a calming effect
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1976D2', // Calming blue color
  },
  input: {
    height: 50,
    borderColor: '#b0bec5', // Lighter border color
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for a softer look
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  imagePicker: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#1976D2', // Match the primary color
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 20,
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  incidentCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  incidentLocation: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 10,
  },
  incidentImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default IncidentReportingScreen;