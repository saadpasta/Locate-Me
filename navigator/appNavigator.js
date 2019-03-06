import React from "react";
import { View, Image, Dimensions, Keyboard } from "react-native";
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";
import { FontAwesome } from "../assets/icons";
import { GradientButton } from "../components/gradientButton";
import { scaleModerate, scaleVertical } from "../utils/scale";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import Dashboard from "../Screens/Dashboard";
import SignUp from "../Screens/SignUp";
import CategoryViewScreen from "../Screens/CategoryView";
import Profile from "../Screens/counselorProfile";
import MapScreen from "../Screens/MapView";
import OrderConfirm from "../Screens/OrderConfirm";
import CreateCircle from "../Screens/CreateCircle";
import CircleInvite from "../Screens/CircleInvite";
import JoinCircle from "../Screens/JoinCircle";
import { createStackNavigator, createAppContainer } from "react-navigation";

// import { createMaterialTopNavigator , createDrawerNavigator, createAppContainer} from 'react-navigation'

const stackNavigator = createStackNavigator({

  Login: {
    screen: LoginScreen
  },
  Map: {
    screen: MapScreen
  },
  JoinCircle: {
    screen: JoinCircle
  },
  CircleInvite: {
    screen: CircleInvite
  },
  CreateCircle: {
    screen: CreateCircle
  },
  Home: {
    screen: HomeScreen
  },
  Dashboard: {
    screen: Dashboard
  },
  Signup: {
    screen: SignUp
  },
  Category: {
    screen: CategoryViewScreen
  },
  CounselorProfile: {
    screen: Profile
  },

  OrderConfirm: {
    screen: OrderConfirm
  }
});

const AppNavigator = createAppContainer(stackNavigator);

export default AppNavigator;
