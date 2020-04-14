import React, { PureComponent } from 'react';
import { StyleSheet, InteractionManager, Alert, View, FlatList , YellowBox} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  Spinner
} from 'native-base';
import BackgroundGeolocation from "react-native-background-geolocation";

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested', // TODO: Remove when fixed
])


const styles = StyleSheet.create({
  iconStyle: {
    color: '#0A69FE'
  }
});

const LogItem = ({
  id,
  geometry,
  properties
}) => {

  return (
    <ListItem>
      <Text>{id}</Text>
      <Body>
        <View>
        <Text>{`lat: ${geometry.coordinates[0]}`}</Text>
        <Text>{`long: ${geometry.coordinates[1]}`}</Text>
        <Text>{`time: ${properties.timestamp}`}</Text>

        </View>
      </Body>
    </ListItem>
  );
};

class AllLocationsScene extends PureComponent {
  static navigationOptions = {
    title: 'All Locations',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {locations: null, selectedLocationId: -1, isReady: false };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refresh();
    });
  }

  async refresh() {
    this.setState({ selectedLocationId: -1, isReady: false });
    let locations = await BackgroundGeolocation.getLocations();
    console.log(locations)
    this.setState({locations, isReady: true });
    /*BackgroundGeolocation.getValidLocations(locations => {
      this.setState({locations, isReady: true });
    });*/
  }
  delete() {
    Alert.alert(
      'Delete all data ?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
          BackgroundGeolocation.deleteAllLocations();
          //let success = await BackgroundGeolocation.destroyLocations();
          }
        },
      ],
      { cancelable: false }
    )/*
    BackgroundGeolocation.getValidLocations(locations => {
      this.setState({ locations, isReady: true });
    });*/
  }

  _keyExtractor = (item, index) => item.id=index+1;
  _getItemLayout = (data, index) => ({length: data.length, offset: data.length * index, index});

  render() {
    const { locations, isReady } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>All Locations</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.refresh}>
              <Icon name="refresh" />
            </Button>
            <Button transparent onPress={this.delete}>
              <Icon name="trash" />
            </Button>
          </Right>
        </Header>
        <Content>
          {( () => {
            if (!isReady) {
              return <Spinner />;
            }
            return (
              <FlatList style={{ flex: 1, backgroundColor: '#fff' }}
                data={locations}
                keyExtractor={this._keyExtractor}
                getItemLayout={this._getItemLayout}
                renderItem={({ item }) => {
                  const date = item.timestamp;
                  return (
                    <LogItem
                      {...item}
                    />
                  );
                }}
              />
            );
          } ) ()}
        </Content>
      </Container>
    );
  }
}

export default AllLocationsScene;
