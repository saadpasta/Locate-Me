import React, { Component } from "react";
import { View, Image, Dimensions, Keyboard, StyleSheet } from "react-native";
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
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";

import { LoginUser } from "../Config/firebase";

class CircleInvite extends Component {
  static navigationOptions = {
    title: "Invite a New Member"
  };

  getThemeImageSource = theme =>
    theme.name === "light"
      ? require("../assets/images/backgroundLoginV1.png")
      : require("../assets/images/backgroundLoginV1DarkTheme.png");

  renderImage = () => {
    const screenSize = Dimensions.get("window");
    const imageSize = {
      width: screenSize.width,
      height: screenSize.height - scaleModerate(375, 1)
    };
    return (
      <Image
        style={[styles.image, imageSize]}
        source={this.getThemeImageSource(RkTheme.current)}
      />
    );
  };

  componentDidMount(){
      console.log('saadsaad',this.props.auth.currentCircle)
  }
  componentWillReceiveProps(nextProps) {
    /* if (nextProps.auth.user) {
      this.props.navigation.navigate("Home");
    } */
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        <View style={styles.buttons}>
          <View style={{ alignItems: "center" }}>
            <RkText rkType="primary1">
              Share this code with people people you want to join circle.
            </RkText>
            <RkText rkType="large" style={styles.text}>
              {this.props.auth.currentCircle1.code}
            </RkText>
          </View>
        </View>
        <GradientButton
          style={styles.save}
          rkType="large"
          onPress={this.onLoginButtonPressed}
          text="SEND"
        />
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType="primary3">
              Note:Share your code loud or send in a message
            </RkText>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {},
  screen: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    resizeMode: "cover",
    marginBottom: scaleVertical(10)
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: "center",
    flex: -1
  },
  footer: {
    /* justifyContent: "flex-end",
    flex: 1 */
  },
  buttons: {
    flexDirection: "row",
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: "center",
    flexDirection: "row"
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(authActions.login(email, password));
    },
    loginFacebook: () => {
      dispatch(authActions.loginFacebook());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CircleInvite);
