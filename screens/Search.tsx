import { ScrollView, TextInput, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import colors from "../colors";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { moviesAPI, tvAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

export default function Search() {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");

  //영화 검색
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery({
    queryKey: ["searchMovies", query], //두 번째로 사용자가 쓰는 query를 보냄으로써
    //search fetcher가 사용자가 쓴 내용에 접근할 수 있음 (api.ts)
    queryFn: moviesAPI.search,
    //요 query를 enabled 할 수 있다는 것! 중요해요@!
    enabled: false, //컴포넌트가 mount하는 순간 disabled 됨
    // -> 이러면 이제 useQuery의 refetch 함수를 사용해서 query가 다시 작동하게 해주면 됨!
  });

  //tv 검색
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery({
    queryKey: ["searchTv", query],
    queryFn: tvAPI.search,
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
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
      />

      {/*로딩중 띄우기..*/}
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movies Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="Tv Results" data={tvData.results} /> : null}
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
    marginBottom: 40,
    alignSelf: "center", //SearchBar 컴포넌트 자체를 부모 안에서 가운데 정렬
  },
});
