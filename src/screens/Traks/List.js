import React from "react";
import { Left, Body, Icon, Text, List, Thumbnail, ListItem } from "native-base";
import { TouchableOpacity } from "react-native";
export default ({ navigation, trackLoveOrDetails, item }) => {
  return (
    <List>
      <ListItem
        avatar
        onPress={() =>
          navigation.navigate("OneTrack", {
            artist: item.artist.name,
            track: item.name,
            artistImage: item.image[3]["#text"]
          })
        }
      >
        <Left>
          <Thumbnail large square source={{ uri: item.image[2]["#text"] }} />
        </Left>
        <Body>
          <Text>Artist: {item.artist.name}</Text>
          <Text note>Song name: {item.name}</Text>
        </Body>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => trackLoveOrDetails(item.name, item.artist.name)}
        >
          <Icon
            style={{ fontSize: 40, color: "red" }}
            name="heartbeat"
            type="FontAwesome"
          />
        </TouchableOpacity>
      </ListItem>
    </List>
  );
};
