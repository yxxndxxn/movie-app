import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import colors from "../colors";
import { useState } from "react";

export default function Search() {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");
  const onChangeText = (text: string) => setQuery(text);
  console.log(query);

  return (
    <ScrollView
      style={{
        backgroundColor: isDark ? colors.black : "white",
      }}
    >
      <TextInput
        style={styles.SearchBar}
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor="gray"
        returnKeyLabel="Search"
        returnKeyType="search" //ios
        onChangeText={onChangeText}
      ></TextInput>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  SearchBar: {
    color: "black",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 12,
    width: "90%",
    marginVertical: 10,
    alignSelf: "center", //SearchBar 컴포넌트 자체를 부모 안에서 가운데 정렬
  },
});
