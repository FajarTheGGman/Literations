import * as React from 'react'
import { View, Text, Dimensions, StatusBar } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { WebView } from 'react-native-webview'

export default class App extends React.Component {
  render() {
      return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
              <StatusBar backgroundColor="white" barStyle="dark-content"/>
              <PDFReader
                  style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: 'white' }}
                  source={{ 
                      uri: this.props.route.params.books
                  }}
              />
          </View>
          )
    }
}
