import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreenComponent = ({ navigation }) => {
  // Create an Animated Value for opacity, starting at 0 (completely transparent)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,           // Animate to opacity: 1 (fully visible)
        duration: 3000,       // Animation duration in ms (2 seconds)
        useNativeDriver: true // Better performance
      }
    ).start();
    
    // Navigate to Login after 3 seconds (after animation completes)
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Replace instead of navigate to prevent going back
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../../assets/logo.png')} 
        style={[
          styles.logo,
          {
            opacity: fadeAnim // Bind opacity to animated value
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf0e6', // Background color for splash screen
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
});

export default SplashScreenComponent;