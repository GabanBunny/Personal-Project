import Constants from "expo-constants";
const API_KEY = Constants.expoConfig.extra.REACT_APP_GPT_API_KEY;
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: API_KEY });
import * as FileSystem from "expo-file-system";

export const GPTImageDetection = async ({ imageURI }) => {
  try {
    const base64Image = await FileSystem.readAsStringAsync(imageURI, {
      encoding: FileSystem?.EncodingType?.Base64,
    });
    console.log("success");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What is in this image" },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0].message);
  } catch (error) {
    console.log("Error getting response from GPT", error);
  }
};
