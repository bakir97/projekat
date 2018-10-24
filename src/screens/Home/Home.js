import React, { Component } from "react";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Root,
  Toast
} from "native-base";
import { connect } from "react-redux";
import { AsyncStorage, FlatList } from "react-native";
import {
  getCountries,
  getCountriesToRedux,
  countriesError
} from "../../redux/actions/getCountriesActions";
class Home extends Component {
  state = {
    search: "",
    countries: []
  };
  componentDidMount() {
    AsyncStorage.getItem("countries").then(countries => {
      if (countries) {
        const convertedCountries = JSON.parse(countries);
        this.props.getCountriesToRedux(convertedCountries);
        return;
      }
      return this.props.getCountries();
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errorCountries) {
      this.props.countriesError(false);
      Toast.show({
        text: "Opss Something Went Wrong",
        buttonText: "Okay",
        duration: 5000
      });
    }
  }
  componentDidUpdate(nextProps) {
    if (this.state.countries.length === 0 && nextProps.countries) {
      this.setState({ countries: nextProps.countries });
    }
  }

  changeSearch = e => {
    this.setState({ search: e });
  };
  displayCountries = filteredCountries => {
    return (
      <FlatList
        data={filteredCountries}
        renderItem={({ item }) => (
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("Tracks", { name: item.name })
            }
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: `http://flags.fmcdn.net/data/flags/w580/${item.alpha2Code.toLowerCase()}.png`
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
            </Body>
          </ListItem>
        )}
        keyExtractor={item => item.name}
      />
    );
  };
  render() {
    const { search, countries } = this.state;
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
    return (
      <Root>
        <Container style={{ marginTop: 24 }}>
          <Header searchBar rounded style={{ backgroundColor: "#4286f4" }}>
            <Item>
              <Icon name="search" />
              <Input
                value={search}
                onChangeText={this.changeSearch}
                placeholder="Search"
              />
              <Icon name="flag" type="Entypo" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <List>{this.displayCountries(filteredCountries)}</List>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.Countries.countries,
  errorCountries: state.Countries.error
});

const mapDispatchToProps = {
  getCountries,
  getCountriesToRedux,
  countriesError
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
