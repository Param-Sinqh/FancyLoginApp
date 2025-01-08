import React from "react";
import * as SystemUI from 'expo-system-ui';
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import {
  Dialog,
  Portal,
  Button,
  Text,
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import { getPaperTheme } from "./src/theme/paperTheme";

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const paperTheme = getPaperTheme(colorScheme);
  SystemUI.setBackgroundColorAsync(colorScheme === "dark" ? "black" : "white");
  
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorScheme === "dark" ? "black" : "white",
    },
  };

  const [isConnected, setIsConnected] = useState(true); // State to track internet connectivity
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setAlertTitle("Network Problem");
        setAlertMessage("No internet connection detected. Please check your network settings.");
        setAlertVisible(true);
      } else {
        setAlertVisible(false);
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={({ route, navigation }) => ({
            gestureEnabled: true,
          })}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false, ...TransitionPresets.FadeFromBottomAndroid }}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: "Welcome", headerShown: false, ...TransitionPresets.FadeFromBottomAndroid }}
          />
        </Stack.Navigator>

        <Portal>
          <Dialog
            visible={isAlertVisible}
            onDismiss={() => setAlertVisible(false)}
            style={{ backgroundColor: paperTheme.colors.surface }}
          >
            <Dialog.Icon icon="connection" size={36} />
            <Dialog.Title style={{ textAlign: "center" }}>{alertTitle}</Dialog.Title>
            <Dialog.Content>
              <Text style={{ textAlign: "center", color: paperTheme.colors.outline }} variant="bodyMedium">
                {alertMessage}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="contained-tonal" width="40%" onPress={() => setAlertVisible(false)}>
                OK
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </NavigationContainer>
    </PaperProvider>
  );
}
