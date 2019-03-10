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
import MapScreen from "../Screens/MapView";
import OrderConfirm from "../Screens/OrderConfirm";
import CreateCircle from "../Screens/CreateCircle";
import CircleInvite from "../Screens/CircleInvite";
import JoinCircle from "../Screens/JoinCircle";
import Home from "../Screens/ViewCircles"
import Profile from "../Screens/Profile"
import { createStackNavigator, createAppContainer } from "react-navigation";

// import { createMaterialTopNavigator , createDrawerNavigator, createAppContainer} from 'react-navigation'

const stackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Main:{
    screen:HomeScreen
  },
  Home: {
    screen: Home
  },
  JoinCircle: {
    screen: JoinCircle
  },
  Map: {
    screen: MapScreen
  },
  CircleInvite: {
    screen: CircleInvite
  },
  CreateCircle: {
    screen: CreateCircle
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
  OrderConfirm: {
    screen: OrderConfirm
  },
  Profile:{
    screen:Profile
  }
});

const AppNavigator = createAppContainer(stackNavigator);

export default AppNavigator;
