import React,{Component} from 'react'
import {View, Text,TouchableOpacity, StyleSheet}from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase';
import { Button } from 'native-base';
import user from '../public/user';

export default class maps extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'bambang',
            longitude:'',
            latitude:'',
            data:[]
        },
        this.getLocation()
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
    updateLocation = async() =>{
        if (this.state.latitude) {
            await firebase.database().ref('users/'+ user.id).update({
                latitude: this.state.latitude,
                longitude: this.state.longitude
            })
        }
    }

    componentDidMount(){
        firebase.database().ref('users').on('value', (data) =>{
            let values = data.val()
            if (values) {
                const messageList = Object.keys(values).map(key =>({
                  ...values[key],
                  uid: key
                }));
      
                this.setState({
                  data: messageList
                })
              }
        })
    }

    render(){
        if (this.state.latitude) {
            this.updateLocation()  
            return(
                <View style={styles.container}>
                 <View style={styles.container}>
                   <MapView
                        style={styles.map}
                        region={{
                            "latitude": this.state.latitude,
                            "longitude": this.state.longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        >
                        {this.state.data.map((item)=>{
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                    }}
                                    title={this.state.name}
                                    description="in here"
                                />
                            ) 
                        })}
                        
                    </MapView>
                </View>
                </View>
            )    
        }
        return(
            <View style={styles.container}>
            <View style={styles.container}>
              <MapView
                   style={styles.map}
                   region={{
                       "latitude": -7.7613167,
                       "longitude": 110.3589596,
                       latitudeDelta: 0.015,
                       longitudeDelta: 0.0121,
                   }}>
               </MapView>
           </View>
           </View>
       )    
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    view:{
        position:"absolute"
    }
   });