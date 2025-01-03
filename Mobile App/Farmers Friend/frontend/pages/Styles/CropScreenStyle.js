const green = "#00C853";
const marginLeft = 5;
const marginRight = 10;
import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  weatherContainer: {
    width: 260,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: green,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Svg: {
    fontSize: 11,
  },
  weatherInfo: {
    flexDirection: "column",
    marginVertical: 5,
    alignItems: "center",
    borderRightWidth: 0.5,
    borderRightColor: "white",
    marginLeft: marginLeft,
  },
  weatherHeader: {
    color: "white",
    fontSize: 12,
    marginRight: marginRight,
  },
  weatherData: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
    paddingTop: 13, //note
    marginRight: marginRight,
  },
  cameraContainer: {
    position: "absolute", // Make it overlay everything
    height: height - 45,
    backgroundColor: "",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
