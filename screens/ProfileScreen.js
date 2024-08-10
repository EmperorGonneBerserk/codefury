import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import Profilepic from './ProfilePic'; 

const Profile = () => {
  const { width, height } = useWindowDimensions(); 
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleProfileSubmit = () => {
   
    if (!name || !address || !mobileNumber || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

   
    Alert.alert('Profile Submitted',
                 `Name: ${name}\address: ${address}\nMobile Number: ${mobileNumber}\nEmail: ${email}`);  
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <Profilepic style={{ width: width * 0.5, height: width * 0.5 }} /> 
      <Text style={[styles.label, { width: width * 0.8 }]}>Name</Text>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={[styles.input, { width: width * 0.8 }]} 
      />

      <Text style={[styles.label, { width: width * 0.8 }]}>Address</Text>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={[styles.input, { width: width * 0.8 }]} 
      />

      <Text style={[styles.label, { width: width * 0.8 }]}>Mobile Number</Text>
      <TextInput
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        style={[styles.input, { width: width * 0.8 }]}
      />

      <Text style={[styles.label, { width: width * 0.8 }]}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { width: width * 0.8 }]} 
      />

      <Text style={[styles.label, { width: width * 0.8 }]}>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { width: width * 0.8 }]} 
      />

      <TouchableOpacity style={[styles.button, { width: width * 0.8 }]} onPress={handleProfileSubmit}>
        <Text style={styles.buttonText}>Add Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginVertical: 5,
    fontSize: 16,left:40,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    padding: 15,
    backgroundColor: '#1976D2',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
