import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

import Swiper from "react-native-swiper";
import colors from "../colors";
import Slide from "../components/Slides";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

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
          console.log("API 응답:", json);
          // 여기서 results 배열을 반환해야 함!
          return json.results || [];
        })
        .catch((err) => {
          console.error("API 에러:", err);
          return []; // 에러 시 빈 배열 반환
        });
      
      console.log("최종 데이터:", response);
      setNowPlaying(response);
      setLoading(false);
    } catch (error) {
      console.error("전체 에러:", error);
      setNowPlaying([]); // 안전장치
      setLoading(false);
    }
  };
  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <View
      style={[
        styles.loader,
        { backgroundColor: isDark ? colors.black : "white" },
      ]}
    >
      <ActivityIndicator />
    </View>
  ) : (
    <ScrollView style={{ backgroundColor: isDark ? colors.black : "white" }}>
      <Swiper
        horizontal
        showsButtons={false}
        showsPagination={false}
        loop
        autoplay={true}
        autoplayTimeout={3.5}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map(movie => 
        <Slide 
          key={movie.id}
          backdropPath={movie.backdrop_path}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          voteAverage={movie.vote_average}
          overview={movie.overview} />)}
        
      </Swiper>
    </ScrollView>
  );
};

export default Movies;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})