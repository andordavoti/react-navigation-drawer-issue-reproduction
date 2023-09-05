import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerOpenProvider, { useDrawerOpenContext } from "./DrawerContext";
import { useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

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
  const { setDrawerOpen } = useDrawerOpenContext();

  useEffect(() => {
    setDrawerOpen(isOpen);
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DrawerToggleButton1 = () => {
  const navigation = useNavigation();
  const opacity = useSharedValue(1);
  const opening = useRef(false);
  const status = useDrawerStatus();

  useEffect(() => {
    if (status === "closed") opening.current = false;
  }, [status]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value),
    };
  });

  return (
    <AnimatedPressable
      style={[{ marginHorizontal: 11 }, style]}
      onPressIn={() => {
        opacity.value = 0.3;
      }}
      onPressOut={() => {
        opacity.value = 1;
        if (opening.current) return;
        (navigation as any).openDrawer();
        opening.current = true;
      }}
    >
      <MaterialCommunityIcons name="menu" size={24} style={{ margin: 3 }} />
    </AnimatedPressable>
  );
};

const Navigation = () => {
  const { drawerOpen } = useDrawerOpenContext();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "front",
          headerLeft: DrawerToggleButton1,
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
