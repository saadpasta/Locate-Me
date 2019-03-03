import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { RkText, RkButton, RkStyleSheet } from "react-native-ui-kitten";
import { Avatar } from "../components/avatar";
import img from "../assets/images/logo.png";
import { connect } from "react-redux";

class Profile extends Component {
  static navigationOptions = {
    title: "User Profile".toUpperCase()
  };
  constructor(props) {
    super(props);
    state = {
      user: {}
    };
  }


  mapView = () => {
    this.props.navigation.navigate("Map");
  };

  render() {
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={img} rkType="big" />
          <RkText rkType="header2">
            {this.props.auth.currentprofile.name}
          </RkText>
          <RkText rkType="header2">
            {this.props.auth.currentprofile.email}
          </RkText>
        </View>
        <View style={[styles.userInfo, styles.bordered]}>
          <View style={styles.section}>
            <RkText rkType="header3" style={styles.space}>
              12
            </RkText>
            <RkText rkType="secondary1 hintColor">Work Done</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType="header3" style={styles.space}>
              10
            </RkText>
            <RkText rkType="secondary1 hintColor">Stasfied Client</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType="header3" style={styles.space}>
              4.8
            </RkText>
            <RkText rkType="secondary1 hintColor">Rating</RkText>
          </View>
        </View>
        <View style={styles.buttons}>
          <RkButton
            style={styles.button}
            rkType="clear link"
            onPress={this.mapView}
          >
            HIRE ME
          </RkButton>
          <View style={styles.separator} />
          <RkButton style={styles.button} rkType="clear link">
            MESSAGE
          </RkButton>
        </View>
        <View style={{ alignItems: "center" }}>
          <RkText rkType="header1">Reviews</RkText>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#e5e5e5"
  },
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: "black"
  },
  section: {
    flex: 1,
    alignItems: "center"
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: "white",
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: "row",
    paddingVertical: 8
  },
  button: {
    flex: 1,
    alignSelf: "center"
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
    category: state.category
  };
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
