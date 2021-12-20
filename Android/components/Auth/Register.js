import React, { Component } from 'react'
import { View, Text, TextInput, StatusBar, Image, TouchableOpacity, AsyncStorage } from 'react-native'

import { StackActions } from '@react-navigation/native'
import Loading from 'react-native-loading-spinner-overlay'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import konfigurasi from '../../config'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: null,
            email: null,
            password: null,
            phone: null,
            loading: false
        }
    }

    async register(){
        this.setState({ loading: true })
        await axios.post(konfigurasi.server + "auth/register", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        }).then(data => {
            if(data.status == 200){
                this.props.navigation.navigate('Login')
            }
        })
        this.setState({ loading: false })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <Loading visible={this.state.loading} textContent={"Please Wait.."} />
                <StatusBar animated={true} backgroundColor="#ededed" barStyle="dark-content" />
                <View style={{ marginTop: 35, alignItems: 'center' }}>
                    <Image source={require('../../assets/illustrations/register.png')} style={{ width: 180, height: 180 }} />

                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Hei Fellas</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Register Here!</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView style={{ marginBottom: 30 }}>
                    <View style={{ marginTop: 124 }}>
                        <TextInput placeholder="Name" style={{ padding: 8, borderRadius: 5, backgroundColor: '#ededed', width: 250, marginBottom: 5 }} onChangeText={(val) => this.setState({ name: val })} />

                        <TextInput placeholder="Email" style={{ padding: 8, borderRadius: 5, backgroundColor: '#ededed', width: 250, marginTop: 10 }} onChangeText={(val) => this.setState({ email: val })} />

                        <TextInput placeholder="Password" style={{ padding: 8, borderRadius: 5, backgroundColor: '#ededed', width: 250, marginTop: 10 }} onChangeText={(val) => this.setState({ password: val })} secureTextEntry={true} />

                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#0b0f24', marginTop: 10, padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.register()}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Daftar</Text>
                    </TouchableOpacity>
                    
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>Sudah punya akun ? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ color: '#0B0F24', fontWeight: 'bold' }}>Masuk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}
