import BoostYourCropsHealthStyle from "../Styles/BoostYourCropsHealthStyle";
import { Text, SafeAreaView, View, Button } from "react-native";
import { FirstHalf } from "./FirstHalf";

export const BoostYourCropsHealthComponents = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={BoostYourCropsHealthStyle.wrapper}>
        <Text style={{ fontWeight: "bold", marginLeft: 20, fontSize: 17 }}>
          Boost your Crops health
        </Text>
        <FirstHalf BoostYourCropsHealthStyle={BoostYourCropsHealthStyle} />
      </View>
    </SafeAreaView>
  );
};
