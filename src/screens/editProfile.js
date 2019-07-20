import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, View, Button } from 'native-base';
import {Text, StyleSheet, Picker}from 'react-native';
import user from '../public/user';
import firebase from 'firebase';


export default class editProfile extends Component {
  constructor(props){
    super(props)
    this.state ={
      username: this.props.navigation.state.params.username,
      email : this.props.navigation.state.params.email ,
      aboutMe:this.props.navigation.state.params.aboutMe,
      id_user: user.id,
      image:this.props.navigation.state.params.image,
      noPhone:this.props.navigation.state.params.noPhone,
      gender: this.props.navigation.state.params.gender,
    },
    this.random_id()
  }
  
  random_id= async ()=>{
    let id = await Math.floor(Math.random() * 100000)+ 1;
    this.setState({
      id_user: id
    })
  }

  registern = () =>{
    firebase.database().ref().child('users/'+user.id).update({
        username : this.state.username,
        image: this.state.image,
        email: this.state.email,
        gender: this.state.gender,
        noPhone: this.state.noPhone,
        aboutMe: this.state.aboutMe,

    }) 
        this.props.navigation.navigate('profile')
  }
  
  render() {
    return (
      <Container style={{backgroundColor: '#F9EDE9'}}>
        <Content style={{marginRight:15}}>
            <View style={{alignSelf:'center', marginTop:20, marginBottom:30}}>
                <Text style={styles.title}>Edit Profile</Text>
            </View>
          <Form>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Username</Text>
                <Input value={this.state.username} onChangeText={(text) => this.setState({
                      username:text
                 })}/>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>About Me</Text>
                <Input value={this.state.aboutMe} onChangeText={(text) => this.setState({
                      aboutMe:text
                 })}/>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Image</Text>
                <Input value={this.state.image} onChangeText={(text) => this.setState({
                      image:text
                 })}/>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Email</Text>
                 <Input value={this.state.email} onChangeText={(text) => this.setState({
                      email:text
                 })}/>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Phone Number</Text>
                 <Input value={this.state.noPhone} onChangeText={(text) => this.setState({
                      noPhone:text
                 })}/>
            </Item>
            <Item style={{marginTop:20, borderBottomWidth: 0}}>
                <Button rounded success style={{flex:1, marginRight:5}} onPress={this.registern}>
                    <Text style={{fontSize:18, fontWeight:"600"}}> Update Data</Text>
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