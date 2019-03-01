import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './app/pages/home/Home';
import Questions from './app/pages/questions/Questions';

class App extends React.Component {
  render() {
    return (
        <Routes/>
    );
  }
}

const Routes = createStackNavigator({
  Home: { 
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  Questions: { 
    screen: Questions,
    navigationOptions: {
      header: null,
    }
  }  
})

export default createAppContainer(Routes);