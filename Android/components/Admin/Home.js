import React, { Component } from 'react'
import { View, FlatList, RefreshControl, ScrollView, ImageBackground, TextInput, Text, Image, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config'
import Modal from 'react-native-modal'
import * as DocumentPicker from 'expo-document-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SwipeUpDown from 'react-native-swipe-modal-up-down'
import Radio from 'react-native-simple-radio-button'

export default class Navigasi extends Component{
    constructor(props){
        super(props)

        this.state = {
            status: null
        }
    }

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
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Programming</Text>
                        <ScrollView horizontal={true} contentContainerStyle={{ marginTop: 7 }} showsHorizontalScrollIndicator={false}>
                            {this.state.books.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <Icons name='logo-dropbox' size={30} color="grey" />
                                </View>

                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>There's no books available yet!</Text>
                                </View>
                            </View> : this.state.books.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5 }} onPress={() => this.books(x.title)}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                        {x.subscribe ? 
                                            <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text> : <View></View>}
                                    </ImageBackground>
                                </TouchableOpacity>
                                })}
                            </ScrollView>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Sci-Fi</Text>
                            <ScrollView horizontal={true} contentContainerStyle={{ marginTop: 7 }} showsHorizontalScrollIndicator={false}>
                                {this.state.books.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View>
                                        <Icons name='logo-dropbox' size={30} color="grey" />
                                    </View>

                                    <View style={{ marginLeft: 10, marginTop: 5 }}>
                                        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>There's no books available yet!</Text>
                                    </View>
                                </View> : this.state.books.map((x, y) => {
                                    return <TouchableOpacity style={{ padding: 5 }} onPress={() => this.books(x.title)}>
                                        <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                            {x.subscribe ? 
                                                <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text> : <View></View>}
                                        </ImageBackground>
                                    </TouchableOpacity>
                                })}
                            </ScrollView>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>History</Text>
                            <ScrollView horizontal={true} contentContainerStyle={{ marginTop: 7 }} showsHorizontalScrollIndicator={false}>
                                {this.state.books.length == 0 ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View>
                                        <Icons name='logo-dropbox' size={30} color="grey" />
                                    </View>

                                    <View style={{ marginLeft: 10, marginTop: 5 }}>
                                        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>There's no books available yet!</Text>
                                    </View>
                                </View> : this.state.books.map((x, y) => {
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

                </View>
            </ScrollView>

        )
    }
}

/*
class Subscribe extends Component{
    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar animated={true} backgroundColor="white" barStyle="dark-content" />
                <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: 'https://66.media.tumblr.com/6bedfc893119e2d7d446d37a81401219/tumblr_oretdiqVEU1rmk83fo1_500.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} />

                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>Wellcome Back</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fajar Firdaus</Text>
                        </View>
                    </View>

                    <View style={{ marginRight: 30 }}>
                        <Icons name='notifications-outline' size={30} />
                    </View>
                </View>

                <View style={{ marginTop: 25, alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'black', padding: 15, width: 300, elevation: 25, borderRadius: 15 }}>
                        <Text style={{ color: 'white', marginLeft: 15 }}>Minimum Payment</Text>
                        <Text style={{ color: 'white', marginLeft: 15, marginTop: 15 }}>**** ****** **** 1234</Text>

                        <View style={{ marginLeft: 15, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Rp.50.000</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                <View>
                                    <Text style={{ color: 'white' }}>1 Months</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/payment/gopay.png')} style={{ width: 50, height: 20, marginRight: 10, backgroundColor: 'white' }} />
                                    <Image source={require('../../assets/payment/dana.png')} style={{ width: 50, height: 20, marginRight: 10 }} />
                                    <Image source={require('../../assets/payment/ovo.png')} style={{ width: 50, height: 20 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 30, marginLeft: 25 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>List Pricing</Text>
                    <View style={{ flexDirection: 'column', marginTop: 20 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="cash-outline" size={30} color='white' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Expert Librarian</Text>
                                <Text style={{ color: 'grey' }}>Get Access for 1 years</Text>
                            </View>
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Rp.1.000.000</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="library-outline" size={30} color='white' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Nerd Librarian</Text>
                                <Text style={{ color: 'grey' }}>Get Access for 5 months</Text>
                            </View>
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Rp.200.000</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="glasses-outline" size={30} color='white' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Reguler Librarian</Text>
                                <Text style={{ color: 'grey' }}>Get Access for 1 months</Text>
                            </View>
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Rp.50.000</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }
}*/

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
            refresh: false,
            add_category: false,
            upload_books: false,
            books_desc: false,
            addadmin: false,
            file_title: null,
            file_name: null,
            file_books: null,
            file_cover: null,
            file_desc: null,
            admin_fullname: null,
            admin_email: null,
            admin_password: null,
            admin_popup: false,
            category_popup: false,
            category_name: null,
            category_desc: null,
            role_popup: false,
            role_email: null,
            role_name: null,
            role_photo: null,
            role_role: null,
            role_profile: false,
            role_success: false,
            role_selected: 'admin',
            list: false,
            search_name: null,
            list_users: [],
            server_error: false,
            testing: false
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

            axios.post(konfigurasi.server + 'admin/list/users', {
                token: data,
                secret: konfigurasi.secret
            }).then(response => {
                this.setState({ list_users: this.state.list_users.concat(response.data) })
            }).catch(err => {
                console.log('get users errors')
            })
        })
    }

    refresh(){
        this.setState({
            list_users: []
        })
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

            axios.post(konfigurasi.server + 'admin/list/users', {
                token: data,
                secret: konfigurasi.secret
            }).then(response => {
                this.setState({ list_users: this.state.list_users.concat(response.data) })
            }).catch(err => {
                console.log('get users errors')
            })
        })
    }


    search(){
        this.props.navigation.navigate('Search', { search: this.state.search })
    }

    newAdmin(){
        axios.post(konfigurasi.server + "auth/register?admin=true", {
            name: this.state.admin_fullname,
            email: this.state.admin_email,
            password: this.state.admin_password
        }).then(response => {
            if(response.status != 200){
                alert("error")
            }else{
                this.setState({ admin_popup: true })
            }
        }).catch(err => {
            if(err){
                this.setState({ server_error: true })
            }
        })
    }

    books(x){
        this.props.navigation.navigate('Overview', { title: x })
    }

    category(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + "admin/category", {
                category: this.state.category_name,
                desc: this.state.category_desc,
                token: token,
                secret: konfigurasi.secret
            }).then(response => {
                console.log(response.data)
            }).catch(err => {
                this.setState({ server_error: true })
            })
        })
    }

    async books(){
        await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true }).then(res => {
            console.log(res)
            this.setState({ file_books: res.uri, file_name: res.name })
            this.setState({ testing: true })
        }).catch(err => {
            console.log('')
        })
    }

    async books_cover(){
        let file = await DocumentPicker.getDocumentAsync({}).catch(err => {
            console.log('')
        })

        this.setState({ file_cover: file.uri })
    }

    users_search(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'admin/list/users/search', {
                token: token,
                secret: konfigurasi.secret,
                name: this.state.search_name
            }).then(response => {
                if(response.status == 200){
                    this.setState({ list_users: [] })
                    this.setState({ list_users: this.state.list_users.concat(response.data) })
                }else{
                    this.setState({ server_error: true })
                }
            }).catch(err => {
                this.setState({ server_error: true })
            })
        })
    }

    users(email, name){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'admin/users', {
                token: token,
                secret: konfigurasi.secret
            }).then(response => {
                if(response.status == 200){
                    this.setState({ list: false })
                    this.props.navigation.navigate('Profile', {
                        email: email,
                        name: name
                    })
                }else{
                    this.setState({ server_error: true })
                }
            }).catch(err => {
                this.setState({ server_error: true })
            })
        })
    }

    change_role(email, name, photo, role){
        this.setState({
            role_email: email,
            role_name: name,
            role_photo: photo,
            role_role: role,
            role_profile: true
        })
    }

    change_role_post(email, name, role){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'admin/change/role', {
                token: token,
                secret: konfigurasi.secret,
                email: email,
                name: name,
                role: role
            }).then(response => {
                if(response.status == 200){
                    this.refresh()
                    this.setState({ role_profile: false })
                    this.setState({ role_success: true })
                }else{
                    this.setStae({ role_profile: false })
                    this.setState({ server_error: true })
                }
            }).catch(err => {
                    this.setStae({ role_profile: false })
                    this.setState({ server_error: true })
            })
        })
    }

    upload_books(){
        AsyncStorage.getItem('token').then(token => {
            let data = new FormData();
            data.append('buku', {
                name: this.state.file_name,
                uri: this.state.file_books,
            })


            axios.post(konfigurasi.server + 'book/testing', {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "multipart/form-data"
                }
            }, data).then(res => {
                if(res.status == 200){
                    alert('done')
                }
            }).catch(err => {
                this.setState({ server_error: true })
            })
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', paddingBottom: 105 }}  refreshControl={
                <RefreshControl
                    refreshing={this.state.refresh}
                    onRefresh={() => this.refresh()}
                />
                }>

                <Modal isVisible={this.state.testing}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <Image source={{ uri: this.state.file_books }} style={{ width: 140, height: 120 }} />
                            <TouchableOpacity style={{ marginTop: 15, padding: 5, borderRadius: 10, backgroundColor: 'grey' }} onPress={() => this.setState({ testing: false })}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.server_error}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 17 }}>Server Error!</Text>
                            <Image source={require('../../assets/illustrations/error.png')} style={{ width: 170, height: 120, marginTop: 5 }} />
                            <Text>Server cannot get response</Text>
                            <Text>Please, be patient and try again</Text>

                            <TouchableOpacity style={{ marginTop: 15, padding: 5, borderRadius: 10, backgroundColor: 'grey' }} onPress={() => this.setState({ server_error: false })}>
                                <Text>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.role_success}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Role Changed !</Text>
                            <Image source={require('../../assets/illustrations/role_changed.png')} style={{ width: 140, height: 120, marginTop: 10 }} />
                            <Text>Now Role Users @{this.state.role_name} </Text>
                            <Text>Changed To {this.state.role_selected}</Text>
                            <Text>And now you can login as {this.state.role_selected}</Text>
                            
                            <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'green', elevation: 10, padding: 7, borderRadius: 5 }} onPress={() => this.setState({ role_success: false })}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.admin_popup}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'green' }}>Success!</Text>
                            <Image source={require('../../assets/illustrations/done.png')} style={{ width: 140, height: 120 }} />
                            <Text>Successfully creating new admin</Text>
                            <Text>Now, go back to menu</Text>

                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'grey', borderRadius: 10, padding: 6 }} onPress={() => this.setState({ admin_popup: false })}>
                                <Text style={{ color: 'white' }}>Back to menu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.role_profile}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, paddingLeft: 15, paddingRight: 15, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ padding: 2 }}></Text>
                                </View>

                                <View style={{ marginLeft: 3 }}>
                                   <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Profile Users</Text>
                                </View>

                                <View>
                                    <TouchableOpacity style={{ marginRight: -5 }} onPress={() => this.setState({ role_profile: false })}>
                                        <Icons name='close-outline' size={27} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: konfigurasi.server + 'profile/default.jpg' }} style={{ width: 70, height: 70, borderRadius: 100, borderWidth: 2, borderColor: 'black', marginTop: 10, marginBottom: 10 }} />
                                <Text style={{ fontWeight: 'bold' }}>@{this.state.role_name}</Text>
                                {this.state.role_role == 'admin'? <Text style={{ color: 'green' }}>{this.state.role_role}</Text> : <Text>{this.state.role_role}</Text>}

                                <Text style={{ marginTop: 15 }}>Change Role To </Text>
                                <Radio radio_props={[{ label: "Admin", value: 'admin' }, { label: 'Users', value: 'users' }]} formHorizontal={true} labelStyle={{ padding: 10, marginTop: -5 }} style={{ marginTop: 5, alignItems: 'center' }} buttonColor="black" onPress={(val) => this.setState({ role_selected: val })} />
                                <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'green', padding: 5, borderRadius: 5, elevation: 10 }} onPress={() => this.change_role_post(this.state.role_email, this.state.role_name, this.state.role_selected)}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Change IT!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <SwipeUpDown modalVisible={this.state.role_popup} ContentModal={
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                            <View style={{ backgroundColor: 'white', elevation: 10, alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 10 }}>
                                <Icons name='remove-outline' size={50} style={{ marginTop: -4 }} />
                                <Text style={{ marginTop: -10, fontWeight: 'bold', fontSize: 17 }}>Change Users Role</Text>
                            </View>

                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <Icons name="finger-print-outline" size={40} color="black" />
                                <Text>Change Users Role</Text>
                                <Text>To ge access to admin or users</Text>
                            </View>


                            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ marginLeft: 50 }}>
                                        <TextInput placeholder="Search Users.." style={{ backgroundColor: '#ededed', padding: 5, width: 220, borderRadius: 10 }} onChangeText={(val) => this.setState({ search_name: val })} />
                                    </View>

                                    <View>
                                        <TouchableOpacity style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, marginLeft: 10, elevation: 10 }} onPress={() => this.users_search()}>
                                            <Icons name='search-outline' color="white" size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: 30, flexDirection: 'column', alignItems: 'center' }}>
                                    {this.state.list_users.map((x,y) => {
                                        return <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15, backgroundColor: 'black', width: 270, padding: 5, borderRadius: 10, elevation: 10, justifyContent: 'space-between' }} onPress={() => this.change_role(x.email, x.name, x.photo, x.role)}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icons name="person-circle-outline" size={40} color="white" />
                                                <Text style={{ marginLeft: 7, color: 'white', fontWeight: 'bold' }}>@{x.name}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                {x.role == 'admin' ? 
                                                    <Text style={{ color: 'green', fontWeight: 'bold', alignSelf: 'center', marginTop: 10, paddingRight: 10 }}>Admin</Text> : <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center', marginTop: 10, paddingRight: 10 }}>Users</Text> }
                                            </View>
                                        </TouchableOpacity>
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    } onClose={() => this.setState({ role_popup: false })} />

                <SwipeUpDown modalVisible={this.state.category_popup} ContentModal={
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                            <View style={{ backgroundColor: 'white', elevation: 10, alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 10 }}>
                                <Icons name='remove-outline' size={50} style={{ marginTop: -4 }} />
                                <Text style={{ marginTop: -10, fontWeight: 'bold', fontSize: 17 }}>Add New Category</Text>
                            </View>

                            <KeyboardAwareScrollView contentContainerStyle={{ flexDirection: 'column', alignItems: 'center' }}>
                                <View style={{ marginTop: 10, alignItems: 'center' }}>
                                    <Icons name='albums-outline' size={38} />
                                    <Text style={{ marginTop: 5 }}>Add new category</Text>
                                    <Text>For a new books</Text>
                                </View>

                                <View style={{ marginTop: 15, alignItems: 'center' }}>
                                    <TextInput placeholder="Name Category" style={{ padding: 5, borderRadius: 5, backgroundColor: '#ededed', width: 180, paddingLeft: 7, paddingRight: 7 }} onChangeText={(val) => this.setState({ category_name: val })} />
                                    <TextInput placeholder="Description" style={{ padding: 5, borderRadius: 5, backgroundColor: '#ededed', width: 180, paddingLeft: 7, paddingRight: 7, marginTop: 10 }} multiline={true} onChangeText={(val) => this.setState({ category_desc: val })} />

                                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'green', borderRadius: 5, elevation: 10, padding: 5 }} onPress={() => this.category()}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Add it!</Text>
                                    </TouchableOpacity>
                                </View>

                            </KeyboardAwareScrollView>
                        </View>
                    } onClose={() => this.setState({ category_popup: false })} />


                <SwipeUpDown modalVisible={this.state.addadmin} ContentModal={
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                            <View style={{ backgroundColor: 'white', elevation: 10, alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 10 }}>
                                <Icons name='remove-outline' size={50} style={{ marginTop: -4 }} />
                                <Text style={{ marginTop: -10, fontWeight: 'bold', fontSize: 17 }}>Add New Admin</Text>
                            </View>

                            <KeyboardAwareScrollView contentContainerStyle={{ flexDirection: 'column', alignItems: 'center' }}>
                                <View style={{ marginTop: 10, alignItems: 'center' }}>
                                    <Icons name='person-add-outline' size={38} />
                                    <Text style={{ marginTop: 5 }}>Add new admin here.</Text>
                                    <Text> Just For new persons</Text>
                                </View>

                                <View style={{ alignItems: 'center', marginTop: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -43 }}>
                                        <Icons name="person-outline" size={30} />
                                        <TextInput placeholder="Full Name" style={{ marginLeft: 10, backgroundColor: '#ededed', padding: 6, borderRadius: 5, width: 180 }} onChangeText={(val) => this.setState({ admin_fullname: val })} />
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: -43 }}>
                                        <Icons name="mail-outline" size={30} />
                                        <TextInput placeholder="Email" style={{ marginLeft: 10, backgroundColor: '#ededed', padding: 6, borderRadius: 5, width: 180 }} onChangeText={(val) => this.setState({ admin_email: val })} />
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: -43 }}>
                                        <Icons name="lock-closed-outline" size={30} />
                                        <TextInput placeholder="Password" secureTextEntry={true} style={{ marginLeft: 10, backgroundColor: '#ededed', padding: 6, borderRadius: 5, width: 180 }} onChangeText={(val) => this.setState({ admin_password: val })} />
                                    </View>

                                    <TouchableOpacity style={{ backgroundColor: 'black', padding: 8, borderRadius: 5, marginTop: 15, width: 180, alignItems: 'center' }} onPress={() => this.newAdmin()}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    } onClose={() => this.setState({ addadmin: false })} />

                <SwipeUpDown modalVisible={this.state.upload_books} ContentModal={
                    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                        <View style={{ backgroundColor: 'white', elevation: 10, alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 10 }}>
                            <Icons name='remove-outline' size={50} style={{ marginTop: -4 }} />
                            <Text style={{ marginTop: -10, fontWeight: 'bold', fontSize: 17 }}>Add Some Books</Text>
                        </View>

                        <KeyboardAwareScrollView contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', marginTop: 15 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Icons name='book-outline' size={40} />
                                <Text>Fill this form with your books</Text>
                                <Text>It should be in pdf format </Text>
                            </View>

                            <TextInput placeholder="Books Title" style={{ backgroundColor: '#ededed', padding: 6, borderRadius: 5, width: 180, marginTop: 15 }} onChangeText={(val) => this.setState({ file_name: val })} />
                            <TouchableOpacity style={{ width: 180, backgroundColor: this.state.file_books == null ? 'black' : 'green', alignItems: 'center', borderRadius: 5, marginTop: 15, padding: 6 }} onPress={() => this.books()}>
                                <Text style={{ color: 'white' }}>Choose Books File <Icons name='document-outline' color='white' size={15} /></Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 180, backgroundColor: this.state.file_cover == null ? 'black' : 'green', alignItems: 'center', borderRadius: 5, marginTop: 15, padding: 6 }} onPress={() => this.books_cover()}>
                                <Text style={{ color: 'white' }}>Choose Cover Books <Icons name='image-outline' color='white' size={15} /></Text>
                            </TouchableOpacity>

                            <TextInput placeholder="Write Description..." multiline={true} style={{ backgroundColor: '#ededed', padding: 6, marginTop: 15, borderRadius: 5, width: 180 }} />

                            <TouchableOpacity style={{ backgroundColor: 'green', marginTop: 15, borderRadius: 5, padding: 5 }} onPress={() => this.upload_books()}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Upload The Books !</Text>
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </View>
                    } onClose={() => this.setState({ upload_books: false })} />

                <SwipeUpDown modalVisible={this.state.list} ContentModal={
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                            <View style={{ backgroundColor: 'white', elevation: 10, alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 10 }}>
                                <Icons name='remove-outline' size={50} style={{ marginTop: -4 }} />
                                <Text style={{ marginTop: -10, fontWeight: 'bold', fontSize: 17 }}>List Users</Text>
                            </View>

                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <Icons name="tv-outline" size={40} color="black" />
                                <Text>This is list of online users</Text>
                                <Text>In here you can monitor</Text>
                                <Text>List of online users</Text>
                            </View>


                            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ marginLeft: 50 }}>
                                        <TextInput placeholder="Search Users.." style={{ backgroundColor: '#ededed', padding: 5, width: 220, borderRadius: 10 }} onChangeText={(val) => this.setState({ search_name: val })} />
                                    </View>

                                    <View>
                                        <TouchableOpacity style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, marginLeft: 10, elevation: 10 }} onPress={() => this.users_search()}>
                                            <Icons name='search-outline' color="white" size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: 30, flexDirection: 'column', alignItems: 'center' }}>
                                    {this.state.list_users.map((x,y) => {
                                        return <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15, backgroundColor: 'black', width: 270, padding: 5, borderRadius: 10, elevation: 10, justifyContent: 'space-between' }} onPress={() => this.users(x.email, x.name, x.photo, x.role)}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icons name="person-circle-outline" size={40} color="white" />
                                                <Text style={{ marginLeft: 7, color: 'white', fontWeight: 'bold' }}>@{x.name}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                {x.role == 'admin' ? 
                                                    <Text style={{ color: 'green', fontWeight: 'bold', alignSelf: 'center', marginTop: 10, paddingRight: 10 }}>Admin</Text> : <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center', marginTop: 10, paddingRight: 10 }}>Users</Text> }
                                            </View>
                                        </TouchableOpacity>
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    } onClose={() => this.setState({ list: false })} />

                <SwipeUpDown modalVisible={false} ContentModal={
                    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                        <View style={{ backgroundColor: 'white', elevation: 10, alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 10 }}>
                            <Icons name='remove-outline' size={50} style={{ marginTop: -4 }} />
                            <Text style={{ marginTop: -10, fontWeight: 'bold', fontSize: 17 }}>Add Some Books</Text>
                        </View>
                    </View>
                    }  />

                <StatusBar animated={true} backgroundColor="white" barStyle="dark-content" />
                <Modal isVisible={this.state.add_category}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ padding: 17, backgroundColor: 'white', borderRadius: 15 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: -13, marginTop: -13 }}>
                                <TouchableOpacity onPress={() => this.setState({ add_category: false })}>
                                    <Icons name='close-outline' size={30} color="black"/>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Add Category</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 15, alignItems: 'center' }}>
                                <TextInput placeholder="Category Name" style={{ backgroundColor: '#ededed', padding: 5, borderRadius: 10 }} />
                                <TouchableOpacity style={{ marginTop: 15, padding: 5, backgroundColor: 'black', borderRadius: 10, width: 50, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.books_desc}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ padding: 10, width: 200, paddingBottom: 20, backgroundColor: 'white', borderRadius: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}>Description</Text>
                            <TextInput placeholder="Write here..." multiline={true} style={{ marginTop: 6 }} onChangeText={(val) => this.setState({ file_desc: val })} />
                            <TouchableOpacity style={{ marginTop: 14, alignSelf: 'center' }} onPress={() => this.setState({ books_desc: false })}>
                                <Text style={{ color: 'green' }}>Done!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 25, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            {this.state.profile == 'users.png' ? <Image source={{ uri: konfigurasi.server + 'profile/default.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} /> : <Image source={{ uri: this.state.profile }} style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} />}
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>Wellcome Admin</Text>
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
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>What Books do</Text>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>You like to upload ?</Text>
                    </View>

                    <View style={{ marginTop: 25, marginLeft: -25, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', width: 300, padding: 10, borderRadius: 15, elevation: 15, alignItems: 'center' }}>
                            <View style={{ marginRight: 20 }}>
                                <Icons name='person' size={40} color="white" />
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Over 100 Account</Text>
                                <Text style={{ color: 'white' }}>Has Been Registered!</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 25 }}>
                        <View style={{ flexDirection: 'row', marginLeft: -25, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', marginRight: 30 }}>
                                <TouchableOpacity style={{ backgroundColor: '#ededed', padding: 10, elevation: 15, borderRadius: 10 }} onPress={() => this.setState({ upload_books: true })}>
                                    <Icons name='add-circle' size={30} color='black' />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 5 }}>Add Books</Text>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#ededed', padding: 10, elevation: 15, borderRadius: 10 }} onPress={() => this.setState({ role_popup: true })}>
                                    <Icons name='finger-print' size={30} color='black' />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 5 }}>Change Role</Text>
                            </View>

                            <View style={{ alignItems: 'center', marginLeft: 30 }}>
                                <TouchableOpacity style={{ backgroundColor: '#ededed', padding: 10, elevation: 15, borderRadius: 10 }} onPress={() => this.setState({ addadmin: true })}>
                                    <Icons name='key' size={30} color='black' />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 5 }}>Add Admin</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 25 }}>
                        <View style={{ flexDirection: 'row', marginLeft: -39, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', marginRight: 38 }}>
                                <TouchableOpacity style={{ backgroundColor: '#ededed', padding: 10, elevation: 15, borderRadius: 10 }} onPress={() => this.setState({ category_popup: true })}>
                                    <Icons name='filter' size={30} color='black' />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 5 }}>Add Category</Text>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#ededed', padding: 10, elevation: 15, borderRadius: 10 }} onPress={() => this.setState({ list: true })}>
                                    <Icons name='people-circle' size={30} color='black' />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 5 }}>List Users</Text>

                            </View>

                            <View style={{ alignItems: 'center', marginLeft: 38 }}>
                                <TouchableOpacity style={{ backgroundColor: '#ededed', padding: 10, elevation: 15, borderRadius: 10 }}>
                                    <Icons name='cash' size={30} color='black' />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 5 }}>Subscribe</Text>
                            </View>
                        </View>
                    </View>
               </View>
            </ScrollView>
        )
    }
}
