import React, { Component } from 'react';
import { Container, Header, Body, Left, Right,Title,Icon,Button, Thumbnail } from 'native-base';
import {StyleSheet, Image, View,Text} from 'react-native';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import user from '../public/user';

export default class LayoutExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            btnmasuk:false,
            btndelete:false,
            uid: this.props.navigation.state.params,
            datas: []
        }
    }

    componentDidMount = async() => {
        await firebase.database().ref().child('users').child(this.state.uid).once('value', data =>{
            let value = data.val()
            this.setState({
                datas:value
            })
        })        
    }

    info =()=>{
        this.setState({
            btnmasuk:!this.state.btnmasuk
        })
    }

    delete =()=>{
        this.setState({
            btndelete:!this.state.btndelete
        })
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
                    <View style={{flex:1}}>
                    {this.state.datas.gender ==="L" && this.state.datas.image === "" ? 
                        <Image
                            source={{uri: uriL}}
                            style={styles.image}
                        />
                    : this.state.datas.gender ==="P" && this.state.datas.image === "" ?
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
                        </View>
                        <View style={{flex:1, marginTop: 20}}>
                            <View style={{marginBottom:20}}>
                                <Text style={{fontSize:14, color:'#0BF1F3', fontWeight:'bold'}}>Phone Number</Text>
                        {this.state.datas.noPhone ?
                            <Text>{this.state.datas.noPhone}</Text>
                        :
                            <Text>-</Text>
                        }
                            </View>
                            <View>
                                <Text style={{fontSize:14, color:'#0BF1F3', fontWeight:'bold'}}>EMAIL</Text>
                                <Text>{this.state.datas.email}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
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
        marginTop: 30,
    }
})