import { View, Text } from "react-native";
import { useColorScheme } from "react-native";
import colors from "../colors";

export default function Search() {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? colors.black : "white",
      }}
    >
      <Text>Search</Text>
    </View>
  );
}
