import React from 'react';
import { Text, View , TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import ReceiverEndpointContainer from './components/receiver-endpoint-container';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {storeData} from '../../../../utils/store';
import Dialog from "react-native-dialog";

class ReceiverEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: this.props.url,device_id: this.props.id,dialogVisible: false};
  }

  componentDidMount() {
    this.setState({url: this.props.url});
    this.setState({device_id: this.props.id});
  }

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
    BackgroundGeolocation.setConfig({
      url: this.state.url
    });
    storeData({name:"@url",value:this.state.url})
    storeData({name:"@device_id",value:this.state.device_id})
  };

  render() {
    return (
      <ReceiverEndpointContainer>
      <View>
        <Dialog.Container visible={this.state.dialogVisible} contentStyle={{backgroundColor: '#f8f8f8'}}
        >
        <Dialog.Title>Set Receiver Endpoint (& device ID)</Dialog.Title>
        <Dialog.Description>
          This app can send its location data to a server of your choosing. Either a URL above and the app will send its data here.
        </Dialog.Description>
          <View>
          <Dialog.Description>
            Server URL endpoint (required)
          </Dialog.Description>

          <Dialog.Input
            wrapperStyle={{fontSize: 16 , height: 48,borderBottomWidth : 1.0,backgroundColor: '#fff' }}
            onChangeText={(text) => this.setState({url: text})}
            value={this.state.url}
          />

          </View>
          <View>
          <Dialog.Description>
            Device ID (not mandatory)
          </Dialog.Description>
          <Dialog.Input
            wrapperStyle={{fontSize: 16 , height: 48,borderBottomWidth : 1.0,backgroundColor: '#fff' }}
            onChangeText={(text) => this.setState({device_id: text})}
            value={this.state.device_id}
          />

          </View>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} wrapperStyle={{height: 48}}/>
          <Dialog.Button label="Save" onPress={this.handleSave}  wrapperStyle={{height: 48}}/>
        </Dialog.Container>
      </View>

        <Text style={{fontSize: 16}}>Receiver Endpoint (& Device ID)</Text>
        <View style={{height: 48 ,flexDirection: "row", justifyContent: "space-between",marginVertical: 8,textAlign: 'center'}}>
        <TextInput
          style={{flex:5,height: 48 ,backgroundColor: '#fff'}}
          value={this.state.url}
          editable={false}
        />
        <TouchableOpacity onPress={this.showDialog} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>
            Edit
          </Text>
        </TouchableOpacity>
        </View>
      </ReceiverEndpointContainer>
    );
  }
}


export default ReceiverEndpoint;

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    paddingTop: 10
  },
  buttonStyle: {
    flex:1,
    backgroundColor: '#1f8adc',
    paddingLeft:20,
    paddingRight: 20,
    alignItems: 'center'  ,
    height: 48,
    width: 48
  }
};

const theme = {
  colors: {
    primary: 'blue',
  }
}
