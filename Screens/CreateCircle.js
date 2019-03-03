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

const paddingValue = 8;

class CreateCircle extends Component {
  static navigationOptions = {
    title: "Create a Circle"
  };
  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get("window").width;
    this.state = {
      circleName: ""
    };
    this.itemSize = {
      width: (screenWidth - paddingValue * 6) / 2,
      height: (screenWidth - paddingValue * 6) / 2
    };
  }
  static navigationOptions = {
    title: "Create your circle"
  };

  CreateCircle = () => {
    let name = this.state.circleName;
    let code = Math.random()
      .toString(36)
      .substring(7);
    let user = this.props.auth.user;
    this.props.createCircle(name, code, user);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.currentCircle1) {
      this.props.navigation.navigate("CircleInvite");
    }
  }
  render() {
    return (
      <View style={styles.root}>
        <View style={{ alignItems: "center" }}>
          <RkText rkType="h3">Enter your circle name</RkText>
          <RkTextInput
            rkType="rounded"
            placeholder="Enter Circle Name"
            onChangeText={text => this.setState({ circleName: text })}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <RkButton rkType="dark" onPress={this.CreateCircle}>
            SUBMIT
          </RkButton>
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
    createCircle: (name, code, user) => {
      dispatch(authActions.createCircle(name, code, user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCircle);
