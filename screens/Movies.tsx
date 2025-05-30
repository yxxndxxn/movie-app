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
    <ScrollView
      //새로고침 props -> refreshControl, 이 안에 컴포넌트 넣어햐함!(RefreshControl)
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      style={{ backgroundColor: isDark ? colors.black : "white" }}
    >
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
        {/*스크롤뷰는 contentContainerStyle이라는 prop이 있다는걸 기억해!*/}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 30, gap: 15 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <VMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </ScrollView>
      </View>

      <Text style={styles.ListTitle}>Comming soon</Text>
      {upcoming.map((movie) => (
        <HMedia
          key={movie.id}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          releaseDate={movie.release_date}
          overview={movie.overview}
        />
      ))}
    </ScrollView>
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
