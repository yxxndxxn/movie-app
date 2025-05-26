import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  return (
    <TouchableOpacity
      className="p-5 bg-red-500 rounded-lg"
      onPress={() => navigate("Stack", { screen: "Three" })}
    >
      <Text className="text-white text-xl font-bold">Movies</Text>
    </TouchableOpacity>
  );
};

export default Movies;
