import { GeminiChatBot } from "../ChatFeature/GeminiChatBot";

export const MobileNetV2ImageDetection = async ({ base64Image }) => {
  const endpoint = "http://192.168.18.83:5001/api-MobileNetV2";
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64Image: base64Image }),
  };
  try {
    let response = await fetch(endpoint, settings);
    if (response.ok) {
      const data = await response.json();
      let description = await textGemini(data, "description");
      let biological = await textGemini(data, "biological treatment");
      let chemical = await textGemini(data, "chemical treatment");
      let prevention = await textGemini(data, "prevention treatment");
      response = {
        details: {
          description: description.trim(),
          treatment: {
            biological: biological.trim(),
            chemical: chemical.trim(),
            prevention: prevention.trim(),
          },
        },
        name: data["disease"][0].toUpperCase() + data["disease"].slice(1),
      };
      return response;
    } else {
      console.log("Server error", data);
      return null;
    }
  } catch (error) {
    console.log("Error Calling MobileNet API", error);
    return null;
  }
};

async function textGemini(data, parameter) {
  let response;
  try {
    response = await GeminiChatBot({
      result: data,
      mobileNetV2: true,
      parameter: parameter,
    });
    return response;
  } catch (error) {
    console.log("Error getting response from GeminiChatBot", error);
    return null;
  }
}
