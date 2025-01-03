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
} from "react-native";
import Svg, { Path, G } from "react-native-svg";
import { useState } from "react";
import { GeminiChatBot } from "./AI_Models/ChatFeature/GeminiChatBot";

const { height, width } = Dimensions.get("window");
const green = "#00C853";
const fontSizeOfMessage = 14.5;

export const ChatScreen = ({ setHasCameraOpened }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [sentMessage, setSentMessage] = useState([]); //User Messages, photos, recordings
  return (
    <View
      style={{
        paddingTop: 25,
        flex: 1,
        position: "relative", //Reference point for camera modules
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#fff",
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
        {sentMessage.map((text, index) => {
          return (
            <View key={index}>
              {/* User Input */}
              {index % 2 == 0 && message(text, false)}

              {/* Gemini response */}
              {index % 2 != 0 && message(text, true)}
            </View>
          );
        })}

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
            const response = await textGemini(recording, sentMessage);
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
            style={{
              flex: 1,
              width: width - 100,
            }}
            placeholder="Type here..."
            value={userInput} //Link the value displayed to value variable
            onChangeText={(Input) => setUserInput(Input)} // save user input
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
              const response = await textGemini(userInput, sentMessage);
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

async function textGemini(text, sentMessage) {
  const response = await GeminiChatBot({
    result: text,
    isPlantIDv3Input: false,
    sentMessage: sentMessage, //Multi round conversation
  });
  return response;
}

function message(text, gemini) {
  //User message
  if (typeof text === "string") {
    return (
      <View
        style={{
          marginRight: 20,
          marginBottom: 20,
          marginLeft: 20,
          border: "solid",
          borderWidth: 0.5,
          borderRadius: 20,
          minWidth: 10,
          maxWidth: 250,
          alignSelf: gemini ? "flex-start" : "flex-end",
        }}
      >
        <Text
          style={{
            margin: 9,
            fontSize: fontSizeOfMessage,
          }}
        >
          {text}
        </Text>
      </View>
    );
  }
  const audio = text.hasOwnProperty("duration");
  const photo = text.hasOwnProperty("width");
  if (typeof text === "object") {
    if (photo) {
      text = text.base64;
      return (
        <View>
          <Image
            style={{
              marginRight: 20,
              marginBottom: 20,
              marginLeft: 20,
              border: "solid",
              borderWidth: 0.5,
              borderRadius: 20,
              width: 150,
              height: 150,
              alignSelf: gemini ? "flex-start" : "flex-end",
            }}
            source={{ uri: `data:image/jpeg;base64,${text}` }}
          />
        </View>
      );
    }
    if (audio) {
      return (
        <View
          style={{
            justifyContent: "center",
            marginRight: 20,
            marginBottom: 20,
            marginLeft: 20,
            border: "solid",
            borderWidth: 0.5,
            borderRadius: 20,
            width: 150,
            height: 50,
            alignSelf: gemini ? "flex-start" : "flex-end",
          }}
        >
          <View
            style={{
              width: 140,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/*Play audio */}
            <View>
              <TouchableOpacity
                style={{
                  width: 30,
                  alignItems: "center",
                }}
                onPress={() => text.sound.replayAsync()}
              >
                {/* Play icon */}
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <G fill={green} fill-rule="evenodd">
                    <Path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <Path
                      fill={green}
                      d="M5.669 4.76a1.47 1.47 0 0 1 2.04-1.177c1.062.454 3.442 1.533 6.462 3.276c3.021 1.744 5.146 3.267 6.069 3.958c.788.591.79 1.763.001 2.356c-.914.687-3.013 2.19-6.07 3.956c-3.06 1.766-5.412 2.832-6.464 3.28c-.906.387-1.92-.2-2.038-1.177c-.138-1.142-.396-3.735-.396-7.237c0-3.5.257-6.092.396-7.235"
                    />
                  </G>
                </Svg>
                {/* WaveForm */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Text>{text.duration}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

function generateWaveForm(data) {
  const waveForm = [];
  const amplitude = 100;
  for (let i = 0; i < data.length; i += amplitude) {
    waveForm.push(data[i]);
  }
  return waveForm;
}
