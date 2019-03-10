import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { RkText, RkButton, RkStyleSheet } from "react-native-ui-kitten";
import { FontIcons } from "../assets/icons";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";
import CategoryView from "./CategoryView";
import { GradientButton } from "../components/gradientButton";
import {
  Icon,
  Input,
  ListItem,
  Header,
  Avatar,
  Button
} from "react-native-elements";

const paddingValue = 8;

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      circles: []
    };
    const screenWidth = Dimensions.get("window").width;
    this.itemSize = {
      width: (screenWidth - paddingValue * 6) / 2,
      height: (screenWidth - paddingValue * 6) / 2
    };
  }
  goToCateogory = name => {
    const skill = name;
    console.log(skill);
    this.props.viewCateogry(skill);
  };
  componentWillMount() {
    const userId = this.props.auth.user.id;
    this.props.getCircles(userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.currentCircle) {
      this.props.navigation.navigate("Map");
    }
    if (nextProps.auth.yourCircles) {
      this.setState({
        circles: nextProps.auth.yourCircles
      });
    }
  }

  CreateCircle = () => {
    this.props.navigation.navigate("CreateCircle");
  };

  goToCircle = code => {
    this.props.currentCircle(code);
  };
  joinCircle = () => {
    this.props.navigation.navigate("JoinCircle");
  };
  render() {
    return (
      <View style={styles.root}>
        <Header
          key={123}
          backgroundColor="#ff6d20"
          leftComponent={
            <Icon
              onPress={() => this.props.navigation.openDrawer()}
              name="menu"
              size={30}
              color="#fff"
            />
          }
          centerComponent={{
            text: "Home",
            style: { fontSize: 20, fontWeight: "bold", color: "#fff" }
          }}
          rightComponent={
            <Avatar
              rounded
              size="medium"
              source={{
                uri: this.props.auth.user.picture
              }}
            />
          }
        /> 
        <ScrollView
          contentContainerStyle={styles.rootContainer}
          scrollEventThrottle={16}
        >
          {this.state.circles.map((v, i) => {
            return (
              <RkButton
                rkType="square shadow"
                style={{ ...this.itemSize }}
                key={i}
                onPress={() => this.goToCircle(v.code)}
              >
                <RkText style={styles.icon} rkType="primary moon xxlarge">
                  {FontIcons.article}
                </RkText>
                <RkText>{v.circleName}</RkText>
                <RkText>{v.code}</RkText>
              </RkButton>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
  },
  rootContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    backgroundColor: "#e5e5e5"
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
    currentCircle: code => {
      dispatch(authActions.currentCircle(code));
    },

    getCircles: userId => {
      dispatch(authActions.getcircles(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
