import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../colors";
import Detail from "../screens/Detail";

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
      animation: "none",
    }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
