import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const FirstTabScreen = () => {
  return (
    <View style={styles.container}>
      <Text>First Tab Screen</Text>
    </View>
  );
};

const SecondTabScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Second Tab Screen</Text>
    </View>
  );
};

const TopTabsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="First Tab Screen" component={FirstTabScreen} />
      <Tab.Screen name="Second Tab Screen" component={SecondTabScreen} />
    </Tab.Navigator>
  );
};

const RegularDrawerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Regular Drawer Screen</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ drawerType: "front", swipeEdgeWidth: 100 }}
      >
        <Drawer.Screen name="Top Tabs Screen" component={TopTabsScreen} />
        <Drawer.Screen name="Regular Screen" component={RegularDrawerScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
