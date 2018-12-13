import React from "react";
import { Text, View } from "react-native";
import {
  Container,
  Content,
  Text as NativeText,
  List,
  ListItem,
  Icon,
  Left,
  Right,
  Header
} from "native-base";
import { styles } from "./styles";
export default class Categories extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCategoriesClick = (value, name) => {
    this.props.screenProps.Categories.handleCategoriesClick(value, name);
    this.props.navigation.navigate('Dashboard');
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "black" }} />
        <Content>
          <List>
            {categories.map((value, index) => (
              <ListItem
                key={value.value}
                onPress={() => {
                  this.handleCategoriesClick(value.name, value.value);
                }}
              >
                <Left>
                  <NativeText>{value.name}</NativeText>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const categories = [
  { value: "any", name: "Any Category" },
  { value: "9", name: "General Knowledge" },
  { value: "10", name: "Entertainment: Books" },
  { value: "11", name: "Entertainment: Film" },
  { value: "12", name: "Entertainment: Music" },
  { value: "13", name: "Entertainment: Musicals Theatres" },
  { value: "14", name: "Entertainment: Television" },
  { value: "15", name: "Entertainment: Video Games" },
  { value: "16", name: "Entertainment: Board Games" },
  { value: "17", name: "Science Nature" },
  { value: "18", name: "Science: Computers" },
  { value: "19", name: "Science: Mathematics" },
  { value: "20", name: "Mythology" },
  { value: "21", name: "Sports" },
  { value: "22", name: "Geography" },
  { value: "23", name: "History" },
  { value: "24", name: "Politics" },
  { value: "25", name: "Art" },
  { value: "26", name: "Celebrities" },
  { value: "27", name: "Animals" },
  { value: "28", name: "Vehicles" },
  { value: "29", name: "Entertainment: Comics" },
  { value: "30", name: "Science: Gadgets" },
  { value: "31", name: "Entertainment: Japanese Anime Manga" },
  { value: "32", name: "Entertainment: Cartoon Animations" }
];
