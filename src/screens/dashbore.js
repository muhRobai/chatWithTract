import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, AsyncStorage
} from 'react-native';

import user from '../public/user';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  };

  state = {
    name: '',
  };

  onPress = () =>
    this.props.navigation.navigate('chat', { name: this.state.name });

  onChangeText = name => this.setState({ name });

  exit = async() =>{
        await AsyncStorage.removeItem('id_user');
        this.props.navigation.navigate('SignIn')
        console.warn(user.id)
  }

  render() {
      console.warn(user.id)
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Flutter God Evan Bacon"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.exit}>
            <Text style={styles.buttonText}>{user.id}</Text>
            <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;

const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default Main;
