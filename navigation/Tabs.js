import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { View, Text, useColorScheme } from "react-native";
import colors from "../colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Stack from "./Stacks";

const Tab = createBottomTabNavigator();

//screenOptions은 모든 screen에 적용할 설정
//options은 navigator의 단 하나의 화면에 적용할 설정

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      //이게 왜 안 먹지ㅠㅠ?
      // sceneContainerStyle={{ backgroundColor: isDark ? colors.black : "white" }}
      screenOptions={{
        unmountOnBlur: true, //화면을 나갔을 때(unmount됐을 때 메모리 안 쓰도록 죽임(?))
        tabBarStyle: {
          backgroundColor: isDark ? colors.black : "white",
        },
        tabBarActiveTintColor: isDark ? colors.yellow : colors.black,
        tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
        headerStyle: {
          backgroundColor: isDark ? colors.black : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : colors.black,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarBadge: 4,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
