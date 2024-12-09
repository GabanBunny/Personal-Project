import React from "react";
import { View, StyleSheet } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

export const CameraScreen = () => {
  const phone = useCameraDevices();
  const device = phone.back;

  if (device == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return <Camera style={{ flex: 1 }} device={device} inActive={true} />;
};
