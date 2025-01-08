import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const LoadingScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const paperTheme = useTheme();

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      } catch (e) {
        // Handle error if needed
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    };

    checkAccessToken();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === "dark" ? "black" : "white",
      }}
    >
      <ActivityIndicator
        size={"large"}
        color={paperTheme.colors.primary}
        style={{ transform: [{ scale: 1.5 }] }}
      />
    </View>
  );
};

export default LoadingScreen;
