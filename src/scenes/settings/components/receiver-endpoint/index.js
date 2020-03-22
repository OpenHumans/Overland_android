import React from 'react';
import { Text, View , TextInput} from 'react-native';
import ReceiverEndpointContainer from './components/receiver-endpoint-container';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

class ReceiverEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'http://'};
  }

  setNewURL(s_url) {
    /*BackgroundGeolocation.configure({
      url: s_url
    });*/
    console.log("NEW URL ===>",s_url)
    //this.setState({text: s_url});
  }



  render() {
    return (
      <ReceiverEndpointContainer>
        <Text style={{fontSize: 16}}>Receiver Endpoint (tap this line to edit)</Text>
        <TextInput
          style={{height: 40, width:'100%', backgroundColor: '#fff'}}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={(text) => this.setNewURL({ text })}
          value={this.state.text}
        />

      </ReceiverEndpointContainer>
    );
  }
}


export default ReceiverEndpoint;
