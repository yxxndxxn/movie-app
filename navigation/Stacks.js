import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { setOptions } from "expo-splash-screen";
import colors from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </TouchableOpacity>
);
const ScreenThree = (
  { navigation: { navigate } } //goBack: 뒤로 가기 버튼 만들때?
) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go to Search</Text>
  </TouchableOpacity>
);

//screenOptions은 모든 screen에 적용할 설정
//options은 navigator의 단 하나의 화면에 적용할 설정
const NativeStack = createNativeStackNavigator();
{
  /*headerTintColor: 헤더 색상 변경
   animation: "slide_from_right", <- 이거 괜찮군 그냥 슬라이딩~
   애니메이션은 none으로 가도 될거 같은데 아님 흐릿하게 fade나? (카톡이 fade)
  */
}
const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerTintColor: colors.yellow,
      animation: "fade",
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    {/* options={{title: "dd"}}  여기 props에 options를 넣어서 title 변경도 가넝*/}
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
