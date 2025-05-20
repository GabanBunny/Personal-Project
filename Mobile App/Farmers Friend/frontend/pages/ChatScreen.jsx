import CameraModule from "./ChatScreenComponents/CameraModule";
import { VoiceModule } from "./ChatScreenComponents/VoiceModule";
import {
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  StyleSheet,
} from "react-native";
import Svg, { Path, G, Rect } from "react-native-svg";
import { useState, useRef, useEffect } from "react";
import { GeminiChatBot } from "./AI_Models/ChatFeature/GeminiChatBot";
import * as FileSystem from "expo-file-system";
import { ChatMessages } from "./ChatScreenComponents/ChatMessages";

const { height, width } = Dimensions.get("window");
const green = "#00C853";
const fontSizeOfMessage = 14.5;
const iconSize = 45;

export const ChatScreen = ({ setHasCameraOpened }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [sentMessage, setSentMessage] = useState([]); //User Messages, photos, recordings
  const [toggleChatBotSetting, setToggleChatBotSetting] = useState(false);
  const [currentModel, setCurrentModel] = useState("Gemini 1.5 Flash");
  const textInputRef = useRef(null);
  const [sentMessageURI, setSentMessageURI] = useState([]); //specifically for transforming uri to base 64 before rendering

  useEffect(() => {
    const processedMessage = async () => {
      // Promise.all takes an array of promises and waits for them to resolve
      let updatedMessage = await Promise.all(
        sentMessage.map(async (obj, idx) => {
          if (idx % 2 == 0) {
            console.log("Normal text", obj);
            if (typeof obj === "object" && obj.hasOwnProperty("width")) {
              base64 = await uriToBase64(obj.uri);
              return { ...obj, uri: base64 }; // return the photo index obj
            }
          }
          return obj; //return text index obj
        })
      );
      setSentMessageURI(updatedMessage);
    };
    processedMessage();
  }, [sentMessage]);
  return (
    <View
      style={{
        // paddingTop: 25,
        flex: 1,
        position: "relative", //Reference point for camera modules
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {/* Chat content */}
      <ScrollView
        style={{
          flex: 1,
          width: width,
          height: height,
        }}
      >
        {toggleChatBotSetting ? (
          <View
            style={{
              position: "absolute",
              paddingTop: 40,
              paddingLeft: 20,
            }}
          >
            <View
              style={{
                width: "200",
                backgroundColor: "white",
                border: "solid",
                borderWidth: 0.3,
                borderRadius: 20,
                zIndex: 3,
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                  style={styles.modelOption}
                  onPress={() => setCurrentModel("Gemini 1.5 Flash 8B")}
                >
                  <Text>Gemini 1.5 Flash 8B</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modelOption}
                  onPress={() => setCurrentModel("Gemini 1.5 Flash")}
                >
                  <Text>Gemini 1.5 Flash</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modelOption}
                  onPress={() => setCurrentModel("Gemini 1.5 Pro")}
                >
                  <Text>Gemini 1.5 Pro</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}
        <View
          style={{
            width: "100%",
            height: "70",
            paddingBottom: 10,
            border: "solid",
            borderBottomWidth: 0.3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          {/* Change Gemini Model */}
          <TouchableOpacity
            onPress={() => {
              setToggleChatBotSetting(!toggleChatBotSetting);
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={iconSize - 10}
              height={iconSize - 10}
              viewBox="0 0 256 256"
            >
              <Path
                fill="#00C853"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m12-88a12 12 0 1 1-12-12a12 12 0 0 1 12 12m0-44a12 12 0 1 1-12-12a12 12 0 0 1 12 12m0 88a12 12 0 1 1-12-12a12 12 0 0 1 12 12"
              />
            </Svg>
          </TouchableOpacity>

          {/* Chatbot logo */}
          <View
            style={{
              borderRadius: 20,
              width: 50,
              backgroundColor: green,
              marginLeft: 90,
              marginTop: 5,
              marginBottom: 5,
              alignItems: "center",
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
            >
              <G
                fill={green}
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <Path d="M12 8V4H8" />
                <Rect width="16" height="12" x="4" y="8" rx="2" />
                <Path d="M2 14h2m16 0h2m-7-1v2m-6-2v2" />
              </G>
            </Svg>
          </View>
          <Text style={{ width: 130 }}>{currentModel}</Text>
        </View>
        {/* First Text */}
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 20,
            flex: 1,
            border: "solid",
            borderWidth: 0.5,
            borderRadius: 20,
            width: 250,
            height: 100,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: fontSizeOfMessage,
              marginLeft: 10,
            }}
          >
            Hi there! I'm Gemini, your farming assistant. I can help you with
            crop health tips, weather forecasts, pest management, and more! How
            can I assist you today?
          </Text>
        </View>

        {/*Show user message and gemini response */}
        <ChatMessages messages={sentMessageURI} />

        {/* Gemini response */}
      </ScrollView>

      {/* Border around */}
      <View
        style={{
          borderWidth: 0.3,
          border: "solid",
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          width: width,
          height: isPressed ? height : 40,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1, //Overlay the keyboard
            width: isPressed ? width : 40,
          }}
        >
          {/* Camera Icon  */}
          <CameraModule
            CropScreen={false}
            setIsPressed={setIsPressed}
            setSentMessage={setSentMessage}
            sentMessage={sentMessage}
            setHasCameraOpened={setHasCameraOpened}
          />
        </View>

        <VoiceModule
          recordingArray={sentMessage}
          setRecordingArray={setSentMessage}
          onPress={async (recording) => {
            Keyboard.dismiss(); //Hide the keyboard when sent an audio

            // Store user audio
            setSentMessage((previousMessage) => [
              ...previousMessage,
              recording,
            ]);
            const response = await textGemini(
              recording,
              sentMessage,
              currentModel
            );
            // Store gemini response
            setSentMessage((previousResponse) => [
              ...previousResponse,
              response.response.text(),
            ]);
          }}
        />

        {/* Keyboard input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : undefined}
          style={{
            alignSelf: "flex-start",
          }}
        >
          <TextInput
            ref={textInputRef}
            style={{
              flex: 1,
              width: width - 100,
            }}
            placeholder="Type here..."
            value={userInput} //Link the value displayed to value variable
            onChangeText={(input) => setUserInput(input)} // Directly set state// save user input
          />
        </KeyboardAvoidingView>

        {/* Send to Gemini */}
        <TouchableOpacity
          onPress={async () => {
            if (userInput.trim()) {
              Keyboard.dismiss(); //Hide the keyboard when sent a text
              // Send text
              setSentMessage((previousMessage) => [
                ...previousMessage,
                userInput,
              ]);
              setUserInput(""); //Clear content on keyboard after sent

              // Send Gemini
              const response = await textGemini(
                userInput,
                sentMessage,
                currentModel
              );
              setSentMessage((previousResponse) => [
                ...previousResponse,
                response.response.text(),
              ]);
            }
          }} // arrow function to run when done
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <Path
              fill={green}
              d="M3 20V4l19 8zm2-3l11.85-5L5 7v3.5l6 1.5l-6 1.5zm0 0V7z"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

async function textGemini(text, sentMessage, model) {
  const response = await GeminiChatBot({
    result: text,
    isPlantIDv3Input: false,
    sentMessage: sentMessage, //Multi round conversation
    selectedModel: model,
  });
  return response;
}

async function uriToBase64(fileURI) {
  var data;
  try {
    data = await FileSystem.readAsStringAsync(fileURI, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (error) {
    console.log("error changing audio to base 64", error);
  }
  return data;
}
