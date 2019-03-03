import React, { Component } from "react";
import { Permissions, Location, Marker, MapView } from "expo";
import { View, Dimensions, StyleSheet, Image, Text } from "react-native";
import { GradientButton } from "../components/gradientButton";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";
import img from "../assets/icon.png";

class MapScreen extends Component {
  static navigationOptions = {
    title: "Your Family"
  };
  constructor(props) {
    super(props);
    this.state = {
      condition: false,
      location: {
        coords: {
          latitude: 24.9048714,
          longitude: 67.0782024
        }
      },
      circle: []
    };
  }

  componentWillMount() {
    const circle = this.props.auth.viewCicle;
    console.warn(circle);
    this.setState({
      circle: circle
    });
  }
  componentDidMount() {
    this._getLocationAsync();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, condition: true });
    console.log("current location===", location);
    const id = this.props.auth.user.id;
  };

  render() {
    this.props.updateLocation(
      this.state.location,
      this.props.auth.user.id,
      this.props.auth.viewCicle)
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="My Marker"
            description="Some description"
            ref={marker => {
              this.marker = marker;
            }}
            flat
          >
            {/* <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 100
              }}
              source={{
                uri:
                  this.state.circle.users.picture
              }}
            /> */}
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  save: {
    marginVertical: 9
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    confirmOrder: (userEmail, SellerEmail, userLocation) => {
      dispatch(authActions.confirmOrder(userEmail, SellerEmail, userLocation));
    },
    viewOrders: email => {
      dispatch(authActions.viewOrders(email));
    },
    updateLocation: (location, id, code) => {
      dispatch(authActions.updateLocation(location, id, code));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
