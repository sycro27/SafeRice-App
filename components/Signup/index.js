import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { BlurView } from "expo-blur";

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://172.16.65.127:5001/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      });
      console.log(response.data);

      if (response.data.success) {
        Alert.alert("Signup Successful", "You can now log in");
        navigation.navigate("Login");
      } else {
        Alert.alert("Signup Failed", response.data.message);
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert("Error", error.response.data.message || "There was an error during signup");
      } else {
        Alert.alert("Error", "There was an error during signup");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
      >

        <Text style={styles.title}>Sign Up</Text>

        {/* First Name input */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#ddd"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name input */}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#ddd"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Username input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ddd"
          value={username}
          onChangeText={setUsername}
        />

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Confirm Password input */}
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Navigation link to Login screen */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "black",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "80%",
    paddingVertical: 12,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 16,
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center",
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
    backgroundColor: "yellowgreen",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    marginTop: 10,
    color: "#00796B",
    textAlign: "center",
  },
});

export default SignUp;
