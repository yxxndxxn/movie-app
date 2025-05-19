import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

//screenOptions은 모든 screen에 적용할 설정
//options은 navigator의 단 하나의 화면에 적용할 설정

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Search">
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          headerRight: () => (
            <View>
              <Text>dds</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Tv" component={Tv} options={{ tabBarBadge: 4 }} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
