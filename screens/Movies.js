import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default function Movies({ navigation: { navigate } }) {
  return (
    <TouchableOpacity
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Movies</Text>
    </TouchableOpacity>
  );
}
