import { StyleSheet } from "react-native";
const green = "#00C853";
const marginLeft = 5;
const marginRight = 10;

export default StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "white",
  },
  container: {
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  weatherContainer: {
    width: 260,
    paddingTop: 20,
    paddingBottom: 20, // note
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
});
