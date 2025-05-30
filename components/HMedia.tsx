import { Text, View, StyleSheet } from "react-native";
import Poster from "./Poster";

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  releaseDate?: string;
  overview?: string;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
}) => {
  return (
    <View style={styles.HMovie}>
      <Poster path={posterPath} />
      <View style={styles.Hcolumn}>
        <Text style={styles.Title}>{originalTitle}</Text>
        {releaseDate ? (
          <Text style={styles.Date}>
            {new Date(releaseDate).toLocaleDateString("ko")} 개봉
          </Text>
        ) : null}
        {overview && (
          <Text style={styles.OverView}>
            {overview.length > 120 ? `${overview.slice(0, 120)}...` : overview}
          </Text>
        )}
      </View>
    </View>
  );
};

export default HMedia;

const styles = StyleSheet.create({
  HMovie: {
    marginBottom: 30,
    paddingVertical: 0,
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  Hcolumn: {
    marginLeft: 15,
    width: "80%",
  },
  Title: {
    marginTop: 5,
    width: "80%",
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.6)",
  },
  OverView: {
    marginTop: 8,
    width: "80%",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  Date: {
    color: "white",
    fontSize: 12,
    marginVertical: 5,
  },
});
