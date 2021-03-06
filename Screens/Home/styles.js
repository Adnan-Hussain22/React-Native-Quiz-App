import { StyleSheet } from "react-native";
const Basic = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1
  },
  main: {
    flex: 3,
    paddingTop: 20
  },
  footer: {
    flex: 1
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "black",
    marginTop: 30
  },
  cameraActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    padding: 10
  }
});

export { Basic };
