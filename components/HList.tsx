import { FlatList, StyleSheet, Text, View } from "react-native";
import VMedia from "./VMedia";

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <View style={styles.ListContainer}>
    <Text style={styles.ListTitle}>{title}</Text>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.HListSeperator} />}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title ?? item.original_name}
          voteAverage={item.vote_average}
        />
      )}
    />
  </View>
);

export default HList;

export const styles = StyleSheet.create({
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
  HListSeperator: {
    width: 20,
  },
});
