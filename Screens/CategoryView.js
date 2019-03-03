import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Text,
  CheckBox,
  Alert,
  FlatList
} from "react-native";
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme,
  RkChoice,
  RkChoiceGroup
} from "react-native-ui-kitten";
import { FontAwesome } from "../assets/icons";
import { GradientButton } from "../components/gradientButton";
import { scaleModerate, scaleVertical } from "../utils/scale";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";
import { Avatar } from "../components/avatar";
import img from "../assets/images/logo.png";

class CategoryViewScreen extends Component {
  static navigationOptions = {
    title: "Cateogries".toUpperCase()
  };
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }
  renderHeaderLabel = () => (
    <RkText rkType="awesome">{FontAwesome.search}</RkText>
  );

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.currentprofile) {
      this.props.navigation.navigate("CounselorProfile");
    }
  }
  openProfile = currentProfile => {
    console.log(currentProfile);
    this.props.ViewProfile(currentProfile);
    /* this.props.navigation.navigate("CounselorProfile"); */
  };
  render() {
    return (
      <View style={styles.root} enableEmptySections>
        <View style={styles.searchContainer}>
          <RkTextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChange={this.onSearchInputChanged}
            label={this.renderHeaderLabel()}
            rkType="row"
            placeholder="Search"
          />
        </View>
        <View style={styles.separator} />

        {this.props.auth.data.map((v, i) => {
          return (
            <View>
              <TouchableOpacity onPress={() => this.openProfile(v)}>
                <View style={styles.container}>
                  <Avatar rkType="circle" style={styles.avatar} img={img} />
                  <RkText>{v.name}</RkText>
                </View>
                <View style={styles.separator} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#e5e5e5",
    flex: 1
  },
  searchContainer: {
    paddingTop: 16,
    backgroundColor: "#e5e5e5",
    padding: 10,
    height: 60,
    alignItems: "center",
    marginBottom: 16
  },
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "white"
  },
  avatar: {
    marginRight: 26
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "white"
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
    ViewProfile: data => {
      dispatch(authActions.ViewProfile(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryViewScreen);
