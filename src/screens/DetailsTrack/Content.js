import React, { Fragment } from "react";
import { Icon, Text, Content, Thumbnail, Spinner } from "native-base";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
export default ({ navigation, track, trackLoveOrDetails }) => {
  return Object.keys(track).length > 0 ? (
    <ScrollView>
      <Content>
        <Thumbnail
          style={styles.artistImage}
          source={{ uri: navigation.getParam("artistImage") }}
        />
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              marginBottom: 10
            }}
          >
            {navigation.getParam("track")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {track.track &&
              track.track.album.image[3]["#text"] !== "" && (
                <Thumbnail
                  style={styles.trackImage}
                  source={{
                    uri: track.track.album.image[3]["#text"]
                  }}
                />
              )}

            <View style={{ marginLeft: "auto", marginRight: "auto" }}>
              <Text>Love the song ?</Text>
              <View style={{ marginLeft: 25 }}>
                <TouchableOpacity onPress={trackLoveOrDetails}>
                  <Icon
                    style={{ fontSize: 70, color: "red" }}
                    name="heartbeat"
                    type="FontAwesome"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {track.track && track.track.wiki ? (
            <Text style={{ textAlign: "center" }}>
              {track.track.wiki.summary}
            </Text>
          ) : (
            <Fragment>
              <Text style={{ textAlign: "center" }}>
                Sorry there is no wiki about this artist
              </Text>
              <Text style={{ textAlign: "center", fontSize: 70 }}>😥</Text>
            </Fragment>
          )}
        </View>
      </Content>
    </ScrollView>
  ) : (
    <Spinner color="blue" />
  );
};
const styles = StyleSheet.create({
  artistImage: {
    height: 200,
    width: 200,
    alignSelf: "center",
    margin: 10,
    borderRadius: 100
  },
  trackImage: {
    height: 100,
    width: 150,
    alignSelf: "flex-start",
    margin: 10
  }
});
