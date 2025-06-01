import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  Text,
  RefreshControl,
  FlatList,
} from "react-native";

import Swiper from "react-native-swiper";
import colors from "../colors";
import Slide from "../components/Slides";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const url = "https://api.themoviedb.org/3/trending/movie/week?language=KR";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          return json.results || [];
        })
        .catch((err) => {
          console.error("API 에러:", err);
          return [];
        });

      setTrending(response);
    } catch (error) {
      console.error("전체 에러:", error);
      setTrending([]);
    }
  };

  const getUpcoming = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=KR&page=1&region=KR";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          return json.results || [];
        })
        .catch((err) => {
          console.error("API 에러:", err);
          return [];
        });

      setUpcoming(response);
    } catch (error) {
      console.error("전체 에러:", error);
      setUpcoming([]);
    }
  };

  const getNowPlaying = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=KR&page=1&region=KR";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          return json.results || [];
        })
        .catch((err) => {
          console.error("API 에러:", err);
          return [];
        });

      setNowPlaying(response);
    } catch (error) {
      console.error("전체 에러:", error);
      setNowPlaying([]);
    }
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    //새로고침 하면 API에서 데이터 가져오고 다시 false..
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <View
      style={[
        styles.Loader,
        { backgroundColor: isDark ? colors.black : "white" },
      ]}
    >
      <ActivityIndicator />
    </View>
  ) : (
    /*FlatList는 ScrollView에 기반해서 만들어진 컴포넌트! */
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      /*FlatList Header에 FlatList를 render하는 FlatList의 구조인거임 */
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            showsButtons={false}
            showsPagination={false}
            loop
            autoplay={true}
            autoplayTimeout={3.5}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>

          <View style={styles.ListContainer}>
            <Text style={styles.ListTitle}>Trending Movies</Text>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 30 }}
              horizontal
              //keyExtractor: item을 받아오는데, item의 어떤 부분을 key로 삼을 건지 반환하는 역할
              //근데 난 이거 안 넣어도 작동 잘 되는듯ㅠㅠ
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              data={trending}
              //gap 대신 ItemSeparatorComponent-> 사이에 컴포넌트를 넣어주는 역할.? 여기서는 공백이 컴포넌트로 되는거지
              //그리고 마지막에는 들어가지 않게 해서 gap과 똑같이 요소 사이에만 적용됨!
              //함수가 들어가기 때문에, 공백 말고도 이미지나 원하는 무언가를 넣을 수 있어서 숱한 디자인 변경시에 용이함
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />} //그니까 이게 gap인거지 안에 공백 말고도 무엇이든 넣을 수 있는 gap..
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </View>

          <Text style={styles.ListTitle}>Coming soon</Text>
        </>
      }
      style={{ backgroundColor: isDark ? colors.black : "white" }}
      data={upcoming}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
        />
      )}
    />
  );
};

export default Movies;

const styles = StyleSheet.create({
  Loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ListContainer: {
    marginBottom: 40,
  },
  ListTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 30,
    marginBottom: 10,
  },
});
