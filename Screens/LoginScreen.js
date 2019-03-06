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

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  loginWithFb = async () => {
    this.setState({ loading: true });
    try {
      // const db = firebase.firestore();
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync("408451776574589", {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`
        );
        const userObj = await response.json();
        console.log(userObj);
        const user = {
          id: userObj.id,
          name: userObj.name,
          picture: userObj.picture.data.url
        };
        this.props.loginFacebook(user);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
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

  onLoginButtonPressed = () => {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login(email, password);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user) {
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType="social">
            <RkText rkType="awesome hero accentColor">
              {FontAwesome.twitter}
            </RkText>
          </RkButton>
          <RkButton style={styles.button} rkType="social">
            <RkText rkType="awesome hero accentColor">
              {FontAwesome.google}
            </RkText>
          </RkButton>
          <RkButton
            style={styles.button}
            rkType="social"
            onPress={this.loginWithFb}
          >
            <RkText rkType="awesome hero accentColor">
              {FontAwesome.facebook}
            </RkText>
          </RkButton>
        </View>
        <RkTextInput
          rkType="rounded"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
        />
        <RkTextInput
          rkType="rounded"
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({ password: text })}
        />
        <GradientButton
          style={styles.save}
          rkType="large"
          onPress={this.onLoginButtonPressed}
          text="LOGIN"
        />
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType="primary3">Don’t have an account?</RkText>
            <RkButton rkType="clear">
              <RkText
                rkType="header6"
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                Sign up now
              </RkText>
            </RkButton>
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
    loginFacebook: user => {
      dispatch(authActions.loginFacebook(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
