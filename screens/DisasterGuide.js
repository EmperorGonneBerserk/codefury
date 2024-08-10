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
              - {tip}
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
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#1976D2',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
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
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#1976D2',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DisasterPreparednessGuideScreen;