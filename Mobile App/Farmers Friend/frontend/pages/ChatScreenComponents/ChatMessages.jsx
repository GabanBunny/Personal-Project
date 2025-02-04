import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import Svg, { Path, G, Rect } from "react-native-svg";
import * as FileSystem from "expo-file-system";

const green = "#00C853";
const fontSizeOfMessage = 14.5;
const iconSize = 45;

export const ChatMessages = React.memo(({ messages }) => {
  return (
    <>
      {messages.map((text, index) => (
        <View key={index}>
          {index % 2 == 0 && message(text, false)}
          {index % 2 != 0 && message(text, true)}
        </View>
      ))}
    </>
  );
});

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
            source={{ uri: `data:image/jpeg;base64,${text.uri}` }}
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
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
