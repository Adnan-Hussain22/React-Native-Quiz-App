import React from "react";
import { Content, Container, Button, Text as NativeText } from "native-base";
import { View, Text } from "react-native";
import { Basic } from "./styles";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFaceDetector = ()=>{
    this.props.navigation.navigate('FaceDetector');
  }

  render() {
    return this.renderHomeScreen();
  }

  renderHomeScreen = () => {
    return (
      <View style={[Basic.container]}>
        {this.renderHeader()}
        {this.renderMain()}
        {this.renderFooter()}
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={[Basic.header]}>
        <View style={[Basic.circle]} />
      </View>
    );
  };

  renderMain = () => {
    return (
      <View style={[Basic.main]}>
        <View>
          <Text
            style={{
              fontSize: 85,
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            25
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
            25 types of mixed level quizes
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
            test your skills
          </Text>
        </View>
      </View>
    );
  };

  renderFooter = () => {
    return (
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
              style={{ width: 130, padding: 25 }}
              onPress={this.handleFaceDetector}
            >
              <NativeText style={{ textAlign: "center" }}>Login</NativeText>
            </Button>
          </View>
        </Content>
      </Container>
    );
  };
}
