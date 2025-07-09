import {
  ActivityIndicator,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import colors from "../colors";

export default function Loader() {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={[
        styles.Loader,
        { backgroundColor: isDark ? colors.black : "white" },
      ]}
    >
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  Loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
