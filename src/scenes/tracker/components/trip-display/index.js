import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  InteractionManager,
  DeviceEventEmitter } from 'react-native';
import TripDisplayContainer from './components/trip-display-container';
import LocationElement from './components/location-element';
import  IconElement2  from './components/icon-element';
import TripModeElement from './components/trip-mode';
import Dialog from "react-native-dialog";
import Modal from 'react-native-modalbox';

var screen = Dimensions.get('window');

class TripDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      dialogVisible:false,
      start:'',
      duration:'-',
      distance: '-',
      isStarted:false,
      tripMode: 'cycling',
      tripModeSelection:false}
  }
  selectTripMode(){
      //this.setState({dialogVisible:true});
      this.refs.modal1.open()
  }

  onClose() {
      console.log('Modal just closed');
    }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  renderList() {
    var list = [];

    for (var i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  startTrip () {
    if(!this.state.isStarted){
      let _current_date = Date.now();
      console.log("startTrip::",_current_date.toString())
      this.setState({start: _current_date.toString(),duration:'-',distance:0,isStarted:true})
      console.log("startTrip::",this.state.start)
    }
  }

  stopTrip () {
    if(this.state.isStarted){
      this.setState({duration:'-', isStarted:false});
      //clearInterval(this.timerID);
    }
  }

  componentDidMount() {
    this.eventListener = DeviceEventEmitter.addListener('closeEvent',this.handleEvent);

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    InteractionManager.runAfterInteractions(() => {

      this.refresh();
    });
  }

  tick() {
    this.refresh();
  }

  refresh() {
    try{
        if(this.state.isStarted){
          let current_timestamp = Date.now();
          let start_timestamp = Number(this.state.start);

          let diffDateLastLocation = current_timestamp - start_timestamp;
          let l_diffMinute = Math.floor(diffDateLastLocation/(60*1000));
          this.setState({duration:l_diffMinute})
        }
    }
    catch{

    }
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
  };
  handleEvent=(event)=>{
   //Do something with event object
   console.log('j entends',event)
   this.setState({ tripMode: event });
   this.refs.modal1.close()
   this.startTrip()
  }

  componentWillUnmount(){
        //remove listener
        this.eventListener.remove();

  }

  render() {
    let inTrip =   this.state.isStarted;
    let tripModeSelection = this.state.tripModeSelection;
    return (

      <TripDisplayContainer trip={inTrip}>
      <Modal
            style={[styles.modal,styles.modal1]}
            ref={"modal1"}
            swipeToClose={this.state.swipeToClose}
            onClosed={this.onClose}
            onOpened={this.onOpen}
            onClosingState={this.onClosingState}>
              <TripModeElement />
          </Modal>
        <View
          style={{
            margin: 5,
            width:"90%",
            flexDirection: 'row',
            justifyContent: 'space-between'}}>

          <IconElement2 mobilityType={this.state.tripMode}/>
          <LocationElement title={'DURATION'} value={this.state.duration} description={'minutes'} />
          <LocationElement title={'DISTANCE'} value={this.state.distance} description={'miles'} />
          <TouchableHighlight
            style={inTrip?styles.inTrip:styles.notTrip}
            onPress={() => inTrip?this.stopTrip():this.selectTripMode()}
            underlayColor='#fff'>
            <Text  style={styles.noTripText}>{inTrip?'Stop':'Start'}</Text>
          </TouchableHighlight>
        </View>
      </TripDisplayContainer>
    );
  }
}

const styles = StyleSheet.create({

  notTrip:{
     backgroundColor:'#5bce84',
     borderRadius:5,
     borderWidth: 1,
     borderColor: '#5bce84',
     width:120,
     justifyContent: 'center',
     alignItems: 'center'
   },
 inTrip:{
    backgroundColor:'#234F32',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#234F32',
    width:120,
    justifyContent: 'center',
    alignItems: 'center'
  },
 noTripText:{
     color:'#fff',
     fontSize: 16
 },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    marginTop:-200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal1: {
    height: 400,
    backgroundColor: "#f4f4f4"
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  }

});

export default TripDisplay;
