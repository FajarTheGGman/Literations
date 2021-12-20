import React, { Components } from 'react'
import { View, ScrollView, Text } from 'react-native'


export default class Settingsx extends Components{
    render(){
        return(
            <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Your Settings <Icons name="hammer-outline" size={20} /></Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                    <Text style={{ color: 'grey' }}>USERS</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Icons name="key-outline" size={25} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Change Password</Text>
                        </View>
                        
                        <View style={{ marginTop: 10 }}>
                            <Icons name="chevron-forward-outline" size={25} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Icons name="mail-outline" size={25} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 3 }}>Change Email</Text>
                        </View>
                        
                        <View style={{ marginTop: 10 }}>
                            <Icons name="chevron-forward-outline" size={25} />
                        </View>
                    </TouchableOpacity>

                    <Text style={{ color: 'grey', marginTop: 25 }}>AUTHORS</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Icons name="happy-outline" size={25} color='black' />
                            <Text style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 3 }}>About Me</Text>
                        </View>
                        
                        <View style={{ marginTop: 10 }}>
                            <Icons name="chevron-forward-outline" size={25} />
                        </View>
                    </TouchableOpacity>

                    <Text style={{ color: 'grey', marginTop: 25 }}>DANGER AREA</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} onPress={() => this.logout()}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Icons name="log-out-outline" size={25} color='red' />
                            <Text style={{ fontWeight: 'bold', marginLeft: 10, color: 'red', marginTop: 3 }}>Get Out</Text>
                        </View>
                        
                        <View style={{ marginTop: 10 }}>
                            <Icons name="chevron-forward-outline" size={25} color='red' />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }
}
