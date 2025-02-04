import GPTImageDetection from "../AI_Models/ImageDetection/GPTImageDetection.jsx";
import OllamaImageDetection from "../AI_Models/ImageDetection/OllamaImageDetection.jsx";
import { PlantIDv3ImageDetection } from "../AI_Models/ImageDetection/PlantIDv3ImageDetection";
import { GeminiChatBot } from "../AI_Models/ChatFeature/GeminiChatBot";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Keyboard,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import ImageCropperModule from "./ImageCropperModule.jsx";

const green = "#00C853";
const RecGreen = "#4CAF50";
const RecGrey = "#828896";
const TakePictureCircleWidth = 95;
const { height, width } = Dimensions.get("window");

// setIsPressed for closing camera after taking photo
// setSentMessage for rendering images from user and response from gemini
export default function Camera({
  CropScreen,
  setIsPressed,
  setSentMessage,
  sentMessage,
  setHasCameraOpened,
}) {
  const [plantIDans, setPlantIDans] = useState(null);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraState, setCameraState] = useState(false);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

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
    const photo = await cameraRef.current.takePictureAsync({
      base64: true,
    });
    setPhoto(photo);
  };
  return (
    <View style={styles.container}>
      {cameraState ? (
        <CameraView
          style={{
            height: CropScreen ? height + 50 : height + 50,
            top: CropScreen ? 0 : -20,
          }}
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
              {photo ? (
                <View style={{}}>
                  <ImageCropperModule
                    uri={photo.uri}
                    photo={photo}
                    setPhoto={setPhoto}
                    CropScreen={CropScreen}
                    setCameraState={setCameraState}
                    setIsPressed={setIsPressed}
                    setPlantIDans={setPlantIDans}
                    setSentMessage={setSentMessage}
                    sentMessage={sentMessage}
                    setHasCameraOpened={setHasCameraOpened}
                  />
                </View>
              ) : (
                <View></View>
              )}
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
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                await takePhoto(); //Wait for the photo to finish taking
              }}
            >
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
              onPress={() => {
                setHasCameraOpened(true); //show the tab bar
                setCameraState(false);
                setPlantIDans(null);
                CropScreen ? null : setIsPressed(false); //If chatbot screen then reset the position as well
              }}
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

          {/* Chatbot answer for CropScreen*/}
          {plantIDans && CropScreen ? (
            <View style={styles.chatbotContainer}>
              <View style={styles.chatbotAnswer}>
                <View>
                  <Text
                    style={{ fontWeight: "bold", margin: "13", fontSize: 25 }}
                  >
                    {plantIDans.name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: RecGrey,
                      marginLeft: "7.5",
                      marginRight: "7.5",
                      marginBottom: "10",
                      fontSize: 15,
                    }}
                  >
                    {plantIDans.details.description}
                  </Text>
                </View>
                {/* Render array of treatment suggestion */}
                <View>
                  {Object.entries(plantIDans.details.treatment).map(
                    ([Treatment, Recommendation], Index) => {
                      // Make the first letter of treatment upper case
                      Treatment =
                        Treatment.charAt(0).toUpperCase() + Treatment.slice(1);
                      return (
                        <View key={Index}>
                          {/* Treatment name */}
                          <Text
                            style={{
                              color: RecGreen,
                              alignSelf: "left",
                              fontSize: 15,
                            }}
                          >
                            {Treatment}:
                          </Text>
                          {/* Treatment contents */}
                          <Text
                            style={{
                              marginLeft: "12",
                              padding: "5",
                              color: "#388E3C",
                              fontSize: 13,
                            }}
                          >
                            - {Recommendation}
                          </Text>
                        </View>
                      );
                    }
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: green,
                      width: 290,
                      height: 50,
                      marginTop: 10,
                      marginBottom: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      setPlantIDans(null);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      I Understand !
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </CameraView>
      ) : // Open Camera for CropsScreen
      CropScreen ? (
        <View style={styles.containerClose}>
          <TouchableOpacity
            style={styles.openCameraButton}
            onPress={() => {
              setCameraState(true);
              setHasCameraOpened(false); //hide the tab bar
            }}
          >
            <Text style={styles.text}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Open Camera for chatbot screen
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            setHasCameraOpened(false); //hide the tab bar
            Keyboard.dismiss(); //Hide the keyboard when open camera
            setCameraState(true);
            setIsPressed(true);
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <Path
              fill={green}
              d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 3a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3"
            />
          </Svg>
        </TouchableOpacity>
      )}
    </View>
  );
}
// }

const styles = StyleSheet.create({
  containerClose: {},
  chatbotContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    marginTop: height / 5,
  },
  chatbotAnswer: {
    borderRadius: 20,
    backgroundColor: "white",
    width: "310",
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
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
    paddingBottom: 20,
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
    bottom: -165,
    borderRadius: 20,
    width: 250,
    alignSelf: "center",
    backgroundColor: green,
  },
});
