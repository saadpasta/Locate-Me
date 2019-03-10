import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from "react-native-ui-kitten";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";
import { GradientButton } from "../components/gradientButton";
import { SocialSetting } from "../components/socialSetting";
import { FontAwesome } from "../assets/icons";
import { Avatar } from "react-native-elements";
const paddingValue = 8;

class Profile extends Component {
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
    title: "Profile"
  };
  logout= () =>{
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }
  render()  {
    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard>
          <View style={styles.header}>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: this.props.auth.user.picture
              }}
            />
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="header6 primary">INFO</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Name"
                rkType="right clear"
                value={this.props.auth.user.name}
                onChangeText={this.onFirstNameInputChanged}
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Email"
                onChangeText={this.onEmailInputChanged}
                rkType="right clear"
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Country"
                onChangeText={this.onCountryInputChanged}
                rkType="right clear"
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Phone"
                onChangeText={this.onPhoneInputChanged}
                rkType="right clear"
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="primary header6">CHANGE PASSWORD</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Old Password"
                rkType="right clear"
                secureTextEntry
                onChangeText={this.onPasswordInputChanged}
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="New Password"
                rkType="right clear"
                secureTextEntry
                onChangeText={this.onNewPasswordInputChanged}
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Confirm Password"
                rkType="right clear"
                secureTextEntry
                onChangeText={this.onConfirmPasswordInputChanged}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="primary header6">CONNECT YOUR ACCOUNT</RkText>
            </View>
            <View style={styles.row}>
              <SocialSetting
                name="Twitter"
                icon={FontAwesome.twitter}
                tintColor={RkTheme.current.colors.twitter}
              />
            </View>
            <View style={styles.row}>
              <SocialSetting
                name="Google"
                icon={FontAwesome.google}
                tintColor={RkTheme.current.colors.google}
              />
            </View>
            <View style={styles.row}>
              <SocialSetting
                name="Facebook"
                icon={FontAwesome.facebook}
                tintColor={RkTheme.current.colors.facebook}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="primary header6">SUPPORT</RkText>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.rowButton}>
                <RkText rkType="header6">Help</RkText>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.rowButton}>
                <RkText rkType="header6">Privacy Policy</RkText>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.rowButton}>
                <RkText rkType="header6">Terms & Conditions</RkText>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.rowButton} onPress={this.logout}>
                <RkText rkType="header6">Logout</RkText>
              </TouchableOpacity>
            </View>
          </View>
          <GradientButton rkType="large" style={styles.button} text="SAVE" />
        </RkAvoidKeyboard>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  root: {
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 100
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e5e5",
    alignItems: "center"
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
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
    JoinCircle: (code, user, location) => {
      dispatch(authActions.JoinCircle(code, user, location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
