import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import { CropsScreen } from "./pages/CropsScreen";
import { CommunityScreen } from "./pages/CommunityScreen";
import { SettingsScreen } from "./pages/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const green = "#00C853";
const grey = "#D4D6DD";
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Crops") {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill={focused ? green : grey}
                >
                  <Path d="M12 2.25A9.75 9.75 0 0 0 2.25 12c0 1.558.366 3.033 1.018 4.342c.104.21.114.523-.005 1.01a9 9 0 0 1-.22.729l-.03.086c-.074.22-.154.46-.214.683c-.382 1.427.924 2.733 2.35 2.351c.224-.06.463-.14.684-.214l.086-.03a9 9 0 0 1 .729-.22c.487-.12.8-.11 1.01-.005A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25" />
                </Svg>
              );
            }
            if (route.name === "Community") {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size}
                  height={size}
                  viewBox="0 0 2048 2048"
                >
                  <Path
                    fill={focused ? green : grey}
                    d="M1330 1203q136 47 245 131t186 196t118 243t41 275h-128q0-164-58-304t-162-244t-243-161t-305-59q-107 0-206 27t-184 76t-155 119t-119 155t-77 185t-27 206H128q0-144 42-275t119-242t186-194t245-133q-78-42-140-102T475 969t-67-157t-24-172q0-133 50-249t137-204T774 50t250-50q133 0 249 50t204 137t137 203t50 250q0 88-23 171t-67 156t-105 133t-139 103M512 640q0 106 40 199t110 162t163 110t199 41t199-40t162-110t110-163t41-199t-40-199t-110-162t-163-110t-199-41t-199 40t-162 110t-110 163t-41 199"
                  />
                </Svg>
              );
            } else {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                >
                  <Path
                    fill={focused ? green : grey}
                    d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"
                  />
                </Svg>
              );
            }
          },
          tabBarLabelStyle: ({ focused }) => ({
            fontWeight: focused ? "bold" : "normal",
            position: "absolute",
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 90,
          }),
          tabBarShowLabel: true,
          tabBarActiveTintColor: green,
          tabBarInactiveTintColor: grey,
        })}
      >
        <Tab.Screen name="Crops" component={CropsScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
