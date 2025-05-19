import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([
    /* require('path/to/other.png') */
  ]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done Loading !</Text>
    </View>
  );
}
