import { ScrollView, TextInput, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import colors from "../colors";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { moviesAPI } from "../api";

export default function Search() {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");
  const {
    isLoading,
    data,
    refetch: searchMovies,
  } = useQuery({
    queryKey: ["searchMovies", query], //두 번째로 사용자가 쓰는 query를 보냄으로써
    //search fetcher가 사용자가 쓴 내용에 접근할 수 있음 (api.ts)
    queryFn: moviesAPI.search,
    enabled: false, //컴포넌트가 mount하는 순간 disabled 됨 -> 이러면 이제 useQuery의 refetch 함수를 사용해서 query가 다시 작동하게 해주면 됨!
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
  };
  // console.log(isLoading, data); //확인용

  //input에 쓴 데이터를 api에 보내야함 -> 그래야 검색이 되지..
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
        returnKeyLabel="Search" //android
        returnKeyType="search" //ios
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
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
