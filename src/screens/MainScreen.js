import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme, Button, Dialog, Portal, Appbar } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

const MainScreen = ({ navigation }) => {
  const paperTheme = useTheme();

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    try {
      // Clear the accessToken from AsyncStorage
      await AsyncStorage.removeItem("accessToken");

      setLoading(false);
      setAlertVisible(false);

      // Reset the navigation state to the Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      setAlertVisible(false);
      console.error("Error logging out:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <Appbar.Content title="Main" />
        <Appbar.Action
          icon="logout"
          onPress={() => {
            setAlertVisible(true);
          }}
        />
      </Appbar.Header>
      <View style={[styles.container]}>
        <Text style={[styles.welcomeText, { color: paperTheme.colors.onBackground }]}>Welcome to MainScreen</Text>
      </View>
      <Portal>
        <Dialog
          visible={isAlertVisible}
          onDismiss={() => setAlertVisible(false)}
          style={{ backgroundColor: paperTheme.colors.surface }}
        >
          {!loading ? (
            <>
              <Dialog.Icon icon="alert-circle" size={36} />
              <Dialog.Title style={{ textAlign: "center" }}>Log out</Dialog.Title>
              <Dialog.Content>
                <Text style={{ textAlign: "center", color: paperTheme.colors.outline }} variant="bodyMedium">
                  you will be retured to login screen.
                </Text>
              </Dialog.Content>
              <Dialog.Actions style={{ justifyContent: "center", gap: 10, width: "100%" }}>
                <Button mode="contained-tonal" width="40%" onPress={() => setAlertVisible(false)}>
                  No
                </Button>
                <Button mode="contained-tonal" width="40%" onPress={handleLogOut}>
                  Yes
                </Button>
              </Dialog.Actions>
            </>
          ) : (
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 24, overflow: "hidden" }}>
              <ActivityIndicator
                size={"large"}
                color={paperTheme.colors.primary}
                style={[styles.box, { transform: [{ scale: 1.2 }] }]}
              />
              <Dialog.Title style={{ textAlign: "center" }}>logging out...</Dialog.Title>
            </View>
          )}
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  welcomeText: { fontSize: 24 },
});

export default MainScreen;
