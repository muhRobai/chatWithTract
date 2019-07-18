import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, View, Button } from 'native-base';
import {Text, StyleSheet}from 'react-native';
import user from '../public/user';
import firebase from 'firebase';
import Fire from '../public/Fire'


export default class StackedLabelExample extends Component {
  constructor(props){
    super(props)
    this.state ={
      username:'',
      email : '',
      password: '',
      id_user: ''
    },
    this.random_id()
  }

  random_id= async ()=>{
    let id = await Math.floor(Math.random() * 100000)+ 1;
    this.setState({
      id_user: id
    })
  }

  registern = async() =>{
    let id_user = this.state.id_user
    let id = id_user.toString()
    
    const users ={
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    await Fire.shared.createAccount(users)
    await firebase.database().ref('users/'+this.state.id_user).set({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      longitude:'',
      latitude:'',
      status:''
    });
    this.props.navigation.navigate('SignIn')
  }
  
  render() {
    return (
      <Container style={{backgroundColor: '#F9EDE9'}}>
        <Content style={{marginRight:15}}>
            <View style={{alignSelf:'center', marginTop:20, marginBottom:30}}>
                <Text style={styles.title}>Register</Text>
            </View>
          <Form>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Email</Text>
                 <Input onChangeText={(text) => this.setState({
                      email:text
                 })}/>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Username</Text>
                <Input onChangeText={(text) => this.setState({
                      username:text
                 })}/>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Password</Text>
                <Input secureTextEntry={true} onChangeText={(text) => this.setState({
                      password:text
                 })}/>
            </Item>
            <Item style={{marginTop:20, borderBottomWidth: 0}}>
                <Button rounded success style={{flex:1, marginRight:5}} onPress={this.registern}>
                    <Text style={{fontSize:18, fontWeight:"600"}}> Register</Text>
                </Button>
                <Button rounded danger style={{flex:1, marginLeft:5}} onPress={() => this.props.navigation.goBack()}>
                    <Text style={{fontSize:18, fontWeight:"600"}}> Kembali</Text>
                </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 35,
        fontWeight: "600"
    },
    label:{
        backgroundColor:'#eee',
        paddingBottom: 12,
        paddingTop: 13,
        color: '#000'
    },
    items:{
        borderBottomColor: '#383234',
        borderBottomWidth: 1,
        marginBottom:3
    }
})