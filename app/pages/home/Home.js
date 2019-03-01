import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import StartButton from '../../components/start-button/StartButton';

export default class Home extends Component {
    render() {
        return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', backgroundColor:'rgb(255, 153, 0)'}}>
                    <Image 
                        source={require('../../../assets/logo.png')}
                        style={{ width: 200, height: 200 }}
                    />
                    <StartButton modalAction={() => this.props.navigation.navigate('Questions')}></StartButton>
                </View>
        )
    }

}
