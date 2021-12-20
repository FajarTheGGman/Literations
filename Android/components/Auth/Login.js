import React, { Component } from 'react'
import { View, Image, Text, TextInput, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native'

import { StackActions } from '@react-navigation/native'
import Loading from 'react-native-loading-spinner-overlay'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import konfigurasi from '../../config'
import Modal from 'react-native-modal'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: null,
            password: null,
            wrong: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            if(data){
                AsyncStorage.getItem('role').then(role => {
                    if(role == 'admin'){
                        this.props.navigation.dispatch(
                            StackActions.replace('Admin')
                        )
                    }else{
                        this.props.navigation.dispatch(
                            StackActions.replace('Home')
                        )
                    }
                })
            }
        })
    }

    login(){
        axios.post(konfigurasi.server + 'auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(data => {
            if(data.data.error){
                this.setState({ wrong: true })
            }else{
                if(data.status == 200){
                    axios.post(konfigurasi.server + 'auth/profile', {
                        token: data.headers.token,
                        secret: konfigurasi.secret,
                        email: this.state.email
                    }).then(res => {
                        if(res.data[0].role == 'admin'){
                            AsyncStorage.setItem('token', data.headers.token)
                            AsyncStorage.setItem('role', 'admin')
                            this.props.navigation.dispatch(
                                StackActions.replace('Admin')
                            )
                        }else{
                            AsyncStorage.setItem('token', data.headers.token)
                            AsyncStorage.setItem('role', 'person')
                            this.props.navigation.dispatch(
                                StackActions.replace('Home')
                            )
                        }
                    })
                }
            }
        }).catch(e => {
            this.setState({ wrong: true })
        })
    }


    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <StatusBar animated={true} backgroundColor="#ededed" barStyle="dark-content" />

                <Modal isVisible={this.state.wrong}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 14, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Wrong Authentication !</Text>
                            <Image source={require('../../assets/illustrations/wrong.png')} style={{ width: 140, height: 140, marginTop: 10, marginBottom: 10 }} />
                            <Text>The username / password is wrong</Text>
                            <Text>Just try to login again</Text>

                            <TouchableOpacity style={{ marginTop: 15,  backgroundColor: 'red', padding: 5, borderRadius: 5, elevation: 10 }} onPress={() => this.setState({ wrong: false })}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{ marginTop: 55, alignItems: 'center' }}>
                    <Image source={require('../../assets/illustrations/read.png')} style={{ width: 180, height: 180 }} />

                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Upgrade Your</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Literation Skills!</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView contentContainerStyle={{ marginBottom: 45 }}>
                    <View style={{ marginTop: 160 }} scrollEnabled={false}>
                        <TextInput placeholder="Email" style={{ padding: 8, borderRadius: 5, backgroundColor: '#ededed', width: 250, marginBottom: 5 }}  onChangeText={(val) => this.setState({ email: val })}/>
                        <TextInput placeholder="Password" style={{ padding: 8, borderRadius: 5, backgroundColor: '#ededed', width: 250, marginTop: 10 }} secureTextEntry={true} onChangeText={(val) => this.setState({ password: val })} />
                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#0b0f24', marginTop: 10, padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.login()}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Masuk</Text>
                    </TouchableOpacity>
                    
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>Belum punya akun ? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ color: '#0B0F24', fontWeight: 'bold' }}>Daftar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}
