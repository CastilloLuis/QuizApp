import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import StartButton from '../../components/start-button/StartButton';

export default class Home extends Component {
    render() {
        return (
           <View>
               <Grid>
                   <Row></Row>
                   <Row>
                       <StartButton></StartButton>
                    </Row>
                    <Row></Row>
               </Grid>
           </View>
        )
    }
}