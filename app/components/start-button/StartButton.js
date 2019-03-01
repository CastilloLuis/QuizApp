import React, { Component } from 'react';
import { Button } from 'react-native-elements';

const StartButton = ({modalAction}) => {
    return (
        <Button title="START PLAYING" onPress={() => modalAction()} buttonStyle={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}></Button>
    )
};

export default StartButton;