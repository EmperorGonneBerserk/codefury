import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

const emergencyContacts = [
  { id: '1', name: 'Police', number: '100' },
  { id: '2', name: 'Fire', number: '101' },
  { id: '3', name: 'Ambulance', number: '102' },
  { id: '4', name: 'Disaster Management', number: '108' },
  { id: '5', name: 'Women Helpline', number: '1091' },
  { id: '6', name: 'Child Helpline', number: '1098' },
  { id: '7', name: 'National Emergency Number', number: '112' },
  { id: '8', name: 'Railway Enquiry', number: '139' },
];

const EmergencyContactScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Linking.openURL(`tel:${item.number}`)}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.number}>{item.number}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Contacts</Text>
      <FlatList
        data={emergencyContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0f7fa', // Light teal background for a calm feel
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796b', // Darker teal color for header
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3, // Slight elevation for a shadow effect
    shadowColor: '#000', // Shadow color for Android
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40', // Darker teal color for names
  },
  number: {
    fontSize: 16,
    color: '#1976D2', // Blue color for numbers
  },
});

export default EmergencyContactScreen;
