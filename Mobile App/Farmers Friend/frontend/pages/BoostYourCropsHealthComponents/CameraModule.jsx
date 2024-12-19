import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import Svg, { Path, Circle } from "react-native-svg";

const green = "#00C853";
const TakePictureCircleWidth = 95;
const { height, width } = Dimensions.get("window");

export default function Camera() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraState, setCameraState] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    console.debug(photo);
  };

  return (
    <View style={styles.container}>
      {cameraState ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          CameraType={CameraType}
          ref={cameraRef}
        >
          <View style={styles.buttonInsideContainer}>
            {/* Flip */}
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={(TakePictureCircleWidth * 2) / 3}
                height={TakePictureCircleWidth}
                viewBox="0 0 24 24"
              >
                <Path
                  fill="#fff"
                  d="M9 12c0 1.66 1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3"
                />
                <Path
                  fill="#fff"
                  d="M8 10V8H5.09C6.47 5.61 9.05 4 12 4c3.72 0 6.85 2.56 7.74 6h2.06c-.93-4.56-4.96-8-9.8-8c-3.27 0-6.18 1.58-8 4.01V4H2v6zm8 4v2h2.91c-1.38 2.39-3.96 4-6.91 4c-3.72 0-6.85-2.56-7.74-6H2.2c.93 4.56 4.96 8 9.8 8c3.27 0 6.18-1.58 8-4.01V20h2v-6z"
                />
              </Svg>
            </TouchableOpacity>
            {/* Take Picture */}
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={TakePictureCircleWidth}
                height={TakePictureCircleWidth}
                viewBox="0 0 32 32"
              >
                <Circle cx="16" cy="16" r="10" fill="#fff" />
                <Path
                  fill="#fff"
                  d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4"
                />
              </Svg>
            </TouchableOpacity>
            {/*Close Camera  */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCameraState(false)}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={(TakePictureCircleWidth * 2) / 3}
                height={TakePictureCircleWidth}
                viewBox="0 0 24 24"
              >
                <Path
                  fill="#fff"
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.containerClose}>
          <TouchableOpacity
            style={styles.openCameraButton}
            onPress={() => setCameraState(true)}
          >
            <Text style={styles.text}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerClose: {},
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonInsideContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 30,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    // color: "#ff5c5c",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    margin: 10,
    textAlign: "center",
  },
  openCameraButton: {
    position: "absolute",
    bottom: -150,
    borderRadius: 20,
    width: 250,
    alignSelf: "center",
    backgroundColor: green,
  },
});
