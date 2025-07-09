import { ScrollView, useColorScheme, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tvAPI } from "../api";
import Loader from "../components/Loader";
import colors from "../colors";
import HList from "../components/HList";

export default function Tv() {
  const isDark = useColorScheme() === "dark";
  const queryClient = useQueryClient();

  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery({
    queryKey: ["tv", "today"],
    queryFn: tvAPI.airingToday,
  });
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery({
    queryKey: ["tv", "top"],
    queryFn: tvAPI.topRated,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery({
    queryKey: ["tv", "trending"],
    queryFn: tvAPI.trending,
  });

  const onRefresh = () => {
    queryClient.refetchQueries({ queryKey: ["tv"] });
  };
  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  const loading = todayLoading || topLoading || trendingLoading;
  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
      style={{ backgroundColor: isDark ? colors.black : "white" }}
    >
      <HList title="Trending Tv" data={trendingData.results} />

      <HList title="Airing Today" data={todayData.results} />

      <HList title="Top Rated Tv" data={topData.results} />
    </ScrollView>
  );
}
