import React from 'react';
import { Text, View , TextInput} from 'react-native';
import ReceiverEndpointContainer from './components/receiver-endpoint-container';
import BackgroundGeolocation from 'react-native-background-geolocation';
import AsyncStorage from '@react-native-community/async-storage';

class ReceiverEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: this.props.url};
  }
  componentDidMount() {
    this.setState({url: this.props.url});
  }
  setNewURL(url) {
    console.log("setNewURL::",url )
    this.setState({url: url});
    BackgroundGeolocation.ready({
      url: url
    });
    this.storeData({name:"@url",value:url})
  }
  async storeData (state) {
    try {
      console.log("storeData::");
      console.log("storeData::",state.name,state.value);

      await AsyncStorage.setItem(state.name,state.value);
    } catch (error) {
      console.log("storeData::err::",error);
    }
  };



  render() {
    return (
      <ReceiverEndpointContainer>
        <Text style={{fontSize: 16}}>Receiver Endpoint (tap this line to edit)</Text>
        <TextInput
          style={{height: 40, width:'100%', backgroundColor: '#fff'}}
          onChangeText={(text) => this.setState({url: text})}
          onSubmitEditing={(event) => this.setNewURL(event.nativeEvent.text )}
          value={this.state.url}
        />

      </ReceiverEndpointContainer>
    );
  }
}


export default ReceiverEndpoint;
