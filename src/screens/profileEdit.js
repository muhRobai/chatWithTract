import React,{Component} from 'react'
import {View, Text,TouchableOpacity}from 'react-native'

export default class Dashbore extends Component {
    render(){
        return(
            <View>
                 <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Text>masuk drawer</Text>
                </TouchableOpacity>
                <Text>Ini Profile</Text>
            </View>
        )
    }
}