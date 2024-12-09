import { Text, View, Button } from "react-native";
import Svg, { Path, Ellipse } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const green = "#00C853";
const width = 100;
const height = 70;
export const SecondHalf = ({ BoostYourCropsHealthStyle }) => {
  const nav = useNavigation();
  return (
    <View style={BoostYourCropsHealthStyle.secondHalfContainer}>
      <Text>Now</Text>
      <Button
        title="Open Camera"
        onPress={() => nav.navigate("CameraScreen")}
      />
    </View>
  );
};
