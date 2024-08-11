import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';

const DisasterPreparednessGuideScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState([]);

  const disasterGuides = [
    {
      title: 'Earthquakes',
      tips: [
        'Secure heavy items (e.g., bookshelves, appliances) to walls.',
        'Create a family emergency plan with evacuation routes.',
        'Prepare an emergency kit with food, water, and medical supplies.',
        'Identify safe spots in each room (under sturdy furniture).',
      ],
      checklist: [
        'Secure large furniture to walls.',
        'Practice "Drop, Cover, and Hold On" drills.',
        'Stock up on emergency supplies for at least 72 hours.',
        'Know how to turn off utilities (gas, water, electricity).',
      ],
    },
    {
      title: 'Hurricanes',
      tips: [
        'Know your evacuation routes and nearest shelters.',
        'Board up windows and secure loose outdoor items.',
        'Stock up on emergency supplies, including water and non-perishable food.',
        'Keep important documents in a waterproof container.',
      ],
      checklist: [
        'Have a full tank of gas in your car.',
        'Charge all electronics and backup batteries.',
        'Prepare a go-bag with essential items.',
        'Review your insurance policies and know what’s covered.',
      ],
    },
    {
      title: 'Floods',
      tips: [
        'Move valuable items to higher levels of your home.',
        'Know the flood evacuation routes in your area.',
        'Avoid building in flood-prone areas.',
        'Keep your emergency kit in an accessible location.',
      ],
      checklist: [
        'Elevate electrical appliances and utilities.',
        'Seal basement walls with waterproofing compounds.',
        'Know how to shut off gas and electricity in an emergency.',
        'Keep copies of important documents in a waterproof bag.',
      ],
    },
    {
      title: 'Wildfires',
      tips: [
        'Create a defensible space around your home by clearing flammable vegetation.',
        'Know multiple evacuation routes.',
        'Have an emergency kit ready with essential supplies.',
        'Keep your home well-maintained and remove debris from gutters and roofs.',
      ],
      checklist: [
        'Clear leaves and debris from gutters and roof.',
        'Keep a fire extinguisher handy and ensure it’s operational.',
        'Pack an emergency kit with essentials for at least 3 days.',
        'Know your community’s emergency alert system.',
      ],
    },
  ];

  const openChecklist = (checklist) => {
    setSelectedChecklist(checklist);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Disaster Preparedness Guide</Text>
      {disasterGuides.map((guide, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionHeader}>{guide.title}</Text>
          {guide.tips.map((tip, idx) => (
            <Text key={idx} style={styles.sectionText}>
              • {tip}
            </Text>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={() => openChecklist(guide.checklist)}
          >
            <Text style={styles.buttonText}>View Checklist</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Checklist</Text>
            {selectedChecklist.map((item, idx) => (
              <Text key={idx} style={styles.modalText}>
                • {item}
              </Text>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0f7fa', // Light background color for a calming effect
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#004d40', // Darker teal color for header
  },
  section: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3, // Slight elevation for shadow effect
    shadowColor: '#000', // Shadow color for Android
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#00796b', // Darker teal color for section headers
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#004d40', // Darker teal color for tips
    marginBottom: 10,
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#00796b',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#00796b',
  },
  modalText: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 12,
    color: '#004d40',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00796b',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DisasterPreparednessGuideScreen;
