import { StyleSheet } from "react-native";
const green = "#00C853";

export default StyleSheet.create({
  wrapper: {
    marginTop: 20,
    flexDirection: "column",
    height: "400",
  },
  firstHalfContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    // flex: 1,
  },
  firstHalfChild: {
    alignItems: "center",
  },
});
