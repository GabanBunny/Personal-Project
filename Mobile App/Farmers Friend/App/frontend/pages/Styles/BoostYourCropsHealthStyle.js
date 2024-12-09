import { StyleSheet } from "react-native";
const green = "#00C853";

export default StyleSheet.create({
  wrapper: {
    marginTop: 20,
    flexDirection: "column",
    height: "100%",
  },
  firstHalfContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  firstHalfChild: {
    alignItems: "center",
  },
  secondHalfContainer: {
    marginTop: 20,
    backgroundColor: green,
    width: "70%",
    height: "5%",
    borderRadius: 15,
    flexDirection: "column",
    alignSelf: "center",
  },
});
