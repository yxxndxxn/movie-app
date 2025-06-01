import { StyleSheet, Text, View } from "react-native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  return (
    <View>
      <Poster path={posterPath} />
      <Text style={styles.Title}>
        {originalTitle.length > 20
          ? `${originalTitle.slice(0, 20)}...`
          : originalTitle}
      </Text>
      <Votes votes={voteAverage} />
    </View>
  );
};

export default VMedia;

const styles = StyleSheet.create({
  Title: {
    marginTop: 5,
    width: 100,
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
