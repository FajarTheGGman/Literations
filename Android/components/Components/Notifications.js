import React, { Component } from 'react'
import { View, AsyncStorage, ScrollView, Image, TouchableOpacity, FlatList, Text, StatusBar } from 'react-native'
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons'
import konfigurasi from '../../config'

export default class Notifications extends Component{
    constructor(props){
        super(props)

        this.state = {
            notif: [],
            no_books: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'notif/getall', {
                token: token,
                secret: konfigurasi.secret
            }).then(data => {
                if(data.status == 200){
                    this.setState({ notif: this.state.notif.concat(data.data) })
                }
            }).catch(err => {
                alert(err)
            })
        })
    }

    render(){
        return(
            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>What's New ?</Text>
                </View>

                <View style={{ flexDirection: 'column', marginTop: 25 }}>
                    {this.state.notif.length == 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 160 }}>
                        <Icons name='logo-dropbox' size={40} color='grey' />
                        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>Oops, There's no notifications yet</Text>
                        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>Just wait until someone upload a books</Text>

                    </View>: this.state.notif.map((x,y) => {
                        return <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', marginTop: 10 }} onPress={() => x.books == null ? this.setState({ no_books: true }) : this.props.navigation.navigate('Overview', { title: x.books })}>
                            <View>
                                {x.icons == null ? <Icons name="notifications-outline" color='white' size={30} style={{ backgroundColor: 'black', padding: 5, borderRadius: 10 }} /> : <Image source={{ uri: x.icons }} style={{ width: 50, height: 50 }} /> }
                            </View>

                            <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{x.title}</Text>
                                <Text>{x.desc.length > 34 ? x.desc.slice(0, 34)+'....' : x.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    })}
                </View>
            </ScrollView>
        )
    }
}
