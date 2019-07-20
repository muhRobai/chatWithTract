import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Toast, View, Button } from 'native-base';
import {Text, StyleSheet,Picker}from 'react-native';
import user from '../public/user';
import firebase from 'firebase';
import Fire from '../public/Fire';
import Geolocation from '@react-native-community/geolocation';


export default class Registern extends Component {
  constructor(props){
    super(props)
    this.getLocation();
    this.state ={
      username:'',
      email : '',
      password: '',
      id_user: '',
      image:'',
      gender:'L',
      noPhone:'',
      longitude:'',
      latitude:'',
      emailValid:false,
      showToast: false,
      choosenIndex: 0
    },
    this.random_id();
    
  }

  getLocation = async()=>{
    await Geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }
  
  random_id= async ()=>{
    let id = await Math.floor(Math.random() * 100000)+ 1;
    this.setState({
      id_user: id
    })
  }

  validate = () => {
    let text = this.state.email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(text) === false){
          this.setState({
            emailValid: false
          })
      }
      else {
        this.setState({
            emailValid: true
        })
      }
    }
  

  registern = async() =>{
    if (this.state.email == '' || this.state.username == '' || this.state.password == '' || this.state.noPhone ==''|| this.state.password == '') {
      Toast.show({
        text: "Pelase Insert Data!",
        position:"top",
        duration: 3000
      })
    }else if (this.state.password.length < 7) {
      Toast.show({
        text: "Password Must 8 Character!",
        position:"top",
        duration: 3000
      })
    }else if (this.state.emailValid === false) {
      Toast.show({
        text: "Email Not Valid!",
        position:"top",
        duration: 3000
      })
    }else if (this.state.noPhone < 12) {
      Toast.show({
        text: "Number Phone must between 11 - 14 character",
        position:"top",
        duration: 3000
      })
    }else {

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
        gender:this.state.gender,
        longitude:this.state.longitude,
        latitude:this.state.latitude,
        status:'',
        aboutMe:'',
        noPhone:this.state.noPhone,
        image:this.state.image
      });

      this.props.navigation.navigate('SignIn')
    }
  }
  
  render() {
    console.log(this.state.gender);
    
    return (
      <Container style={{backgroundColor: '#F9EDE9'}}>
        <Content style={{marginRight:15}}>
            <View style={{alignSelf:'center', marginTop:20, marginBottom:30}}>
                <Text style={styles.title}>Register</Text>
            </View>
          <Form>
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
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Image</Text>
                <Input onChangeText={(text) => this.setState({
                      image:text
                 })}/>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Email</Text>
                 <Input onChangeText={(text) => this.setState({
                      email:text})}
                      onEndEditing={this.validate}
                 />
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Gender</Text>
                <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.gender}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({gender: itemValue, choosenIndex: itemPosition})}  
                    > 
                    <Picker.Item label="Male" value="L" />  
                    <Picker.Item label="Female" value="P" />  
                </Picker>
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Phone Number</Text>
                 <Input onChangeText={(text) => this.setState({
                      noPhone:text
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
    },
    pickerStyle:{  
      height: 50,  
      width: "100%",  
      color: '#344953',  
      justifyContent: 'center',  
  }  
})