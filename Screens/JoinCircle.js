import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from "react-native";
import {
  RkText,
  RkButton,
  RkStyleSheet,
  RkTextInput
} from "react-native-ui-kitten";
import { FontIcons } from "../assets/icons";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";
import CategoryView from "./CategoryView";
import { GradientButton } from "../components/gradientButton";
import { Permissions, Location, Marker, MapView } from "expo";

const paddingValue = 8;

class JoinCircle extends Component {
  static navigationOptions = {
    title: "Join a Circle"
  };
  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get("window").width;
    this.state = {
      code: "",
      location: {
        latitude: 24.9048714,
        longitude: 67.0782024
      }
    };
    this.itemSize = {
      width: (screenWidth - paddingValue * 6) / 2,
      height: (screenWidth - paddingValue * 6) / 2
    };
  }
  static navigationOptions = {
    title: "Create your circle"
  };

  JoinCircle = () => {
    let code = this.state.code;
    let user = this.props.auth.user;
    let location = this.state.location
    this.props.JoinCircle(code, user , location);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.currentCircle) {
      this.props.navigation.navigate("CircleInvite");
    }
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    console.warn(1);
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.warn(status);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      /*  this.setState({ location, condition: true }); */
      console.warn("current location===", location);
    }
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={{ alignItems: "center" }}>
          <RkText rkType="h3">Enter your circle code to enter</RkText>
          <RkTextInput
            rkType="rounded"
            placeholder="Enter Circle code"
            onChangeText={text => this.setState({ code: text })}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <RkButton onPress={this.JoinCircle}>Join</RkButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 8
  },
  rootContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  icon: {
    fontSize: 80,
    color: "#ff6d20",
    marginBottom: 16
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
    category: state.category
  };
}

const mapDispatchToProps = dispatch => {
  return {
    JoinCircle: (code, user ,location ) => {
      dispatch(authActions.JoinCircle(code, user ,location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinCircle);
