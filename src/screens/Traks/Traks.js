import React, { Component, Fragment } from "react";
import { Container, Text, Spinner, Root, Toast } from "native-base";
import {
  getTracks,
  tracksToRedux,
  tracksError,
  noData
} from "../../redux/actions/getTracksActions";
import {
  trackLove,
  trackLoveError
} from "../../redux/actions/trackLoveActions";
import ModalComponent from "../Modal/Modal";
import { connect } from "react-redux";
import FooterComponent from "./Footer";
import HeaderComponent from "../Header/Header";
import ListComponent from "./List";
import { FlatList, View, AsyncStorage, NetInfo } from "react-native";
class Tracks extends Component {
  constructor(props) {
    super(props);
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }
  state = {
    page: 1,
    tracks: [],
    name: this.props.navigation
      .getParam("name")
      .toLowerCase()
      .split(" ")
      .join("+"),
    modalVisible: false,
    online: true
  };
  //lifecycles
  componentDidMount() {
    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected)
        return this.props.getTracks(this.state.name, this.state.page);
      return this.setState({ online: false });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errorTracks) {
      Toast.show({
        text: "Opss Something Went Wrong",
        buttonText: "Okay",
        duration: 5000,
        onClose: () => this.props.tracksError(false)
      });
    }
    if (nextProps.errorTrackLove) {
      Toast.show({
        text: "Opss Something Went Wrong",
        buttonText: "Okay",
        duration: 5000,
        onClose: () => this.props.trackLoveError(false)
      });
    }
  }
  componentWillUnmount() {
    this.props.noData(false);
    this.props.tracksToRedux({});
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }
  //NetInfo
  handleFirstConnectivityChange = isConnected => {
    if (!this.state.online && isConnected) {
      this.props.getTracks(this.state.name, this.state.page);
      this.setState({ online: true });
      return;
    }
    return this.setState({ online: false });
  };
  //Pagination
  nextPage = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState(
      prevState => ({
        page: prevState.page + 1
      }),
      () => {
        this.props.getTracks(this.state.name, this.state.page);
      }
    );
  };
  backPage = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    if (this.state.page > 1) {
      this.setState(
        prevState => ({
          page: prevState.page - 1
        }),
        () => {
          this.props.getTracks(this.state.name, this.state.page);
        }
      );
      return;
    }
    this.props.getTracks(this.state.name, this.state.page);
  };
  //LoveHandler
  trackLoveOrDetails = (track, artist) => {
    AsyncStorage.getItem("details").then(details => {
      const detailsJSON = JSON.parse(details);
      if (details) {
        return this.props.trackLove(
          track,
          artist,
          detailsJSON.username,
          detailsJSON.password
        );
      }
      return this.setState({ modalVisible: true });
    });
  };
  //Modal
  setModalVisible = () => {
    this.setState({
      modalVisible: false
    });
  };

  //render
  render() {
    const { page, modalVisible, online } = this.state;
    const { tracks, navigation, noDataState } = this.props;

    return (
      <Root>
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
        />
        <Container style={{ marginTop: 24, position: "relative" }}>
          <HeaderComponent navigation={navigation} />
          {!online ? (
            <Text style={{ fontSize: 30 }}>
              Sorry there is not a connection pls check your internet then try
              again
            </Text>
          ) : noDataState ? (
            <Text style={{ fontSize: 30 }}>
              Sorry there are no tracks for this country
            </Text>
          ) : (
            <Fragment>
              <View style={{ flex: 1 }}>
                {noDataState}
                {Object.keys(tracks).length > 0 ? (
                  <FlatList
                    ref={ref => {
                      this.flatListRef = ref;
                    }}
                    style={{ marginBottom: 70 }}
                    data={tracks.tracks.track}
                    keyExtractor={item => item["@attr"].rank}
                    renderItem={({ item }) => (
                      <ListComponent
                        item={item}
                        navigation={navigation}
                        trackLoveOrDetails={this.trackLoveOrDetails}
                      />
                    )}
                  />
                ) : (
                  <Spinner color="blue" />
                )}
              </View>
              <FooterComponent
                page={page}
                nextPage={this.nextPage}
                backPage={this.backPage}
              />
            </Fragment>
          )}
        </Container>
      </Root>
    );
  }
}
const mapStateToProps = state => ({
  tracks: state.Tracks.tracks,
  errorTracks: state.Tracks.error,
  errorTrackLove: state.trackLove.error,
  noDataState: state.Tracks.noData
});

const mapDispatchToProps = {
  getTracks,
  tracksToRedux,
  trackLove,
  tracksError,
  trackLoveError,
  noData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
