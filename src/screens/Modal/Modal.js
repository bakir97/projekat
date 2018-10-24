import React, { Component } from "react";
import { Modal, Text, View } from "react-native";
import { Item, Input, Button } from "native-base";
import {
  AsyncStorage,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
export default class ModalExample extends Component {
  state = {
    username: "",
    password: "",
    errorState: false
  };
  saveAccount = () => {
    const { username, password } = this.state;
    if (username.length > 0 && password.length > 0) {
      const details = JSON.stringify({ username, password });
      AsyncStorage.setItem("details", details).then(details => {
        this.setState({ errorState: false });
        this.props.setModalVisible(false);
      });
      return;
    }
    this.setState({ errorState: true });
  };
  render() {
    const { modalVisible, setModalVisible } = this.props;
    const { username, password, errorState } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={setModalVisible}
      >
        <TouchableWithoutFeedback
          onPress={setModalVisible}
          style={styles.rootView}
        >
          <View style={styles.rootView}>
            <View style={styles.content}>
              <View style={styles.form}>
                <View style={{ width: "100%" }}>
                  <Text style={{ textAlign: "center" }}> Last.fm Account </Text>
                  <Item>
                    <Input
                      placeholder="Username"
                      value={username}
                      onChangeText={e => this.setState({ username: e })}
                    />
                  </Item>
                  <Item>
                    <Input
                      secureTextEntry
                      placeholder="Password"
                      value={password}
                      onChangeText={e => this.setState({ password: e })}
                    />
                  </Item>
                  {errorState && (
                    <Text style={{ marginTop: 5, textAlign: "center" }}>
                      U must provide username and password
                    </Text>
                  )}
                  <Button
                    onPress={this.saveAccount}
                    style={{ marginTop: 5, backgroundColor: "#4286f4" }}
                    full
                  >
                    <Text style={{ color: "white" }}>Save Details</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  rootView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",
    flex: 1,
    width: "100%"
  },
  content: {
    margin: 10,
    backgroundColor: "white",
    width: "90%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  form: {
    width: "95%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
