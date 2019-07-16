import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Button } from 'native-base';
import {View, Text, AsyncStorage, Image, StyleSheet, Alert}from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';
import user from '../public/user';
import firebase from 'firebase';
import Fire from '../public/Fire'

export default class FormExample extends Component {
  constructor(props){
    super(props)
    this.state ={
      email : '',
      password: '',
      id_user: '',
      data: []
    },
    this.random_id()
  }

  random_id= async ()=>{
    let id = await Math.floor(Math.random() * 100000)+ 1;
    this.setState({
      id_user: id
    })
  }
  
  login = async() =>{
      // let id_user = this.state.id_user
      // let id = id_user.toString()
      // await AsyncStorage.setItem('id_user',id)
      // user.id = id 
      
      const users ={
        email: this.state.email,
        password: this.state.password
      }
      Fire.shared.login(users, this.loginSuccess, this.loginFailed);
      
      //============= sukses select by email ======================
        // const rootref = firebase.database().ref();
        // const oneRef = rootref.child('users').orderByChild('email').equalTo(this.state.email).on('value', (data)=>{
        //   const values = data.val()
        //   if (values) {
        //     const messageList = Object.keys(values).map(key =>({
        //       ...values[key],
        //       uid: key
        //     }));

        //     this.setState({
        //       data: messageList
        //     })
        //   }
        // })
        //================ select all===========================
      // firebase.database().ref('users').once('value', (data) =>{
      //   console.log(data.toJSON())
      // })
      //==========================================================
  }

  loginFailed = () =>{
    console.warn('failed')
  }

  loginSuccess = () =>{
    console.warn('sukses')
    this.props.navigation.navigate('Home')
  }

  render() {
    console.log(this.state.data)
    return (
      <Container style={{flex:1}}>
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
                <Input placeholder="Email" value={this.state.email} onChangeText={(text) => this.setState({
                  email:text
                })}/>
            </Item>
            <Item style={{marginBottom:30}}>
                <Icon name='lock' style={styles.icon}/>
                <Input secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({
                    password: text
                })}/>
            </Item>
            <Item style={{marginBottom:10, borderBottomWidth: 0}}>
                <Button rounded success style={{flex:1}} onPress={this.login}>
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