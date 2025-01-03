import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { TouchableOpacity, View, Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
const green = "#00C853";

export const VoiceModule = ({ recordingArray, setRecordingArray, onPress }) => {
  const [recording, setRecording] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access microphone was denied");
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const customRecordingOption = {
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true, //crucial for audio wave forms but haven't been implemented
      };
      const { recording } = await Audio.Recording.createAsync(
        customRecordingOption
      );

      setRecording(recording);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        console.log("Recording stopped");

        const { sound, status } = await recording.createNewLoadedSoundAsync();
        const newRecording = {
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI(),
        };
        onPress(newRecording); //pass recoding to gemini
        setRecording(undefined);
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const getDurationFormatted = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60; // Convert to minute
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60); // Convert to seconds
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  };

  return (
    <View style={{ marginLeft: 20 }}>
      <TouchableOpacity
        style={{
          paddingLeft: 20,
          paddingRight: 5,
        }}
        onPressIn={startRecording}
        onPressOut={() => {
          stopRecording();
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
            d="M11 17.5c0 1.096.271 2.129.75 3.035v.715a.75.75 0 0 1-1.493.102l-.007-.102v-2.268a6.75 6.75 0 0 1-6.246-6.496L4 12.25v-.5a.75.75 0 0 1 1.493-.102l.007.102v.5a5.25 5.25 0 0 0 5.034 5.246l.216.004zm.175-1.504A6.51 6.51 0 0 1 15 11.498V6a4 4 0 0 0-8 0v6a4 4 0 0 0 4.175 3.996M20 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m3 0a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-9.5 0a4 4 0 1 0 8 0a4 4 0 0 0-8 0"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};
