import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export const CommunityScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Community Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});