import React, { Component } from 'react'
import { View, RefreshControl, ScrollView, Text, Image, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import axios from 'axios'
import konfigurasi from '../../config'
import Icons from 'react-native-vector-icons/Ionicons'

export default class Overview extends Component{
    constructor(props){
        super(props)

        this.state = {
            like: false,
            title: null,
            cover: null,
            desc: null,
            file: null,
            likes: 0,
        }
    }

    like(){
        this.setState({ like: !this.state.like })
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'book/get', {
                token: data,
                secret: konfigurasi.secret,
                title: this.props.route.params.title
            }).then(res => {
                this.setState({ 
                    title: res.data[0].title,
                    cover: konfigurasi.ssl + res.data[0].cover,
                    desc: res.data[0].description,
                    file: konfigurasi.ssl + res.data[0].file,
                    likes: res.data[0].likes == null ? 0 : res.data[0].likes
                })
            })
        })
    }

    read(){
        this.props.navigation.navigate('Books', { books: this.state.file })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar backgroundColor="black" barStyle="light-content"/>

                <View>
                    <View style={{ backgroundColor: 'black', alignItems: 'center', padding: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                        <Image source={{ uri: this.state.cover }} style={{ width: 120, height: 120 }} />
                        <Text style={{ color: 'white', marginTop: 15, fontWeight: 'bold' }}>{this.state.title}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 12, marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.title}</Text>
                        <Text style={{ color: 'grey' }}>{this.state.desc}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 25, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => this.like()}>
                        {this.state.like ? 
                        <Icons name='heart' size={25} color={"black"} />
                        : <Icons name='heart-outline' size={25} color={"black"} />}
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginBottom: 5, color: 'grey' }}>{this.state.likes} Likes</Text>
                        <TouchableOpacity style={{ backgroundColor: 'black', width: 200, padding: 5, alignItems: 'center', elevation: 15, borderRadius: 10 }} onPress={() => this.read()}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Read This!</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ marginRight: 30 }}>
                        <Icons name='ellipsis-vertical-outline' size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
