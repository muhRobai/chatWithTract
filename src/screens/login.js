import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
import {View, Text, Image, StyleSheet}from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class FormExample extends Component {
  render() {
    return (
      <Container>
        <Content style={{marginRight:15}}>
            <View style={{flex:1, alignItems:'center', backgroundColor:'white'}}>
                <Image
                    source={require('../../assets/image/logos.png')}
                    style={{width:300, height: 200}}
                />
            </View>
          <Form>
            <Item>
                <Icon name='user' style={styles.icon}/>
                <Input placeholder="Username" />
            </Item>
            <Item style={{marginBottom:30}}>
                <Icon name='lock' style={styles.icon}/>
                <Input secureTextEntry={true} placeholder="Password" />
            </Item>
            <Item style={{marginBottom:10, borderBottomWidth: 0}}>
                <Button rounded success style={{flex:1}} onPress={() => this.props.navigation.navigate('home')}>
                    <Text style={{fontSize:18, fontWeight:"600"}}> LOGIN </Text>
                </Button>
            </Item>
            <Item style={{borderBottomWidth:0, alignSelf:'flex-end'}}>
            <Text style={{color: '#beb2b2'}}>Belum mempunyai akun?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('registern')}>
                <Text style={{color:'#625c5e'}}> Daftar Sekarang</Text>
            </TouchableOpacity>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    icon:{
        fontSize:20,
        marginRight: 10
    }
})