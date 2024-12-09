import { Text, View, SafeAreaView } from "react-native";
import Svg, { Path } from "react-native-svg";
import React from "react";

const width = "16";
const height = "16";

export const UvWindHumidityComponents = ({ CropScreenStyle, weatherData }) => {
  const getHourlyHumidity = () => {
    return weatherData?.hourly?.relative_humidity_2m[0] || "N/A ";
  };

  const getHourlyWindSpeed = () => {
    return weatherData?.hourly?.wind_speed_10m[0] || "N/A";
  };

  const getUVIndex = () => {
    return weatherData?.daily?.uv_index_max?.[0] || "N/A";
  };
  return (
    <View style={CropScreenStyle.container}>
      <SafeAreaView>
        <View style={CropScreenStyle.weatherContainer}>
          {/*  */}
          {/* UV index */}
          <View style={CropScreenStyle.weatherInfo}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
              >
                <Path fill="white" d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0" />
                <Path
                  fill="white"
                  //   fill-rule="white"
                  d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                  clip-rule="evenodd"
                />
              </Svg>
              <Text style={CropScreenStyle.weatherHeader}> UV Index</Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>{getUVIndex()}</Text>
          </View>
          {/*  */}
          {/* Wind */}
          <View style={CropScreenStyle.weatherInfo}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
              >
                <Path
                  fill="white"
                  d="M6.25 5.5A3.25 3.25 0 1 1 9.5 8.75H3a.75.75 0 0 1 0-1.5h6.5A1.75 1.75 0 1 0 7.75 5.5v.357a.75.75 0 1 1-1.5 0zm8 2a4.25 4.25 0 1 1 4.25 4.25H2a.75.75 0 0 1 0-1.5h16.5a2.75 2.75 0 1 0-2.75-2.75V8a.75.75 0 0 1-1.5 0zm-11 6.5a.75.75 0 0 1 .75-.75h14.5a4.25 4.25 0 1 1-4.25 4.25V17a.75.75 0 0 1 1.5 0v.5a2.75 2.75 0 1 0 2.75-2.75H4a.75.75 0 0 1-.75-.75"
                  clip-rule="evenodd"
                />
              </Svg>
              <Text style={CropScreenStyle.weatherHeader}> Wind</Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>
              {getHourlyWindSpeed()} m/s
            </Text>
          </View>
          {/*  */}
          {/* Humidity */}
          <View style={[CropScreenStyle.weatherInfo, { borderRightWidth: 0 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
              >
                <Path
                  fill="white"
                  d="M21.86 12.5A4.3 4.3 0 0 0 19 11c0-1.95-.68-3.6-2.04-4.96S13.95 4 12 4c-1.58 0-3 .47-4.25 1.43s-2.08 2.19-2.5 3.72c-1.25.28-2.29.93-3.08 1.95S1 13.28 1 14.58c0 1.51.54 2.8 1.61 3.85C3.69 19.5 5 20 6.5 20h12c1.25 0 2.31-.44 3.19-1.31c.87-.88 1.31-1.94 1.31-3.19q0-1.725-1.14-3M9.45 9.03c.78 0 1.42.64 1.42 1.42s-.64 1.42-1.42 1.42s-1.42-.64-1.42-1.42s.64-1.42 1.42-1.42m5.1 7.94c-.78 0-1.42-.64-1.42-1.42s.64-1.42 1.42-1.42s1.42.64 1.42 1.42s-.64 1.42-1.42 1.42M9.2 17L8 15.8L14.8 9l1.2 1.2z"
                />
              </Svg>
              <Text style={CropScreenStyle.weatherHeader}> Humidity</Text>
            </View>
            <Text style={CropScreenStyle.weatherData}>
              {getHourlyHumidity()}%
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
