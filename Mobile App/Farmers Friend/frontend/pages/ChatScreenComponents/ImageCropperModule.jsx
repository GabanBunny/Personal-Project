import { useState, useEffect } from "react";
import { ImageEditor } from "expo-crop-image";
import * as FileSystem from "expo-file-system";
import { GeminiChatBot } from "../AI_Models/ChatFeature/GeminiChatBot";
import { PlantIDv3ImageDetection } from "../AI_Models/ImageDetection/PlantIDv3ImageDetection";

export default function ImageCropperModule({
  uri,
  setPhoto,
  CropScreen,
  setCameraState,
  setIsPressed,
  setPlantIDans,
  setSentMessage,
  sentMessage,
  setHasCameraOpened,
}) {
  return (
    <ImageEditor
      imageUri={uri}
      fixedAspectRatio={1 / 1}
      minimumCropDimensions={{
        width: 50,
        height: 50,
      }}
      onEditingCancel={() => {
        setPhoto(null);
      }}
      onEditingComplete={async (photo) => {
        let photoBase64 = await uriToBase64(photo.uri);
        setPhoto(null);
        await sendPlantIDv3(
          CropScreen,
          setPlantIDans,
          setSentMessage,
          sentMessage,
          photo,
          photoBase64
        );
        setHasCameraOpened(false);

        // Close camera and set is Pressed
        CropScreen ? null : setCameraState(false);
        CropScreen ? null : setIsPressed(false);
      }}
    />
  );
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

async function sendPlantIDv3(
  CropScreen,
  setPlantIDans,
  setSentMessage,
  sentMessage,
  photo,
  photoBase64
) {
  console.log("getting response from plantID v3");
  // var result = await PlantIDv3ImageDetection({ base64Image: photoBase64 });
  // Sample
  var result = {
    // Disease 1
    details: {
      description:
        "Water excess and uneven watering are abiotic disorders caused by inadequate watering. Water excess may lead to rotting of the roots due to lack of oxygen, and higher susceptibility to infection. Symptoms of over-watering include stunted growth, yellow and brown leaves, wilting and higher susceptibility to leaf burn.",
      entity_id: "e5eed7f688efa59e",
      language: "en",
      treatment: {
        biological: [
          "Introduce mycorrhizal fungi to improve root water uptake.",
        ],
        prevention: [
          "Improve soil drainage by adding sand or gravel to heavy clay soils.",
        ],
      },
    },
    id: "e5eed7f688efa59e",
    name: "water excess or uneven watering",
    probability: 0.4724,

    // details: {
    //   description:
    //     "Disorders induced by organisms from the animal kingdom. These pests cause direct damage by feeding on leaves, stems, roots, and other parts of the plant or by inhabiting plant tissues. Pests can also spread bacterial and viral diseases.",
    //   entity_id: "d24ebab7c0155e4b",
    //   language: "en",
    //   treatment: {
    //     biological: ["Use predatory insects like ladybugs."],
    //     chemical: ["Apply insecticides as per recommendations."],
    //     prevention: ["Maintain plant health and use crop rotation."],
    //   },
    // },
    // id: "d24ebab7c0155e4b",
    // name: "Animalia",
    // probability: 0.5544,
    // details: {
    //   description:
    //     "Fungi take energy from the plants on which they live, causing damage to the plant. Fungal infections are responsible for approximately two-thirds of infectious plant diseases and cause wilting, molding, rusts, scabs, rotted tissue, and other problems.",
    //   entity_id: "7f22438065988f95",
    //   language: "en",
    //   treatment: {
    //     biological: [Array],
    //     chemical: [Array],
    //     prevention: [Array],
    //   },
    // },
    // id: "7f22438065988f95",
    // name: "Fungi",
    // probability: 0.5162,
    // "details": {
    //   "description": "Plant death occurs when all parts of the plant (including stems and roots) irreversibly lose their vitality. The dead plant usually loses its leaves or has brown leaves and mushy stems and roots.",
    //   "treatment": {},
    //   "language": "en",
    //   "entity_id": "03209d77216b14d8"
    // }"id": "03209d77216b14d8",
    // "name": "dead plant",
    // "probability": 0.0634,
  };
  setPlantIDans(result);

  if (!CropScreen) {
    // Store photo base64 as a string (from user taking picture)
    setSentMessage((previousUserMessage) => [...previousUserMessage, photo]);

    result = await GeminiChatBot({
      result: result,
      isPlantIDv3Input: true,
      sentMessage: sentMessage,
    });

    result = result.response.text();
    // // Store Gemini response
    setSentMessage((previousGeminiMessage) => [
      ...previousGeminiMessage,
      result,
    ]);
  }
}
