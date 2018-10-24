import React, { Component } from "react";
import { Container, Text, Toast, Root } from "native-base";
import {
  getTrack,
  trackToRedux,
  trackError
} from "../../redux/actions/getOneTrackActions";
import {
  trackLove,
  trackLoveError
} from "../../redux/actions/trackLoveActions";
import { connect } from "react-redux";
import { AsyncStorage, NetInfo } from "react-native";
import ModalComponent from "../Modal/Modal";
import HeaderComponent from "../Header/Header";
import ContentComponent from "./Content";

class Track extends Component {
  constructor(props) {
    super(props);
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }
  state = {
    modalVisible: false,
    online: true
  };
  //lifecycles
  componentDidMount() {
    const { navigation } = this.props;
    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected)
        return this.props.getTrack(
          navigation.getParam("artist"),
          navigation.getParam("track")
        );
      return this.setState({ online: false });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errorTrack) {
      this.props.trackError(false);
      Toast.show({
        text: "Opss Something Went Wrong",
        buttonText: "Okay",
        duration: 5000
      });
    }
    if (nextProps.errorTrackLove) {
      this.props.trackLoveError(false);
      Toast.show({
        text: "Opss Something Went Wrong",
        buttonText: "Okay",
        duration: 5000
      });
    }
  }
  componentWillUnmount() {
    this.props.trackToRedux({});
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }
  // NETInfo
  handleFirstConnectivityChange = isConnected => {
    const { navigation } = this.props;
    if (!this.state.online && isConnected) {
      this.props.getTrack(
        navigation.getParam("artist"),
        navigation.getParam("track")
      );
      this.setState({ online: true });
      return;
    }
    return this.setState({ online: false });
  };
  //TRACKLOVE
  trackLoveOrDetails = () => {
    const { navigation } = this.props;
    AsyncStorage.getItem("details").then(details => {
      const detailsJSON = JSON.parse(details);
      if (details) {
        return this.props.trackLove(
          navigation.getParam("track"),
          navigation.getParam("artist"),
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
    const { navigation, track } = this.props;
    const { modalVisible, online } = this.state;

    return (
      <Root>
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
        />
        <Container
          style={{
            marginTop: 24,
            position: "relative"
          }}
        >
          <HeaderComponent navigation={navigation} artist />
          {!online ? (
            <Text style={{ fontSize: 30 }}>
              Sorry there is not a connection pls check your internet then try
              again
            </Text>
          ) : (
            <ContentComponent
              track={track}
              navigation={navigation}
              trackLoveOrDetails={this.trackLoveOrDetails}
            />
          )}
        </Container>
      </Root>
    );
  }
}
const mapStateToProps = state => ({
  track: state.Track.track,
  errorTrack: state.Track.error,
  errorTrackLove: state.trackLove.error
});

const mapDispatchToProps = {
  getTrack,
  trackToRedux,
  trackLove,
  trackError,
  trackLoveError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Track);
