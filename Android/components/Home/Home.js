import React, { Component } from 'react'
import { View, FlatList, RefreshControl, ScrollView, ImageBackground, TextInput, Text, Image, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config'

export default class Navigasi extends Component{
    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            if(data == null){
                this.props.navigation.dispatch(
                    StackActions.replace('Login')
                )
            }
        })

    }
    render(){
        let Tabs = createBottomTabNavigator();
        return(
            <Tabs.Navigator style={{ backgroundColor: 'white' }} tabBarOptions={{
                activeTintColor: 'white',
                style: {
                    backgroundColor: 'black',
                    padding: 5,
                    borderRadius: 20,
                    marginBottom: 25,
                    width: 300,
                    marginLeft: 25,
                    marginRight: 25,
                    alignItems: 'center',
                    position: 'absolute',
                    color: 'white'
                }
            }} screenOptions={({ route }) => ({

                tabBarIcon: ({ focus, color, size }) => {
                    let icons;

                    if(route.name == 'Home'){
                        icons = 'home-outline'
                    }else if(route.name == 'Settings'){
                        icons = 'cog-outline'
                    }else if(route.name == 'Discover'){
                        icons = 'library-outline'
                    }

                    return <Icons name={icons} size={30} color="white" />
                }
            })}>
                <Tabs.Screen name="Home" component={Home} />
                <Tabs.Screen name="Discover" component={Discover}/>
                <Tabs.Screen name="Settings" component={Settings}/>
            </Tabs.Navigator>
        )
    }
}

class Discover extends Component{
    constructor(props){
        super(props)

        this.state = {
            books: []
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'book/getall', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ books: this.state.books.concat(res.data) })
            })
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ backgroundColor: 'white', flex: 1, flexDirection: 'column' }}>
                <StatusBar animated={true} backgroundColor="white" barStyle="dark-content" />
                    
                    <View style={{ padding: 15 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Discover Some Books !</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 25 }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Programming</Text>
                            {this.state.books.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <Icons name='logo-dropbox' size={30} color="grey" />
                                </View>

                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>There's no books available yet!</Text>
                                </View>
                            </View> : this.state.books.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5, marginTop: 10 }} onPress={() => this.props.navigation.navigate('Overview', { title: x.title })}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                    </ImageBackground>
                                </TouchableOpacity>
                            })}
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Sci-Fi</Text>
                            {this.state.books.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <Icons name='logo-dropbox' size={30} color="grey" />
                                </View>

                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>There's no books available yet!</Text>
                                </View>
                            </View> : this.state.books.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5, marginTop: 10 }} onPress={() => this.props.navigation.navigate('Overview', { title: x.title })}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                    </ImageBackground>
                                </TouchableOpacity>
                            })}
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>History</Text>
                            {this.state.books.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <Icons name='logo-dropbox' size={30} color="grey" />
                                </View>

                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>There's no books available yet!</Text>
                                </View>
                            </View> : this.state.books.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5, marginTop: 10 }} onPress={() => this.props.navigation.navigate('Overview', { title: x.title })}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                    </ImageBackground>
                                </TouchableOpacity>
                            })}
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

class Settings extends Component{

    logout(){
        AsyncStorage.removeItem('token')
        this.props.navigation.dispatch(
            StackActions.replace('Login')
        )
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Your Settings <Icons name="hammer-outline" size={20} /></Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                    <Text style={{ color: 'grey' }}>USERS</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} onPress={() => this.props.navigation.navigate('ChangePassword')}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Icons name="key-outline" size={25} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Change Password</Text>
                        </View>
                        
                        <View style={{ marginTop: 10 }}>
                            <Icons name="chevron-forward-outline" size={25} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} onPress={() => this.props.navigation.navigate('ChangeEmail')}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Icons name="mail-outline" size={25} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 3 }}>Change Email</Text>
                        </View>
                        
                        <View style={{ marginTop: 10 }}>
                            <Icons name="chevron-forward-outline" size={25} />
                        </View>
                    </TouchableOpacity>

                    <Text style={{ color: 'grey', marginTop: 25 }}>AUTHORS</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} onPress={() => this.props.navigation.navigate('About')}>
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

class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: 'Civilions',
            search: null,
            updated: [],
            liked: [],
            profile: null,
            refresh: false
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

            axios.post(konfigurasi.server + "auth/profile", {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ profile: res.data[0].photo })
            })

            axios.post(konfigurasi.server + 'book/most-updated', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ updated: this.state.updated.concat(res.data) })
            })

            axios.post(konfigurasi.server + 'book/most-liked', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ liked: this.state.liked.concat(res.data) })
            })

        })
    }

    refresh(){
        this.setState({
            name: 'Civilions',
            search: null,
            updated: [],
            liked: [],
            profile: null,
            refresh: true
        })

        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'auth/profile', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                const x = res.data[0]
                this.setState({
                    name: x.name
                })
            })

            axios.post(konfigurasi.server + 'book/most-updated', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ updated: this.state.updated.concat(res.data) })
            })

            axios.post(konfigurasi.server + 'book/most-liked', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ liked: this.state.liked.concat(res.data) })
            })

            axios.post(konfigurasi.server + "auth/profile", {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ profile: res.data[0].photo })
            })
        })

        this.setState({ refresh: false })
    }

    search(){
        this.props.navigation.navigate('Search', { search: this.state.search })
    }

    books(x){
        this.props.navigation.navigate('Overview', { title: x })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', paddingBottom: 105 }} refreshControl={
                <RefreshControl
                    refreshing={this.state.refresh}
                    onRefresh={() => this.refresh()}
                />

                }>

                <StatusBar animated={true} backgroundColor="white" barStyle="dark-content" />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 25, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image source={{ uri: konfigurasi.server + 'profile/default.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>Wellcome Back</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.state.name}</Text>
                        </View>
                    </View>
                    

                    <View style={{ marginTop: 30, marginRight: 30 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifications')}>
                            <Icons name='notifications-outline' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginTop: 25, marginLeft: 15 }}>
                    <View>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>What Books Do</Text>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>you like to read ?</Text>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#ededed', width: 270, padding: 10, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="search-outline" size={20} color="black" />
                                <TextInput placeholder="Search" style={{ width: 200, marginLeft: 10 }} onChangeText={(val) => this.setState({ search: val })} />
                            </View>
                            <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, marginLeft: 8 }} onPress={() => this.search()}>
                                <Icons name='search-outline' size={25} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 25 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', alignItems: 'center' }}>Most Updated <Icons name="time-outline" size={20} /></Text>
                        <ScrollView horizontal={true} contentContainerStyle={{ marginTop: 7 }} showsHorizontalScrollIndicator={false}>
                            {this.state.updated.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <Icons name='logo-dropbox' size={30} color="grey" />
                                </View>

                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'grey' }}>There's no updated books yet!</Text>
                                </View>

                            </View>: this.state.updated.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5 }}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                        {x.subscribe ? 
                                            <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text> : <View></View>}
                                    </ImageBackground>
                                </TouchableOpacity>
                            })}

                       </ScrollView>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 25 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', alignItems: 'center' }}>Most Liked <Icons name='heart-outline' size={20} /></Text>
                        <ScrollView horizontal={true} contentContainerStyle={{ marginTop: 7 }} showsHorizontalScrollIndicator={false}>
                            {this.state.liked.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <Icons name='logo-dropbox' size={30} color="grey" />
                                </View>

                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>There's no books available yet!</Text>
                                </View>
                            </View> : this.state.liked.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5 }} onPress={() => this.books(x.title)}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                        {x.subscribe ? 
                                            <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text> : <View></View>}
                                    </ImageBackground>
                                </TouchableOpacity>
                            })}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
