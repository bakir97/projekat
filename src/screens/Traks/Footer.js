import React from "react";
import { Button, Icon, Footer, FooterTab, Text } from "native-base";
export default ({ page, nextPage, backPage }) => {
  return (
    <Footer style={{ position: "absolute", bottom: 0 }}>
      <FooterTab style={{ backgroundColor: "#4286f4" }}>
        <Button onPress={backPage}>
          <Icon
            name="arrow-left"
            type="Feather"
            style={page === 1 ? { color: "transparent" } : { color: "white" }}
          />
        </Button>
        <Text style={{ alignSelf: "center" }}>Page {page}</Text>
        <Button onPress={nextPage}>
          <Icon name="arrow-right" type="Feather" style={{ color: "white" }} />
        </Button>
      </FooterTab>
    </Footer>
  );
};
