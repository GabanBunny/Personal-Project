import React from "react";
import CropScreenStyle from "../Styles/CropScreenStyle";
import { Text, View, SafeAreaView, Image } from "react-native";
import moment from "moment";

const paddingTop = 1;
const widthIcon = 30;
const heightIcon = 30;
const weatherIconMap = {
  0: "01d", // Clear sky
  1: "02d", // Mainly clear
  2: "03d", // Partly cloudy
  3: "04d", // Overcast
  45: "50d", // Fog
  48: "50d", // Depositing rime fog
  51: "09d", // Drizzle: Light intensity
  53: "09d", // Drizzle: Moderate intensity
  55: "09d", // Drizzle: Dense intensity
  56: "13d", // Freezing drizzle: Light intensity
  57: "13d", // Freezing drizzle: Dense intensity
  61: "10d", // Rain: Slight intensity
  63: "10d", // Rain: Moderate intensity
  65: "10d", // Rain: Heavy intensity
  66: "13d", // Freezing rain: Light intensity
  67: "13d", // Freezing rain: Heavy intensity
  71: "13d", // Snow fall: Slight intensity
  73: "13d", // Snow fall: Moderate intensity
  75: "13d", // Snow fall: Heavy intensity
  77: "13d", // Snow grains
  80: "09d", // Rain showers: Slight
  81: "09d", // Rain showers: Moderate
  82: "09d", // Rain showers: Violent
  85: "13d", // Snow showers: Slight
  86: "13d", // Snow showers: Heavy
  95: "11d", // Thunderstorm: Slight or moderate
  96: "11d", // Thunderstorm with slight hail
  99: "11d", // Thunderstorm with heavy hail
};

export const DailyWeatherComponent = ({ CropScreenStyle, weatherData }) => {
  const timeIdxArr = [];

  const getHour = (i) => {
    let SydTimeZone = moment()
      .utcOffset(11 * 60)
      .add(i, "hours");

    for (let idx = 0; idx < weatherData?.hourly?.time.length; idx++) {
      if (
        weatherData?.hourly?.time[idx]?.slice(11, 13) ===
        SydTimeZone.format("HH")
      ) {
        timeIdxArr[i] = idx;
      }
    }
    // Get index in array of hour
    return i == 0 ? null : SydTimeZone.format("HH:mm");
  };
  const getHourlyWeather = (i) => {
    const weather = weatherData?.hourly?.temperature_2m[timeIdxArr[i]];
    return typeof weather == "number" ? weather.toFixed(0) : "N/A";
  };

  const getWeatherIcon = (i) => {
    const code = weatherData?.hourly?.weathercode[timeIdxArr[i]];
    const icon = weatherIconMap[code] || "01d"; // Default is clear sky
    return `https://openweathermap.org/img/wn/${icon}@2x.png` || "N/A";
  };

  return (
    <View style={CropScreenStyle.container}>
      <SafeAreaView>
        <View
          style={[
            CropScreenStyle.weatherContainer,
            { paddingBottom: 3, paddingTop: 15 },
          ]}
        >
          {/*  */}
          {/* Now */}
          <View style={[CropScreenStyle.weatherInfo, { borderRightWidth: 0 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[CropScreenStyle.weatherHeader]}>
                Now{getHour(0)}
              </Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>
              {getHourlyWeather(0)}
            </Text>
            <Text
              style={[
                CropScreenStyle.weatherData,
                ,
                { paddingTop: paddingTop },
              ]}
            >
              <Image
                source={{ uri: getWeatherIcon(0) }}
                style={{ width: widthIcon, height: heightIcon }} // Adjust size as needed
              />
            </Text>
          </View>
          {/*  */}
          {/* hour 1 */}
          <View style={[CropScreenStyle.weatherInfo, { borderRightWidth: 0 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={CropScreenStyle.weatherHeader}>{getHour(1)}</Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>
              {getHourlyWeather(1)}
            </Text>
            <Text
              style={[
                CropScreenStyle.weatherData,
                ,
                { paddingTop: paddingTop },
              ]}
            >
              <Image
                source={{ uri: getWeatherIcon(1) }}
                style={{ width: widthIcon, height: heightIcon }} // Adjust size as needed
              />
            </Text>
          </View>
          {/*  */}
          {/* hour 2 */}
          <View style={[CropScreenStyle.weatherInfo, { borderRightWidth: 0 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={CropScreenStyle.weatherHeader}>{getHour(2)}</Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>
              {getHourlyWeather(2)}
            </Text>
            <Text
              style={[
                CropScreenStyle.weatherData,
                ,
                { paddingTop: paddingTop },
              ]}
            >
              <Image
                source={{ uri: getWeatherIcon(2) }}
                style={{ width: widthIcon, height: heightIcon }} // Adjust size as needed
              />
            </Text>
          </View>
          {/*  */}
          {/* hour 3 */}
          <View style={[CropScreenStyle.weatherInfo, { borderRightWidth: 0 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={CropScreenStyle.weatherHeader}>{getHour(3)}</Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>
              {getHourlyWeather(3)}
            </Text>
            <Text
              style={[
                CropScreenStyle.weatherData,
                ,
                { paddingTop: paddingTop },
              ]}
            >
              <Image
                source={{ uri: getWeatherIcon(3) }}
                style={{ width: widthIcon, height: heightIcon }} // Adjust size as needed
              />
            </Text>
          </View>
          {/*  */}
          {/* hour 4 */}
          <View style={[CropScreenStyle.weatherInfo, { borderRightWidth: 0 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={CropScreenStyle.weatherHeader}>{getHour(4)}</Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>
              {getHourlyWeather(4)}
            </Text>
            <Text
              style={[
                CropScreenStyle.weatherData,
                ,
                { paddingTop: paddingTop },
              ]}
            >
              <Image
                source={{ uri: getWeatherIcon(4) }}
                style={{ width: widthIcon, height: heightIcon }} // Adjust size as needed
              />
            </Text>
          </View>
          {/*  */}
        </View>
      </SafeAreaView>
    </View>
  );
};
