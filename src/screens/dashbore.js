import React,{Component} from 'react'
import {View, Text, TouchableOpacity}from 'react-native'

export default class Dashbore extends Component {
    render(){
        return(
            <View>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('chat')}>
                    <Text>Masuk edit</Text>
                </TouchableOpacity>
                <Text>Masuk</Text>
            </View>
           
        )
    }
}