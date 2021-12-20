import React, { Component } from 'react'
import { View, Text, TextInput, Image, AsyncStorage, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons'
import konfigurasi from '../../config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'

export default class ChangeEmail extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: null,
            profile: null,
            old_mail: null,
            new_mail: null,
            done: false,
            invalid: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'auth/profile', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                const x = res.data[0]
                this.setState({
                    name: x.name,
                    profile: x.photo
                })
            })
        })
    }

    change(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'auth/change/email', {
                token: token,
                secret: konfigurasi.secret,
                old_email: this.state.old_mail,
                email: this.state.new_mail
            }).then(response => {
                if(response.status == 301){
                    this.setState({ invalid: true })
                }else{
                    this.setState({ done: true })
                }
            }).catch(err => {
                this.setState({ invalid: true })
            })
        })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <Modal isVisible={this.state.invalid}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Email are invalid !</Text>
                            <Image source={require('../../assets/illustrations/error.png')} style={{ width: 160, height: 120, marginTop: 10 }} />
                            <Text style={{ marginTop: 2 }}>Error Processing Your Email</Text>
                            <Text>Try again with valid email</Text>
                            <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: 'red', borderRadius: 10, elevation: 10 }} onPress={() => this.setStae({ invalid: false })}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.done}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Password Changed !</Text>
                            <Image source={require('../../assets/illustrations/email_change.png')} style={{ marginTop: 15, width: 140, height: 120 }} />
                            <Text style={{ marginTop: 4 }}>Email successfully changed</Text>
                            <Text>With the new one</Text>
                            <TouchableOpacity style={{ marginTop: 15, padding: 5, backgroundColor: 'green', elevation: 10, borderRadius: 5 }} onPress={() => this.setState({ done: false })}>
                                <Text style={{ fontWeight: 'bold', color: 'white'}}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Did You Forget Your Email ?</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>And Wanna Change It Anyway ?</Text>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                    <Icons name='mail-outline' size={40} />
                    <KeyboardAwareScrollView contentContainerStyle={{ marginTop: 15, alignItems: 'center' }}>
                        <TextInput placeholder="Input your old email" style={{ backgroundColor: '#ededed', padding: 5, borderRadius: 5, width: 300,  }} onChangeText={(val) => this.setState({ old_mail: val })} />
                        <TextInput placeholder="Input your new email" style={{ backgroundColor: '#ededed', padding: 5, borderRadius: 5, width: 300,  marginTop: 20 }} onChangeText={(val) => this.setState({ new_mail: val })} />
                        <TouchableOpacity style={{ backgroundColor: 'black', elevation: 10, padding: 5, borderRadius: 5, alignItems: 'center', marginTop: 15, width: 250 }} onPress={() => this.change()}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Change IT !</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        )
    }
}
