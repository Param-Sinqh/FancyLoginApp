import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useRef, useEffect } from "react";
import { useColorScheme } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useTheme, Text, Button, Dialog, Portal } from "react-native-paper";
import AnimatedInput from "../components/AnimatedInput";
import errorMessages from "../constants/errorMessages";

const SignUpScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const colorScheme = useColorScheme();
  const paperTheme = useTheme();

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const inputRefName = useRef(null);
  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);

  const handleSignUp = async () => {
    if (!name) {
      inputRefName.current?.focus();
      return;
    } else if (!email) {
      inputRefEmail.current?.focus();
      return;
    } else if (!password) {
      inputRefPassword.current?.focus();
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Set a 5-second timeout

    try {
      const response = await Promise.race([
        fetch("http://192.168.1.33:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password: password.toLowerCase(),
          }),
          signal: controller.signal, // Attach the AbortController signal
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 5000)),
      ]);

      clearTimeout(timeoutId); // Clear timeout after response is received

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("accessToken", data.accessToken);
        // Reset the navigation state to the Login screen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        );
      } else {
        let errorScenario = "emailAlreadyInUse"; // Default to a generic error
        if (data.message) {
          if (data.message.includes("Email already in use")) {
            errorScenario = "emailAlreadyInUse";
          }
        }

        const randomError = errorMessages[errorScenario]?.[
          Math.floor(Math.random() * errorMessages[errorScenario].length)
        ] || {
          title: "Error",
          content: "An unexpected error occurred.",
        };

        setAlertTitle(randomError.title);
        setAlertMessage(randomError.content);
        setAlertVisible(true);
      }
    } catch (error) {
      clearTimeout(timeoutId);

      console.error("SignUp Error:", error);

      const errorScenario = "internalServerError";
      const randomError = errorMessages[errorScenario][Math.floor(Math.random() * errorMessages[errorScenario].length)];
      setAlertTitle(randomError.title);
      setAlertMessage(randomError.content);
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "black" : "white" }]}>
        <Text style={[styles.textLogo, { color: paperTheme.colors.primary }]}>SignUp</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginContainer}>
            <AnimatedInput
              ref={inputRefName}
              label="Name"
              textColor={colorScheme === "dark" ? "white" : "black"}
              backgroundColor={colorScheme === "dark" ? "black" : "white"}
              onChangeText={setName}
              value={name}
              activeColor={paperTheme.colors.primary}
            />
            <AnimatedInput
              ref={inputRefEmail}
              label="Email"
              textColor={colorScheme === "dark" ? "white" : "black"}
              backgroundColor={colorScheme === "dark" ? "black" : "white"}
              onChangeText={setEmail}
              value={email}
              activeColor={paperTheme.colors.primary}
              keyboardType="email-address"
            />
            <AnimatedInput
              ref={inputRefPassword}
              label="Password"
              textColor={colorScheme === "dark" ? "white" : "black"}
              backgroundColor={colorScheme === "dark" ? "black" : "white"}
              onChangeText={setPassword}
              value={password}
              activeColor={paperTheme.colors.primary}
              isSecure={true}
            />
            <Button mode="contained" onPress={handleSignUp} width="100%" loading={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </View>
        </TouchableWithoutFeedback>

        <Portal>
          <Dialog
            visible={isAlertVisible}
            onDismiss={() => setAlertVisible(false)}
            style={{ backgroundColor: paperTheme.colors.surface }}
          >
            <Dialog.Icon icon="alert-circle" size={36} />
            <Dialog.Title style={{ textAlign: "center" }}>{alertTitle}</Dialog.Title>
            <Dialog.Content>
              <Text
                style={{
                  textAlign: "center",
                  color: paperTheme.colors.outline,
                }}
                variant="bodyMedium"
              >
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textLogo: {
    fontSize: 30,
    marginBottom: 50,
  },
  loginContainer: {
    position: "relative",
    width: "80%",
    flex: 0,
    alignItems: "center",
    alignSelf: "center",
    gap: 20,
  },
  text: {
    backgroundColor: "black",
    padding: 50,
    fontSize: 70,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignUpScreen;
