import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView, AsyncStorage, Text, Image, StatusBar } from 'react-native'

import { StackActions } from '@react-navigation/native'

import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config'

export default class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: null,
            email: null,
            admin: false
        }
    }

    componentDidMount(){
        if(this.props.route.params.email){
            AsyncStorage.getItem('token').then(token => {
                axios.post(konfigurasi.server + 'admin/users', {
                    token: token,
                    secret: konfigurasi.secret,
                    email: this.props.route.params.email,
                    name: this.props.route.params.name
                }).then(res => {
                    if(res.status == 200){
                        this.setState({
                            name: res.data[0].name,
                            email: res.data[0].email,
                            admin: res.data[0].role == 'admin' ? true : false
                        })
                    }
                })
            })
        }else{
            AsyncStorage.getItem('token').then(token => {
                axios.post(konfigurasi.server + 'auth/profile', { token: token, secret: konfigurasi.secret }).then(res => {
                    this.setState({ 
                        name: res.data[0].name,
                        email: res.data[0].email,
                        admin: res.data[0].role == 'admin' ? true : false
                    })
                }).catch(err => {
                    console.log(er)
                })
            })
        }
    }

    logout(){
        AsyncStorage.removeItem('token')
        this.props.navigation.dispatch(
            StackActions.replace('Login')
        )
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, flexDirection: 'column', paddingBottom: 15 }}>
                <StatusBar backgroundColor="white" animated={true} barStyle="dark-content" />
                <View style={{ marginTop: 15, alignItems: 'center' }}>
                    <Image source={{ uri: 'https://66.media.tumblr.com/6bedfc893119e2d7d446d37a81401219/tumblr_oretdiqVEU1rmk83fo1_500.jpg' }} style={{ width: 90, height: 90, borderRadius: 100 }} />
                    {this.state.admin ? 
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', marginTop: 5, marginLeft: 8, fontSize: 17 }}>{this.state.name}</Text>
                        <Image source={require('../../assets/icons/verified.png')} style={{ width: 20, height: 20, marginLeft: 5, marginTop: 7 }} />
                    </View>
                    :
                        <Text style={{ fontWeight: 'bold', marginTop: 5, marginLeft: 8, fontSize: 17 }}>{this.state.name}</Text>
                    }
                    <Text style={{ color: 'grey' }}>{this.state.email}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 10, marginLeft: 20, flexDirection: 'column', alignItems: 'center', paddingRight: 20, paddingLeft: 20 }}>
                        <Icons name='heart-outline' size={30} />
                        <Text style={{ fontWeight: 'bold' }}>Liked</Text>
                    </View>

                    <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'center', paddingRight: 20, paddingLeft: 20 }}>
                        <Icons name='time-outline' size={30} />
                        <Text style={{ fontWeight: 'bold' }}>Later</Text>
                    </View>

                    <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 10, marginRight: 20, flexDirection: 'column', alignItems: 'center', paddingRight: 20, paddingLeft: 20 }}>
                        <Icons name='book-outline' size={30} />
                        <Text style={{ fontWeight: 'bold' }}>Read</Text>
                    </View>
                </View>


                <View style={{ marginTop: 35, justifyContent: 'flex-start', marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Books For You</Text>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Image source={{ uri: 'https://66.media.tumblr.com/8d38ad4c2544bfb73d75c67e45bff5a4/tumblr_pzha9ms0AL1r9fkryo1_1280.jpg' }} style={{ width: 100, height: 120, borderRadius: 15 }} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        )
    }
}
