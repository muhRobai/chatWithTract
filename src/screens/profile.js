import React, { Component } from 'react';
import { Container, Header, Body, Left, Right,Title,Icon,Button } from 'native-base';
import {StyleSheet, Image, View,Text,AsyncStorage} from 'react-native';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import user from '../public/user';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            btnmasuk:false,
            btndelete:false,
            datas: [],
            showAlert: false
        }
    }

    componentDidMount = async() => {
        await firebase.database().ref().child('users').child(user.id).on('value', data =>{
            let value = data.val()
            this.setState({
                datas:value,
                btnmasuk:false,
                btndelete:false,
            })
        })        
    }

    info =()=>{
        this.setState({
            btnmasuk:!this.state.btnmasuk
        })
        let item = this.state.datas
        this.props.navigation.navigate('editProfile', item)
    }
     
    hideAlert = () => {
    this.setState({
        showAlert: false
    });
    };

    delete = async ()=>{
        this.setState({
            btndelete:!this.state.btndelete,
            showAlert: true
        })
    }

    deleteNow = async() =>{
        this.hideAlert();
        await AsyncStorage.removeItem('id_user');
        this.props.navigation.navigate('SignIn');
        await firebase.database().ref().child('users/'+user.id).remove();
        user.id =''
    }

  render() {
    const uriL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdT09GRkK-hOMcQ6UKzSA6hbA07tnxfdavrkwvlCE1Zidicd12";
    const uriP = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTcNrQj4LRFsJxyOv_L8ovgODPO9wueTQUdMHzzhCrKX5muE8w";
    
    return (
      <Container>
        <Header 
            style={{backgroundColor: '#fff'}}>
        <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{color:'#000'}} name='arrow-back' />
            </Button>
        </Left>
          <Body>
            <Title style={{color: '#000'}}>{this.state.datas.username}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
            <View style={{flex:1}}>
                <View style={{flex:1, flexDirection:'row', marginBottom:20}}>
                    <View style={{flex:1, backgroundColor:'#F5BB55'}}/>
                    <View style={{flex:1, backgroundColor:'#46F2F3'}}>
                        { this.state.datas.gender === "L" && this.state.datas.image === "" ? 
                            <Image
                                source={{uri: uriL}}
                                style={styles.image}
                            />
                        : this.state.datas.gender === "P" && this.state.datas.image === "" ?
                            <Image
                                source={{uri: uriP}}
                                style={styles.image}
                            />
                        : 
                            <Image
                                source={{uri: this.state.datas.image}}
                                style={styles.image}
                            />
                        }
                    </View>
                </View>
                <View style={{flex:2}}>
                    <View style={{flex:1, flexDirection:'column', paddingLeft:20, paddingRight:20}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:25}}>{this.state.datas.username}</Text>
                        {this.state.datas.status === "online" ?
                            <Text style={{fontSize:17,color:'green'}}>{this.state.datas.status}</Text>
                        :
                            <Text style={{fontSize:17, color:'red'}}>{this.state.datas.status}</Text>
                        }
                            <Text style={{fontSize:17, marginTop:10}}>About Me</Text>
                        {this.state.datas.aboutMe ? 
                            <Text style={{fontSize:14}}>{this.state.datas.aboutMe}</Text>
                        :
                            <Text style={{fontSize:14}}>-</Text>
                        }
                            <Text style={{fontSize:17, marginTop:10}}>Gender</Text>
                        {this.state.datas.gender === 'L' ?
                            <Text style={{fontSize:14}}>Man</Text>
                        :
                            <Text style={{fontSize:14}}>Women</Text>
                        }    
                        </View>
                        <View style={{flexDirection:'row', marginTop:20}}>
                        {this.state.btnmasuk === false ? 
                            <Button bordered info style={{flex:1, justifyContent:'center', marginRight:10}} onPress={this.info}>
                                <Text>Edit profile</Text>
                            </Button>
                                : 
                            <Button success style={{flex:1, justifyContent:'center', marginRight:10}} onPress={this.info}>
                                <Text>Edit profile</Text>
                            </Button>}
                        {this.state.btndelete === false ? 
                            <Button bordered style={{flex:1, justifyContent:'center', marginLeft:10}} onPress={this.delete}>
                                <Text>Delete</Text>
                            </Button>
                        :
                            <Button danger style={{flex:1, justifyContent:'center', marginLeft:10}} onPress={this.delete}>
                                <Text>Delete</Text>
                            </Button>
                        }
                        </View>
                        <View style={{flex:1, marginTop: 20}}>
                            <View style={{marginBottom:20}}>
                                <Text style={{fontSize:14, color:'#0BF1F3', fontWeight:'bold'}}>Phone Number</Text>
                                <Text>{this.state.datas.noPhone}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:14, color:'#0BF1F3', fontWeight:'bold'}}>EMAIL</Text>
                                <Text>{this.state.datas.email}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <AwesomeAlert
                show={this.state.showAlert}
                showProgress={false}
                title="WARNING"
                message="Are you sure delete this account?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No"
                confirmText="Yes"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    this.setState({
                        btndelete:false
                    })
                    this.hideAlert();
                }}
                onConfirmPressed={ async() => {
                    this.setState({
                        btndelete:false
                    })
                    this.deleteNow()
                }}
            />
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    image:{
        height: 120,
        width:120,
        borderRadius:60,
        alignSelf:'center',
        marginRight: 186,
        marginTop:20,
        marginBottom:20
        
    }
})