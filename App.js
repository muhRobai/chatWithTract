import React from "react";
import { createStackNavigator, createAppContainer,createSwitchNavigator } from "react-navigation";
import AppNavigator from './src/public/navigationApps';
import firebase from 'firebase'
//import store from './src/public/redux/store';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render() {
    return(
       <AppContainer />
    )
  }
}

