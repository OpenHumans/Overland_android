import React from 'react';
import { Text, View , TextInput} from 'react-native';
import ReceiverEndpointContainer from './components/receiver-endpoint-container';

class ReceiverEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'http://'};
  }



  render() {
    return (
      <ReceiverEndpointContainer>
        <Text style={{fontSize: 16}}>Receiver Endpoint (tap this line to edit)</Text>
        <TextInput
          style={{height: 40, width:'100%', backgroundColor: '#fff'}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

      </ReceiverEndpointContainer>
    );
  }
}


export default ReceiverEndpoint;
