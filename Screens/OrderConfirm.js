import React, { Component } from "react";
import { Permissions, Location, Marker, MapView } from "expo";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from "react-native";
import { GradientButton } from "../components/gradientButton";
import {
  RkCard,
  RkStyleSheet,
  RkText,
  RkTextInput,
  RkButton
} from "react-native-ui-kitten";
import { Avatar } from "../components/avatar";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";
import img from "../assets/images/logo.png";
import { FontAwesome } from "../assets/icons";
import { FontIcons } from "../assets/icons";

const paddingValue = 5;

class OrderConfirm extends Component {
  static navigationOptions = {
    title: "Your Orders".toUpperCase()
  };
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
    const screenWidth = Dimensions.get("window").width;
    this.itemSize = {
      width: (screenWidth - paddingValue * 6) / 1,
      height: (screenWidth - paddingValue * 6) / 2
    };
  }

  componentDidMount() {
    const orders = this.props.auth.yourOrders;
    console.log("Your Orders", orders);
    this.setState({
      orders: orders
    });
  }

  renderHeaderLabel = () => (
    <RkText rkType="awesome">{FontAwesome.search}</RkText>
  );
  render() {
    return (
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.rootContainer}
      >
        {this.state.orders.map((v, i) => {
          <RkButton
            rkType="square shadow"
            style={{ ...this.itemSize }}
            key={323}
            onPress={() => this.goToCateogory("electrician")}
          >
            <Avatar rkType="circle" style={styles.avatar} img={img} />
            <RkText>Name: </RkText>
            <RkText>Email: </RkText>
            <RkText>Order Confirmed: </RkText>
          </RkButton>;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#e5e5e5",
    padding: 8
  },
  rootContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  icon: {
    fontSize: 80,
    color: "#ff6d20",
    marginBottom: 10,
    marginLeft: 10
  }
});
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    viewOrders: email => {
      dispatch(authActions.viewOrders(email));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderConfirm);
