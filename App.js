import React from "react";
import AppNavigator from "./navigator/appNavigator";
import { StyleSheet, Text, View } from "react-native";
import { bootstrap } from "./Config/bootstrap";
import { data } from "./data";
import { AppLoading, Font } from "expo";
import { Provider } from "react-redux";
import { configureStore } from "./redux/configureStore";

bootstrap();
data.populateData();

export default class App extends React.Component {
  state = {
    isLoaded: false
  };

  componentWillMount() {
    this.loadAssets();
  }
  loadAssets = async () => {
    await Font.loadAsync({
      fontawesome: require("./assets/fonts/fontawesome.ttf"),
      icomoon: require("./assets/fonts/icomoon.ttf"),
      "Righteous-Regular": require("./assets/fonts/Righteous-Regular.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf")
    });
    this.setState({ isLoaded: true });
  };
  render() {
    return (
      <Provider store={configureStore}>
        <View style={{ flex: 1 }}>
          {this.state.isLoaded ? <AppNavigator /> : <AppLoading />}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
