import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  StyleSheet,
  Dimensions,
  useColorScheme,
  Text,
  FlatList,
} from "react-native";

import Swiper from "react-native-swiper";
import colors from "../colors";
import Slide from "../components/Slides";
import HMedia from "../components/HMedia";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Movie, MovieResponse, moviesAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { useState } from "react";
import CustomText from "../CustomText";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  /*이전 코드(tanstack query 쓰기 전)은 mount 될 때마다 fetch를 하지만
  tanstack query는 한 번 fetch하면 그 뒤론 fetch 안 함
  -> 나갔다가 돌아와도 data 유지됨, 데이터 사라지지 않음!
  -> 아마 이미지는 다시 로드해야 할 지두
  tanstack query와 'unmountOnBlur: true'를 같이 쓰면 메모리도 아끼고 굳~*/
  const queryClient = useQueryClient(); //모든 쿼리들을 관리해요 #3.14 강의
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>({
      queryKey: [
        "movies",
        "nowPlaying",
      ] /*query key가 필요한 이유: react Query가 가지고 있는 caching system 때문 
     -> nowPlaying이란 이름을 가진 쿼리가 캐시에 넣어진다~
     -> 그저 데이터를 cache에 저장하는 방식임
     -> query key는 반드시 배열이어야 함!!!
     */,
      queryFn: moviesAPI.nowPlaying,
    });
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>({
      queryKey: ["movies", "upcoming"],
      queryFn: moviesAPI.upcoming,
    });
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>({
      queryKey: ["movies", "trending"],
      queryFn: moviesAPI.trending,
    });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({ queryKey: ["movies"] });
    //movies 키를 가진 쿼리들은 전부 refetch 할 수 있다는 것
    setRefreshing(false);
  };

  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    /*FlatList는 ScrollView에 기반해서 만들어진 컴포넌트! */
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing} //Flatlist에선 이걸로 아래로 땡기면 새로고침 할 수 있게 함
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}

          {/* <Text style={styles.ListTitle}>Coming soon</Text> */}

          <CustomText w="medium" style={styles.ListTitle}>
            Coming soon
          </CustomText>

          {/* 폰트 적용 예시,.,^^ */}
          {/* <CustomText w="bold" style={{ fontSize: 20 }}>
            이건 볼드
          </CustomText>
          <CustomText style={{ fontSize: 20 }}>이건 레귤러</CustomText> */}
        </>
      }
      style={{ backgroundColor: isDark ? colors.black : "white" }}
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <View style={styles.HSeperator} />}
      renderItem={renderHMedia}
    />
  ) : null;
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
    marginBottom: 15,
  },
  VSeperator: {
    width: 20,
  },
  HSeperator: {
    height: 20,
  },
});
