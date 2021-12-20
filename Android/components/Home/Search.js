import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    AsyncStorage, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    StatusBar, 
    FlatList, 
    ImageBackground 
} from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'

export default class Search extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            search: 'testing'
        }
    }

    componentDidMount(){
        this.setState({ search: this.props.route.params.search })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 25, marginLeft: 15 }}>Search Result...</Text>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#ededed', width: 270, padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <Icons name="search-outline" size={20} color="black" />
                            <TextInput placeholder="Search" style={{ width: 200, marginLeft: 10 }} value={this.state.search} onChangeText={(val) => this.setState({ search: val })} />
                        </View>
                        <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, marginLeft: 8 }}>
                            <Icons name='search-outline' size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 40 }}>
                    <View>
                        <TouchableOpacity style={{ padding: 5 }}>
                            <ImageBackground source={{ uri: 'https://66.media.tumblr.com/22163b02db5d4a89b7cbee0a086b0dcf/tumblr_n5l5si4Fzr1qkv54go1_1280.jpg' }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text>
                            </ImageBackground>
                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>Testing</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
