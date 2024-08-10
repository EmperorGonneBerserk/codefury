import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SplashScreen = () => {
  const navigation = useNavigation();
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.5); // Initial scale value
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 2,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          if (user) {
            navigation.replace('DrawerNavigator');
          } else {
            navigation.replace('Login');
          }
        }, 1000);
      });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity, transform: [{ scale }] }}>
        <Image
          source={require('./assets/logo.png')}
          style={[styles.logo, { width: width * 0.7, height: width * 0.5 }]}
        />
        <Text style={styles.logoText}>Disaster Management App</Text>
      </Animated.View>
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default SplashScreen;
