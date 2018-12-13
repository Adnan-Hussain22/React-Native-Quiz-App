import React from "react";
import { Content, Container, Button, Text as NativeText } from "native-base";
import { View, Text } from "react-native";
import { Basic } from "./styles";
export default class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: props.screenProps.Scores.scores,
      remarks: props.screenProps.Scores.remarks,
      remarksHead: props.screenProps.Scores.remarksHead
    };
  }

  handleNavigateQuizes = () => {
    this.props.navigation.replace("Categories");
  };

  render() {
    const { scores, remarksHead, remarks } = this.state;
    return (
      <View style={[Basic.container]}>
        <View style={[Basic.header]}>
          <View style={[Basic.circle]} />
        </View>
        <View style={[Basic.main]}>
          <View>
            <Text
              style={{
                fontSize: 75,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              {scores}%
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center"
              }}
            >
              {remarksHead}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center"
              }}
            >
              {remarks}
            </Text>
          </View>
        </View>
        <Container style={[Basic.footer]}>
          <Content>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Button
                rounded
                dark
                style={{ width: 140, padding: 25 }}
                onPress={this.handleNavigateQuizes}
              >
                <NativeText style={{ textAlign: "center" }}>Quizes</NativeText>
              </Button>
            </View>
          </Content>
        </Container>
      </View>
    );
  }
}
