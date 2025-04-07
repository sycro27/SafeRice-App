import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing icons for the bottom tab
import { TouchableOpacity } from 'react-native-gesture-handler';

// Import all components
import SplashScreenComponent from './components/Splash_Screen';
import Login from './components/Login';
import SignUp from './components/Signup';
import MainMenu from './components/Main_Menu';
import Health_Model from './components/Health_Model';
import Disease_Model from './components/Disease_Model';
import Rice_Classification_Model from './components/Rice_Classification_Model';
import WorkInProgress from './components/Work_In_Progress';
import Disease_Solutions from './components/Disease_Solutions';
import Profile from './components/Profile';
import EditProfile from './components/Edit_Profile';
import About from './components/About';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AboutStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Navigator (Includes MainMenu and Model Screens)
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="MainMenu">
      {/* Main Menu Screen */}
      <HomeStack.Screen
        name="MainMenu"
        component={MainMenu}
        options={{ headerShown: false }}
      />

      {/* Model Screens */}
      <HomeStack.Screen
        name="Health_Model"
        component={Health_Model}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          title: "Health Status",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="Disease_Model"
        component={Disease_Model}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          title: "Disease Check",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="Rice_Classification_Model"
        component={Rice_Classification_Model}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          title: "Rice Classification",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="Disease_Solutions"
        component={Disease_Solutions}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          title: "Disease Solutions",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}

// Profile Stack Navigator
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Edit Profile",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </ProfileStack.Navigator>
  );
}

// About Stack Navigator
function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
    </AboutStack.Navigator>
  );
}

// Bottom Tabs Navigator (Includes Home, Profile, and About)
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle-outline';
          } else if (route.name === 'About') {
            iconName = 'information-circle-outline';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'green', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        headerShown: false, // Hide header on tab screens
        tabBarStyle: {
          backgroundColor: 'lightblue',        
          borderTopColor: 'lightblue',         
          height: 80,           
          position: 'absolute',  
          borderRadius: 15,           
        },
      })}
    >
      {/* Bottom Tabs Screens */}
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="About" component={AboutStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="SplashScreen">
        {/* Splash Screen */}
        <AuthStack.Screen
          name="SplashScreen"
          component={SplashScreenComponent}
          options={{ headerShown: false }}
        />

        {/* Login Screen */}
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* SignUp Screen */}
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        {/* Main App Flow */}
        <AuthStack.Screen
          name="MainApp"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}