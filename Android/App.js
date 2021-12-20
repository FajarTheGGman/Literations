import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Commons
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import Search from './components/Home/Search'
import Profile from './components/Auth/Profile'
import Read from './components/Books/Read'
import Overview from './components/Books/Overview'
import Notifications from './components/Components/Notifications'

// Settings
import About from './components/Settings/About'
import ChangeEmail from './components/Settings/ChangeEmail'
import ChangePassword from './components/Settings/ChangePassword'


// Admin
import Admin from './components/Admin/Home';

export default class Navigasi extends Component{
    constructor(props){
        super(props)

        this.state = {
            route: 'Login'
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            if(token){
                AsyncStorage.getItem('role').then(role => {
                    if(role == 'admin'){
                        this.setState({ route: 'Admin' })
                    }else{
                        this.setState({ route: 'Home' })
                    }
                })
            }
        })
    }

    render(){
        let Stack = createStackNavigator()
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.state.route}>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                    <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }}/>
                    <Stack.Screen name="Notifications" component={Notifications} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name="ChangeEmail" component={ChangeEmail} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name="About" component={About} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
                    <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
                    <Stack.Screen name='Search' component={Search} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name='Books' component={Read} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name='Overview' component={Overview} options={{
                        headerTintColor: 'white',
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: 'black'
                        }
                    }}/>
                    <Stack.Screen name='Profile' component={Profile} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


