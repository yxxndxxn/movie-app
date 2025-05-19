import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movies" component={HomeScreen} />
      <Tab.Screen name="Tv" component={HomeScreen} />
      <Tab.Screen name="Search" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
