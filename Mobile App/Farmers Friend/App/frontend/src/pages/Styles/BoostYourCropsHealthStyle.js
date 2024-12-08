import { StyleSheet } from "react-native";
const green = "#00C853";

export default StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flexDirection: "column",
    height: "100%",
  },
  firstHalfContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  firstHalfChild: {
    alignItems: "center",
  },
  secondHalfContainer: {
    backgroundColor: green,
    width: "100%",
  },
});
