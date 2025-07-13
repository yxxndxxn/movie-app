import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../colors";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";

const NativeStack = createNativeStackNavigator();

{
  /*headerTintColor: 헤더 색상 변경
   animation: "slide_from_right", <- 이거 괜찮군 그냥 슬라이딩~
   애니메이션은 none으로 가도 될거 같은데 아님 흐릿하게 fade나? (카톡이 fade)
  */
}

export default function Stack() {
  const isDark = useColorScheme() === "dark";

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTintColor: "white", //아 이거 화살표 색이다! (headerTitleStyle이 딱히 지정된게 없으면 타이틀도 요 색으로 지정됨 )
        animation: "none",
        headerStyle: { backgroundColor: isDark ? colors.black : "white" },
        headerTitleStyle: { color: isDark ? "white" : colors.black },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}
