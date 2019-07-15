import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, View, Button } from 'native-base';
import {Text, StyleSheet}from 'react-native';
export default class StackedLabelExample extends Component {
  render() {
    return (
      <Container style={{backgroundColor: '#F9EDE9'}}>
        <Content style={{marginRight:15}}>
            <View style={{alignSelf:'center', marginTop:20, marginBottom:30}}>
                <Text style={styles.title}>Registern</Text>
            </View>
          <Form>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Email</Text>
                 <Input />
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Username</Text>
                <Input />
            </Item>
            <Item fixedLabel style={styles.items}>
                <Text style={{width:100, fontSize:18}}>Password</Text>
                <Input />
            </Item>
            <Item style={{marginTop:20, borderBottomWidth: 0}}>
                <Button rounded success style={{flex:1}} onPress={() => this.props.navigation.navigate('login')}>
                    <Text style={{fontSize:18, fontWeight:"600"}}> REGISTERN </Text>
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