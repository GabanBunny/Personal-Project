import BoostYourCropsHealthStyle from "../Styles/BoostYourCropsHealthStyle";
import { Text, SafeAreaView, View } from "react-native";

import { FirstHalf } from "./FirstHalf";
import { SecondHalf } from "./SecondHalf";

export const BoostYourCropsHealthComponents = () => {
  return (
    <SafeAreaView>
      <View style={BoostYourCropsHealthStyle.wrapper}>
        <Text>Boost your Crops health</Text>
        <FirstHalf BoostYourCropsHealthStyle={BoostYourCropsHealthStyle} />
        <SecondHalf BoostYourCropsHealthStyle={BoostYourCropsHealthStyle} />
      </View>
    </SafeAreaView>
  );
};
