import * as Screens from "../Screens";
import { createStackNavigator, createAppContainer } from "react-navigation";

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Screens.Home
    },
    FaceDetector: {
      screen: Screens.FaceDetector
    },
    Categories: {
      screen: Screens.Categories
    },
    Dashboard:{
      screen:Screens.Dashboard
    },
    Scores: {
      screen: Screens.Scores
    }
  },
  {
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

const Navigator = createAppContainer(StackNavigator);

export default Navigator;
