import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerOpenProvider, { useDrawerOpenContext } from "./DrawerContext";
import { useEffect } from "react";

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
  const isOpen = useDrawerStatus() === "open";
  const { setDrawerIsClosed, setDrawerIsOpen } = useDrawerOpenContext();

  useEffect(() => {
    if (isOpen) {
      setDrawerIsOpen();
    } else {
      setDrawerIsClosed();
    }
  }, [isOpen]);

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

const Navigation = () => {
  const { drawerOpen } = useDrawerOpenContext();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "front",
          swipeEdgeWidth: 100,
          gestureHandlerProps: {
            activateAfterLongPress: drawerOpen ? undefined : 1,
          },
        }}
      >
        <Drawer.Screen name="Top Tabs Screen" component={TopTabsScreen} />
        <Drawer.Screen name="Regular Screen" component={RegularDrawerScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerOpenProvider>
        <Navigation />
      </DrawerOpenProvider>
    </GestureHandlerRootView>
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
