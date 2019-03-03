import React, { Component } from 'react'
import { StyleSheet, Text, View, Button} from 'react-native';

export default class Dashboard extends Component {
    render(){
        return(
            <View style={{height: '100%'}}>
                    <Button 
                    title='Go To HomeScreen'
                    onPress={() => this.props.navigation.navigate('Home')}
                    />
            </View>
        )
    }
}