import React, { useEffect, useState } from "react";
import CropScreenStyle from "./Styles/CropScreenStyle";
import { UvWindHumidityComponents } from "./CropScreenComponents/UvWindHumidityComponents";
import { DailyWeatherComponent } from "./CropScreenComponents/DailyWeatherComponent";
import { View, Text } from "react-native";
import { BoostYourCropsHealthComponents } from "./BoostYourCropsHealthComponents/BoostYourCropsHealthComponent";

const WeatherAPI =
  "https://api.open-meteo.com/v1/forecast?latitude=-33.8678&longitude=151.2073&hourly=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto";
export const CropsScreen = () => {
  const [weatherData, setWeatherData] = React.useState({});
  useEffect(() => {
    console.log("useEffect triggered");
    getWeatherData().then((inputData) => {
      setWeatherData(inputData);
    });
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={CropScreenStyle.wrapper}>
        <Text style={CropScreenStyle.text}>Hello User</Text>
        <Text style={CropScreenStyle.text}>Today's Weather</Text>
        <UvWindHumidityComponents
          CropScreenStyle={CropScreenStyle}
          weatherData={weatherData}
        />

        <DailyWeatherComponent
          CropScreenStyle={CropScreenStyle}
          weatherData={weatherData}
        />
        <BoostYourCropsHealthComponents />
      </View>
    </View>
  );
};

async function getWeatherData() {
  try {
    const response = await fetch(WeatherAPI);
    if (response.ok) {
      console.log("fetching data");
      const data = await response.json();
      return data;
    } else {
      console.log("Error response from API server");
      return null;
    }
  } catch (e) {
    console.log("Error getting Weather Data", e);
    return null;
  }
}
