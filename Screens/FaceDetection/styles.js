import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerCenter: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: 30,
  },
  text: {
    fontSize: 17
  },
  textCenter: {
    fontSize: 17,
    textAlign:'center'
  },
  cameraHeader: {
    flex: 0.5,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  cameraFooter: {
    flex: 0.6,
    backgroundColor: "black",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  cameraContainer: {
    flex: 4,
    backgroundColor: "white"
  }
});

export default styles;
