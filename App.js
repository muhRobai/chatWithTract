import React from "react";
import { createAppContainer} from "react-navigation";
import AppNavigator from './src/public/navigationApps';
import OneSignal from 'react-native-onesignal';
import { Root } from "native-base";
//import store from './src/public/redux/store';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(properties) {
    super(properties);
    OneSignal.init("43ceccce-10a9-4542-ad4b-08468f666fab");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure(); 	// triggers the ids event
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return(
      <Root><AppContainer /></Root>
    )
  }
}

