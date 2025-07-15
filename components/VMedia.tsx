import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";
import { Movie, TV } from "../api";

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <View style={styles.Container}>
        <Poster path={posterPath} />
        <Text style={styles.Title}>
          {originalTitle.length > 20
            ? `${originalTitle.slice(0, 20)}...`
            : originalTitle}
        </Text>
        <Votes votes={voteAverage} />
      </View>
    </TouchableOpacity>
  );
};

export default VMedia;

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
  },
  Title: {
    marginTop: 5,
    width: 100,
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
