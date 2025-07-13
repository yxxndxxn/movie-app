import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
  const goToDetail = () => {
    //이게 서로 다른 Navigator에 있는 screen으로 navigate하는 방법ㅇ..
    //"Stack"에 있는 "Detail" screen으로 navigate 하는겨!
    //만약 같은 Navigator에 있는 screen으로 navigate 하고 싶으면
    // navigation.navigate("Stack", {params:{})
    //이케 하면 됨^^ (screen 안써도 된다.. 머 그런...)

    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        originalTitle,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
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
              {overview.length > 120
                ? `${overview.slice(0, 120)}...`
                : overview}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HMedia;

const styles = StyleSheet.create({
  HMovie: {
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
