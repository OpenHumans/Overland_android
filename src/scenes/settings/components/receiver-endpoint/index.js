import React from 'react';
import { Text, View , TextInput, Button} from 'react-native';
import ReceiverEndpointContainer from './components/receiver-endpoint-container';
import BackgroundGeolocation from 'react-native-background-geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from "react-native-dialog";

class ReceiverEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: this.props.url,dialogVisible: false};
  }

  componentDidMount() {
    this.setState({url: this.props.url});
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
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleSave = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
    BackgroundGeolocation.ready({
      url: this.state.url
    });
    this.storeData({name:"@url",value:this.state.url})
  };

  render() {
    return (
      <ReceiverEndpointContainer>
      <View>
        <Dialog.Container visible={this.state.dialogVisible} contentStyle={{backgroundColor: '#f8f8f8'}}
        >
          <Dialog.Title>Set Receiver Endpoint</Dialog.Title>
          <Dialog.Input
            wrapperStyle={{borderBottomWidth : 1.0,backgroundColor: '#fff' }}
            onChangeText={(text) => this.setState({url: text})}
            value={this.state.url}
          />
          <Dialog.Description>
            This app can send its location data to a server of your choosing. Either a URL above and the app will send its data here.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Save" onPress={this.handleSave} />
        </Dialog.Container>
      </View>

        <Text style={{fontSize: 16}}>Receiver Endpoint (tap this line to edit)</Text>
        <View style={{ width:'100%',flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={{height: 40 ,width:'90%',backgroundColor: '#fff'}}
          value={this.state.url}
          editable={false}
        />
        <Button
          title="Edit"
          color=""
          width="100%"
          onPress={this.showDialog}
        />
        </View>
      </ReceiverEndpointContainer>
    );
  }
}


export default ReceiverEndpoint;
