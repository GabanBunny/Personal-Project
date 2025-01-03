import { Text, SafeAreaView, View } from "react-native";
import Svg, { Path } from "react-native-svg";
const green = "#00C853";
const width = 100;
const height = 70;
export const BoostYourCropsHealthComponents = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 20, flexDirection: "column", height: "400" }}>
        <Text style={{ fontWeight: "bold", marginLeft: 20, fontSize: 17 }}>
          Boost your Crops health
        </Text>
        {/* First Half */}
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          {/* Components 1 */}
          <View style={{ alignItems: "center" }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              viewBox="0 0 24 24"
            >
              <Path
                fill={green}
                d="M8.75 12.75a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0"
              />
              <Path
                fill={green}
                d="M7.882 2h8.236l1.5 3H23v16H1V5h5.382zM6.75 12.75a5.25 5.25 0 1 0 10.5 0a5.25 5.25 0 0 0-10.5 0"
              />
            </Svg>
            <Text>Take a picture</Text>
          </View>
          {/* Right arrow 1 */}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <Path fill="#000" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
            </Svg>
          </View>
          {/* Components 2 */}
          <View style={{ alignItems: "center" }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              viewBox="0 0 24 24"
            >
              <Path
                fill={green}
                d="M16.519 16.501c.175-.136.334-.295.651-.612l3.957-3.958c.096-.095.052-.26-.075-.305a4.3 4.3 0 0 1-1.644-1.034a4.3 4.3 0 0 1-1.034-1.644c-.045-.127-.21-.171-.305-.075L14.11 12.83c-.317.317-.476.476-.612.651q-.243.311-.412.666c-.095.2-.166.414-.308.84l-.184.55l-.292.875l-.273.82a.584.584 0 0 0 .738.738l.82-.273l.875-.292l.55-.184c.426-.142.64-.212.84-.308q.355-.17.666-.412m5.849-5.809a2.163 2.163 0 1 0-3.06-3.059l-.126.128a.52.52 0 0 0-.148.465c.02.107.055.265.12.452c.13.375.376.867.839 1.33s.955.709 1.33.839c.188.065.345.1.452.12a.53.53 0 0 0 .465-.148z"
              />
              <Path
                fill={green}
                fill-rule="evenodd"
                d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C20.981 19.676 21 17.832 21 14.18l-2.818 2.818c-.27.27-.491.491-.74.686a5 5 0 0 1-.944.583a8 8 0 0 1-.944.355l-2.312.771a2.083 2.083 0 0 1-2.635-2.635l.274-.82l.475-1.426l.021-.066c.121-.362.22-.658.356-.944q.24-.504.583-.943c.195-.25.416-.47.686-.74l4.006-4.007L18.12 6.7l.127-.127A3.65 3.65 0 0 1 20.838 5.5c-.151-1.03-.444-1.763-1.01-2.328C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M7.25 9A.75.75 0 0 1 8 8.25h6.5a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m0 4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"
                clip-rule="evenodd"
              />
            </Svg>
            <Text>See recommendations</Text>
          </View>
          {/* Right arrow 2 */}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <Path fill="#000" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
            </Svg>
          </View>
          {/* Components 3 */}
          <View
          // style={{
          //   // justifyContent: "space-between",
          // }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              viewBox="0 0 24 24"
            >
              <Path
                fill={green}
                d="m7 22l-1.5-6h13L17 22zm5-14q0-2.5 1.75-4.25T18 2q0 2.25-1.425 3.9T13 7.9V10h8v5H3v-5h8V7.9q-2.15-.35-3.575-2T6 2q2.5 0 4.25 1.75T12 8"
              />
            </Svg>
            <Text style={{ marginLeft: -10 }}>Save your plant</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
