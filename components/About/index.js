import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const About = () => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}  // Path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>SafeRice is an all in one rice health based application that is created by: {'\n'}{'\n'}<Text style={styles.boldText}>21K-4874 Bilal Shakeel</Text>{'\n'}<Text style={styles.boldText}>21K-3316 Muhammad Taha Majeed</Text>{'\n'}<Text style={styles.boldText}>21K-3205 Muhammad Samamah</Text></Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',  // Ensures the image covers the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure content is above the background
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',  // White background with transparency
    padding: 15,
    borderRadius: 10,  // Rounded corners for the background
  },
  text: {
    fontSize: 20,
    color: '#333',  // Dark text for readability on the white background
  },

  boldText: {
    fontWeight: 'bold',
  },
});

export default About;
