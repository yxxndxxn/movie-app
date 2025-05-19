import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stacks";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Tabs /> */}
      <Stack />
    </NavigationContainer>
  );
}
