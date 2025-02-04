import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity>
          <Text>Hello</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Hello</Text>
        </TouchableOpacity>
      </View>
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
