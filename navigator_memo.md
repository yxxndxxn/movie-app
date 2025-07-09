## navigator 정리

같은 Navigator 안에서 스크린을 변경하는 경우, navigate를 사용하고({navigation:{navigate}})
스크린 이름만 넣어주면 됨(navigate("Two))

만약 하나의 Navigator가 두 개의 다른 Navigator를 렌더링하고 있고 NAvigator 사이를 이동하고 싶으면,
먼저 이동하고 싶은 Navigator의 이름을 구체적으로 지정해야 함(Stack), 그리고 그 Navigator 안에 있는 스크린 이름을 입력해야함

예를 들면 Movies.js 처럼 이렇게!

<!-- export default function Movies({ navigation: { navigate } }) {
  return (
    <TouchableOpacity
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Movies</Text>
    </TouchableOpacity>
  );
} -->

<TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
-> Tabs로 가서 search 스크린으로 이동

구조도는
Root{
Tab{
Movies -> navigate(Stack, {screen: One})
}
Stack{
One -> navigate(Tabs, {screen:Search})
}
}

이거인거지

## stack navigator 정리

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
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
/_headerTintColor: 헤더 색상 변경
animation: "slide_from_right", <- 이거 괜찮군 그냥 슬라이딩~
애니메이션은 none으로 가도 될거 같은데 아님 흐릿하게 fade나? (카톡이 fade)
_/
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
