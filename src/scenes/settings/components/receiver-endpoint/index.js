import React from 'react';
import { Text, View , TextInput} from 'react-native';
import ReceiverEndpointContainer from './components/receiver-endpoint-container';
import BackgroundGeolocation from 'react-native-background-geolocation';

class ReceiverEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url:this.props.url}
  }
  componentDidMount() {
    this.setState({url: this.props.url});
  }
  setNewURL(s_url) {
    this.setState({url: s_url});
    BackgroundGeolocation.setConfig({
      url: s_url
    })
  }



  render() {
    return (
      <ReceiverEndpointContainer>
        <Text style={{fontSize: 16}}>Receiver Endpoint (tap this line to edit)</Text>
        <TextInput
          style={{height: 40, width:'100%', backgroundColor: '#fff'}}
          onChangeText={(text) => this.setState({url: text})}
          onSubmitEditing={(text) => this.setNewURL({ text })}
          value={this.state.url}
        />

      </ReceiverEndpointContainer>
    );
  }
}


export default ReceiverEndpoint;
