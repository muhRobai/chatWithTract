import React,{Component} from 'react'
import {View, Text,TouchableOpacity, StyleSheet}from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { Button } from 'native-base';


export default class maps extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'bambang',
            longitude:'',
            latitude:''
        },
        this.getLocation()
    }

    getLocation = async()=>{
        await Geolocation.getCurrentPosition(
           (position) => {
             console.warn('oke')
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

    render(){
        console.warn(this.state.latitude)
        if (this.state.latitude) {
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
                        {/* <Marker
                            coordinate={{
                                latitude: -7.8258176,
                                longitude: 110.3904768,
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                width:100,
                                height:70,
                                backgroundColor: 'orange'
                            }}>
                                <View>
                                    <Text style={{backgroundColor: '#fff'}}>ini header</Text>
                                    <Text>{Marker.title}</Text>
                                    <Text>{Marker.description}</Text>
                                </View>
                            </View>
                        </Marker> */}
                        <Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            }}
                            title={this.state.name}
                            description="in here"
                        />
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