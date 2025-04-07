import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

export default function HealthModel() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    };
    checkPermissions();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    if (!imageUri) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('http://172.16.65.127:5000/diagnoseHealth', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.diagnosis);
    } catch (error) {
      alert('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPhoto(null);
    setPrediction(null);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setIsCameraOpen(false);
      uploadImage(photo.uri);
    }
  };

  if (isCameraOpen) {
    return (
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.cameraControls}>
          <TouchableOpacity onPress={() => setFacing((prev) => (prev === 'back' ? 'front' : 'back'))}>
            <Text style={styles.cameraText}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Text style={styles.cameraText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCameraOpen(false)}>
            <Text style={styles.cameraText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Health Diagnosis</Text>
        {image || photo ? (
          <Image source={{ uri: photo || image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.placeholderText}>No Image Selected</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={() => setIsCameraOpen(true)}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonDiagnose, loading && styles.disabledButton]}
          onPress={() => uploadImage(photo || image)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Diagnose'}</Text>
          {loading && <ActivityIndicator size="small" color="#fff" />}
        </TouchableOpacity>
        {prediction && <Text style={styles.result}>Prediction: {prediction}</Text>}
        <TouchableOpacity style={styles.buttonReset} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'top',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'Arial',
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'yellowgreen',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonDiagnose: {
    backgroundColor: 'lightblue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonReset: {
    backgroundColor: 'lightcoral',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'Arial',
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  result: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: "#007AFF", // iOS-like blue color for back button
    fontSize: 16,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  cameraText: {
    color: '#fff',
    fontSize: 16,
  },
});
