import React from "react";
import { View, Text, Button, ToastAndroid } from "react-native";
import {
  Button as NativeButton,
  Text as NativeText,
  Container,
  Content
} from "native-base";
import { Camera, Permissions, FaceDetector as expoFaceDetector } from "expo";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
export default class FaceDetector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      faces: [],
      image: null,
      visible: false,
      toastMsg: ""
    };
  }

  componentDidMount() {
    this.handleAskPermission();
  }

  handleAskPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  handleSwitchMode = () => {
    const { type } = this.state;
    if (type == Camera.Constants.Type.front)
      this.setState({ type: Camera.Constants.Type.back });
    else this.setState({ type: Camera.Constants.Type.front });
  };

  handleSnap = async () => {
    if (this.camera) {
      const { uri } = await this.camera.takePictureAsync();
      this.setState({ image: uri });
      const snap = await this.handleDetectFaces(uri);
      if (snap.faces.length) {
        this.props.navigation.replace("Categories");
      } else {
        console.log("not detected");
        this.setState({ toastMsg: "No faces found try again!", visible: true });
      }
    }
  };

  handleDetectFaces = async uri => {
    console.log("handleDetectFaces");
    const options = {
      mode: expoFaceDetector.Constants.Mode.fast
    };
    // eslint-disable-next-line no-return-await
    return await expoFaceDetector.detectFacesAsync(uri, options);
  };

  render() {
    const { hasCameraPermission, toastMsg, visible } = this.state;
    return (
      <View style={styles.container}>
        <Toast visible={visible} message={toastMsg} />
        {hasCameraPermission
          ? this.renderDetectorContainer()
          : this.hasCameraPermission == null
          ? this.renderPermissionError1()
          : this.renderPermissionError2()}
      </View>
    );
  }

  renderPermissionError1 = () => {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.textCenter}>
          Please allow the camera permission
        </Text>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20
          }}
        >
          <NativeButton
            rounded
            dark
            style={{ padding: 25 }}
            onPress={this.handleAskPermission}
          >
            <NativeText style={{ textAlign: "center" }}>Camera</NativeText>
          </NativeButton>
        </View>
      </View>
    );
  };

  renderPermissionError2 = () => {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.text}>
          {`No access to camera\nPlease allow access to camera from settings to continue`}
        </Text>
      </View>
    );
  };

  renderDetectorContainer = () => {
    return (
      <View style={styles.container}>
        {/* {this.renderHeader()} */}
        {this.renderCamera()}
        {this.renderFooter()}
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.cameraHeader}>
        <Ionicons
          name="md-sync"
          size={40}
          color="#808080"
          onPress={this.handleSwitchMode}
        />
      </View>
    );
  };

  renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        />
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.cameraFooter}>
        <Ionicons
          name="md-sync"
          size={72}
          color="#808080"
          onPress={this.handleSwitchMode}
        />
        <Ionicons
          name="md-radio-button-on"
          size={72}
          color="#808080"
          onPress={this.handleSnap}
        />
      </View>
    );
  };
}

const Toast = props => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};
