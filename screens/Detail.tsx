import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "react-native";
import colors from "../colors";
import { useEffect } from "react";

export default function Detail({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) {
  const isDark = useColorScheme() === "dark";

  //여기서 parameters를 받을 수 있는 이유는 navigate function을 부를 때
  //우리도 parameter를 같이 보내주고 있기 때문!
  console.log(originalTitle);

  useEffect(() => {
    setOptions({ title: originalTitle });
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: isDark ? colors.black : "white",
      }}
    >
      <Text>{originalTitle}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.black,
  },
});
