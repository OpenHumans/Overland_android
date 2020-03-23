import React, { PureComponent } from 'react';
import { StyleSheet, InteractionManager, Alert, View, FlatList } from 'react-native';
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
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const styles = StyleSheet.create({
  iconStyle: {
    color: '#0A69FE'
  }
});

const LogItem = ({
  id: locationId,
  latitude,
  longitude,
  time,
}) => {
  const date = new Date(time);
  return (
    <ListItem>
      <Text>{`${locationId}`}</Text>
      <Body>
        <View>
        <Text>{`lat: ${latitude}`}</Text>
        <Text>{`lon: ${longitude}`}</Text>
        <Text>{`time: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Text>
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
    this.state = { locations: null, selectedLocationId: -1, isReady: false };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refresh();
    });
  }

  refresh() {
    this.setState({ selectedLocationId: -1, isReady: false });
    BackgroundGeolocation.getValidLocations(locations => {
      this.setState({ locations, isReady: true });
    });
  }
  delete() {
    Alert.alert(
      'Delete all data ?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
          BackgroundGeolocation.deleteAllLocations();
          }
        },
      ],
      { cancelable: false }
    )
    BackgroundGeolocation.getValidLocations(locations => {
      this.setState({ locations, isReady: true });
    });
  }

  _keyExtractor = (item, index) => item.id;

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
          {(() => {
            if (!isReady) {
              return <Spinner />;
            }
            return (
              <FlatList style={{ flex: 1, backgroundColor: '#fff' }}
                data={locations}
                inverted={true}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => {
                  const date = new Date(item.time);
                  return (
                    <LogItem
                      {...item}
                      onPress={this.onLocationSelected}
                    />
                  );
                }}
              />
            );
          })()}
        </Content>
      </Container>
    );
  }
}

export default AllLocationsScene;
