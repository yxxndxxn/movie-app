// import styled from "styled-components/native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";

// const Btn = styled.TouchableOpacity`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: ${(props) => props.theme.mainBgColor};
// `;

// const Title = styled.Text`
//   color: ${(props) => props.theme.textColor};
// `;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  return (
    <TouchableOpacity onPress={() => navigate("Stack", { screen: "Three" })}>
      <Text>Movies</Text>
    </TouchableOpacity>
  );
};
export default Movies;
