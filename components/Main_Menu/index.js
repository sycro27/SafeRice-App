import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';

const MainMenu = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedUserId = await AsyncStorage.getItem('use_id');
        if (storedToken) setToken(storedToken);
        if (storedUserId) setUserId(storedUserId);
      } catch (error) {
        console.error('Error fetching token or userId:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUsername = async () => {
        try {
          setLoading(true);
          const response = await fetch('http://172.16.65.127:5001/getUsername', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.username) {
            setUsername(data.username);
          } else {
            Alert.alert('Error', data.message || 'Failed to fetch username');
          }
        } catch (error) {
          console.error('Error fetching username:', error);
          Alert.alert('Error', 'Failed to fetch username.');
        } finally {
          setLoading(false);
        }
      };
      fetchUsername();
    }
  }, [token]);

  const handleLogout = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID is not available.');
      return;
    }
    try {
      const response = await fetch('http://172.16.65.127:5001/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.success) {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('use_id');
        setUsername(null);
        setToken(null);
        setUserId(null);
        Alert.alert('Logged Out', 'You have been logged out.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Logout failed.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Menu options data structure with images and navigation targets
  const menuOptions = [
    {
      id: 1,
      title: 'Rice Classification',
      image: require('../../assets/ricegrain.png'),
      navigateTo: 'Rice_Classification_Model'
    },
    {
      id: 2,
      title: 'Check Plant Disease',
      image: require('../../assets/plantdisease.png'),
      navigateTo: 'Disease_Model'
    },
    {
      id: 3,
      title: 'Check Plant Health',
      image: require('../../assets/planthealth.png'),
      navigateTo: 'Health_Model'
    },
    {
      id: 4,
      title: 'Disease Solutions',
      image: require('../../assets/plantsolution.png'),
      navigateTo: 'Disease_Solutions'
    }
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
      >
        
        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF0000" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Welcome Message */}
        <Text style={styles.title}>Welcome, {username || 'User'}!</Text>

        {/* Grid Layout for Options */}
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            {/* Top Row - First 2 Options */}
            {menuOptions.slice(0, 2).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionBox}
                onPress={() => navigation.navigate(option.navigateTo)}
              >
                <Image source={option.image} style={styles.optionImage} />
                <Text style={styles.optionText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.row}>
            {/* Bottom Row - Last 2 Options */}
            {menuOptions.slice(2, 4).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionBox}
                onPress={() => navigation.navigate(option.navigateTo)}
              >
                <Image source={option.image} style={styles.optionImage} />
                <Text style={styles.optionText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  gridContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionBox: {
    backgroundColor: 'yellowgreen',
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    padding: 25,
    borderWidth: 2,
    borderColor: '#3B7A57',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 8,
  },
  optionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF0000',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default MainMenu;