import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stacks";

const Nav = createNativeStackNavigator();

const Root = () => {
  //보통은 Navigator를 렌더링할 때 presentation을 변경해줌
  //presentation: "modal"
  //근데 안드로이드에서 모달이 안먹어ㅠㅠ
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
  );
};

export default Root;
