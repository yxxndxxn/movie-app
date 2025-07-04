import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  Text,
  FlatList,
} from "react-native";

import Swiper from "react-native-swiper";
import colors from "../colors";
import Slide from "../components/Slides";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { MovieResponse, moviesAPI } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  /*이전 코드(tanstack query 쓰기 전)은 mount 될 때마다 fetch를 하지만
  tanstack query는 한 번 fetch하면 그 뒤론 fetch 안 함
  -> 나갔다가 돌아와도 data 유지됨, 데이터 사라지지 않음!
  -> 아마 이미지는 다시 로드해야 할 지두
  tanstack query와 'unmountOnBlur: true'를 같이 쓰면 메모리도 아끼고 굳~*/
  const queryClient = useQueryClient(); //모든 쿼리들을 관리해요 #3.14 강의
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchNowPlaying, //fetch 다시하는거 boolean으로
  } = useQuery<MovieResponse>({
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
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchUpcomingData,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesAPI.upcoming,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchTrendingData,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: moviesAPI.trending,
  });

  const onRefresh = async () => {
    queryClient.refetchQueries({ queryKey: ["movies"] });
    //movies 키를 가진 쿼리들은 전부 refetch 할 수 있다는 것
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchNowPlaying || isRefetchUpcomingData || isRefetchTrendingData;
  return loading ? (
    <View
      style={[
        styles.Loader,
        { backgroundColor: isDark ? colors.black : "white" },
      ]}
    >
      <ActivityIndicator />
    </View>
  ) : /*FlatList는 ScrollView에 기반해서 만들어진 컴포넌트! */
  upcomingData ? (
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

          <View style={styles.ListContainer}>
            <Text style={styles.ListTitle}>Trending Movies</Text>
            {trendingData ? (
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 30 }}
                horizontal
                //keyExtractor: item을 받아오는데, item의 어떤 부분을 key로 삼을 건지 반환하는 역할
                //근데 난 이거 안 넣어도 작동 잘 되는듯ㅠㅠ
                keyExtractor={(item) => item.id + ""}
                showsHorizontalScrollIndicator={false}
                data={trendingData.results}
                //gap 대신 ItemSeparatorComponent-> 사이에 컴포넌트를 넣어주는 역할.? 여기서는 공백이 컴포넌트로 되는거지
                //그리고 마지막에는 들어가지 않게 해서 gap과 똑같이 요소 사이에만 적용됨!
                //함수가 들어가기 때문에, 공백 말고도 이미지나 원하는 무언가를 넣을 수 있어서 숱한 디자인 변경시에 용이함
                ItemSeparatorComponent={() => (
                  <View style={styles.VSeperator} />
                )} //그니까 이게 gap인거지 안에 공백 말고도 무엇이든 넣을 수 있는 gap..
                renderItem={({ item }) => (
                  <VMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                )}
              />
            ) : null}
          </View>

          <Text style={styles.ListTitle}>Coming soon</Text>
        </>
      }
      style={{ backgroundColor: isDark ? colors.black : "white" }}
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <View style={styles.HSeperator} />}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
        />
      )}
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
    marginBottom: 10,
  },
  VSeperator: {
    width: 20,
  },
  HSeperator: {
    height: 15,
  },
});
