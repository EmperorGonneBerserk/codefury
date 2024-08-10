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
  imagePicker: {
    padding: 10,
    backgroundColor: '#1976D2',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  incidentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  incidentLocation: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  incidentImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default IncidentReportingScreen;