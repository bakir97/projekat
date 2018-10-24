import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./src/screens/Home/Home";
import Expo from "expo";
import { Provider } from "react-redux";
import { configureStore } from "./src/redux/reduxConfig";
import Tracks from "./src/screens/Traks/Traks";
import DetailsTrack from "./src/screens/DetailsTrack/DetailsTrack";
const store = configureStore();
export default class App extends React.Component {
  state = {
    ready: false
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ ready: true });
  }
  render() {
    if (this.state.ready) {
      return (
        <Provider store={store}>
          <Screens />
        </Provider>
      );
    }
    return <Expo.AppLoading />;
  }
}
const Screens = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: { header: null }
  },
  Tracks: {
    screen: Tracks,
    navigationOptions: { header: null }
  },
  OneTrack: {
    screen: DetailsTrack,
    navigationOptions: { header: null }
  }
});
