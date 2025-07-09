import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "@react-native-community/blur";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <Image
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          blurType="dark"
          blurAmount={8}
          style={StyleSheet.absoluteFill}
        >
          <View style={styles.Wrapper}>
            <Poster path={posterPath} />
            <View style={styles.Column}>
              <Text style={styles.Title}>{originalTitle}</Text>
              <Text style={styles.OverView}>{overview.slice(0, 100)}...</Text>
              <Votes votes={voteAverage} />
            </View>
          </View>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Slide;

const styles = StyleSheet.create({
  BgImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  Wrapper: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Column: {
    width: "40%",
    marginLeft: 30,
  },
  Title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  OverView: {
    marginTop: 8,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
