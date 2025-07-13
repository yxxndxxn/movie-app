import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "react-native";
import colors from "../colors";
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//타입스크립트 적용 #3.22
type RootStackParamList = {
  Detail: { originalTitle: string }; //screen 이름
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function Detail({
  navigation: { setOptions },
  //여기서 parameters를 받을 수 있는 이유는 navigate function을 부를 때
  //우리도 parameter를 같이 보내주고 있기 때문!
  route: {
    params: { originalTitle },
  },
}: DetailScreenProps) {
  const isDark = useColorScheme() === "dark";
  console.log(originalTitle); //params 잘 받는지 확인

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
