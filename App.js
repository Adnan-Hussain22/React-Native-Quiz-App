import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation/AppNavigator";
const apiEndPoint = `https://opentdb.com/api.php?amount=10`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: apiEndPoint,
      category: null,
      fontLoaded: false,
      scores: null,
      remarks: null,
      remarksHead: null
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  handleCategoriesClick = (name, value) => {
    let api = apiEndPoint;
    if (Number(value)) api = apiEndPoint + `&category=${value}`;
    this.setState({ api: apiEndPoint + `&category=${value}`, category: name });
  };

  handleValidateScores = scores => {
    if (scores >= 65)
      this.setState({
        remarks: "you have passed the quiz",
        remarksHead: "Congractulations",
        scores
      });
    else
      this.setState({
        remarks: "you have failed the quiz",
        remarksHead: "Sorry",
        scores
      });
  };

  render() {
    const { remarks, remarksHead, scores, api, category } = this.state;
    return (
      this.state.fontLoaded && (
        <Navigation
          screenProps={{
            Categories: { handleCategoriesClick: this.handleCategoriesClick },
            Quiz: {
              api,
              category,
              handleValidateScores: this.handleValidateScores
            },
            Scores: { remarks, remarksHead, scores }
          }}
        />
      )
    );
  }
}

export default App;
