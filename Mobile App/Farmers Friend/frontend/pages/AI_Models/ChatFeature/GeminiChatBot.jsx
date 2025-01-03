import Constants from "expo-constants";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = Constants.expoConfig.extra.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import * as FileSystem from "expo-file-system";

export const GeminiChatBot = async ({
  result,
  isPlantIDv3Input,
  sentMessage,
}) => {
  console.log("getting chatbot answer");
  // Check which type of object is this
  const audio = result.hasOwnProperty("file");
  const photo = result.hasOwnProperty("width");

  // Get past 10 response or all current response for muti round conversation
  ObjectSentMessage = Object.values(sentMessage);
  const limitResponse =
    ObjectSentMessage.length < 10 ? ObjectSentMessage.length : 10;
  let histories = [];
  if (audio) {
    lastUserResponse = "audio taken from the user";
  }

  for (i = 0; i < limitResponse * 2; i += 2) {
    lastUserResponse = ObjectSentMessage[ObjectSentMessage.length - 2 - i];
    lastGeminiResponse = ObjectSentMessage[ObjectSentMessage.length - 1 - i];
    // If response is an object, than check if it's photo or audio
    if (typeof lastUserResponse === "object") {
      if (photo) {
        lastUserResponse = "photo taken by user";
      }
      if (audio) {
        lastUserResponse = "audio taken from the user";
      }
    }
    if (typeof lastUserResponse !== "undefined") {
      histories.unshift(
        {
          role: "user",
          parts: [{ text: JSON.stringify(lastUserResponse) }],
        },
        {
          role: "model",
          parts: [
            {
              text: JSON.stringify(lastGeminiResponse),
            },
          ],
        }
      );
    }
  }

  const chat = model.startChat({ history: histories });
  let response = {
    response: {
      text: () => "testing",
    },
  };

  if (isPlantIDv3Input) {
    const prompt = ` Please keep your response under 50 words. You are a biologist with focus on plant disease detection, based on this input. We need to focus on
    Disease: ${result.name},
    Disease Description: ${result.details.description},
    Disease Treatment: ${JSON.stringify(result.details.treatment)}.
    Can we have an in-depth discussion of about the diagnosis?      
    Remember to keep your response in under 100 words`;

    // Send Gemini
    try {
      // If is message or photo (photo already taken cared by plantIDv3)
      response = await chat.sendMessage(prompt);
    } catch (error) {
      console.log("Error getting response from Gemini", error);
    }
  } else {
    // Send Gemini
    try {
      if (!audio) {
        response = await chat.sendMessage(result);
      } else {
        const audioBase64 = await audioToBase64(result.file);
        response = await chat.sendMessage([
          {
            inlineData: {
              mimeType: "audio/aac",
              data: audioBase64,
            },
          },
          {
            text: "Response to the audio, keep it short and consise and response under 100 words",
          },
        ]);
      }
    } catch (error) {
      console.log("Error getting response from Gemini", error);
    }
  }
  return response;
};

async function audioToBase64(fileURI) {
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
