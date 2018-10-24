import React from "react";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";
import { AsyncStorage } from "react-native";
export default ({ navigation, artist }) => {
  return (
    <Header style={{ backgroundColor: "#4286f4" }}>
      <Left>
        <Button onPress={() => navigation.goBack()} transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>
          {artist ? navigation.getParam("artist") : navigation.getParam("name")}
        </Title>
      </Body>
      <Right>
        <Button onPress={() => AsyncStorage.removeItem("details")} transparent>
          <Icon name="log-out" type="Feather" />
        </Button>
      </Right>
    </Header>
  );
};
