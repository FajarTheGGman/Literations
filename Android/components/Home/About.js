import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

export default class About extends Component{
    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/icons/author.jpeg')} />
                </View>
            </View>
        )
    }
}
