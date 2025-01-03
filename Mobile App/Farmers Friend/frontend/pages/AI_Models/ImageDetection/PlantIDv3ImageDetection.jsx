import Constants from "expo-constants";
const API_KEY = Constants.expoConfig.extra.REACT_APP_PLANT_ID_API_KEY;

export const PlantIDv3ImageDetection = async ({ base64Image }) => {
  var endpoint = "https://api.plant.id/v3/health_assessment";
  var settings = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-key": API_KEY },
    body: JSON.stringify({ images: [base64Image], health: "all" }),
  };

  try {
    var response = await fetch(endpoint, settings);
    if (response.ok) {
      var result = await response.json();
      try {
        endpoint = `https://plant.id/api/v3/identification/${result.access_token}?details=treatment,description`;
        settings = {
          method: "GET",
          headers: {
            "Api-key": API_KEY,
          },
        };
        response = await fetch(endpoint, settings);
        if (response.ok) {
          result = await response.json();
          // Find the disease with the highest probability 
          let max = 0;
          let ans = null;
          result.result.disease.suggestions.forEach((suggestion) => {
            max =
              suggestion.probability > max
                ? (max = suggestion.probability) && (ans = suggestion)
                : (max = max);
          });
          return ans;
        } else {
          console.log("error getting results from PlantIDv3");
          return null;
        }
      } catch (error) {
        console.log("Error getting identification from PlantIDv3");
        return null;
      }
    } else {
      console.log("error getting assessement from PlantIDv3");
      return null;
    }
  } catch (error) {
    console.log("Error getting response from PlantIDv3", error);
    return null;
  }
};
