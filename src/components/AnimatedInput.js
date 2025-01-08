import React, { useState, forwardRef } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedInput = forwardRef(
  (
    {
      label,
      activeColor = "blue",
      textColor = "black",
      backgroundColor = "white",
      isSecure = false,
      value,
      onChangeText,
      keyboardType
    },
    ref
  ) => {
    // State variable to track password visibility
    const [showPassword, setShowPassword] = useState(isSecure);
    // Function to toggle the password visibility state
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const inputAnim = useSharedValue(0); // Initial value for the animation

    const handleFocus = () => {
      inputAnim.value = withTiming(1, { duration: 100 }); // Fully highlighted state
    };

    const handleBlur = () => {
      inputAnim.value = withTiming(0, { duration: 100 }); // Default state
    };

    // Animated styles
    const inputStyle = useAnimatedStyle(() => ({
      borderColor: interpolateColor(
        inputAnim.value,
        [0, 1],
        ["gray", activeColor]
      ),
    }));

    const labelStyleTop = useAnimatedStyle(() => ({
      top: interpolate(inputAnim.value, [0, 1], [13, -10]),
    }));

    const labelStyleColor = useAnimatedStyle(() => ({
      color: interpolateColor(inputAnim.value, [0, 1], ["gray", activeColor]),
    }));

    return (
      <View style={styles.inputContainer}>
        <AnimatedTextInput
          style={[
            styles.input,
            inputStyle,
            { paddingRight: isSecure ? 40 : 10 },
            { color: textColor },
          ]}
          selectionColor={activeColor}
          value={value}
          secureTextEntry={showPassword}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></AnimatedTextInput>
        <Animated.View
          style={[
            styles.label,
            !value ? labelStyleTop : { top: -10 },
            { backgroundColor: backgroundColor },
          ]}
          pointerEvents={"none"}
        >
          <Animated.Text style={labelStyleColor}>{label}</Animated.Text>
        </Animated.View>
        {isSecure && (
          <Ionicons
            style={styles.icon}
            name={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
            size={20}
            color={showPassword ? "gray" : activeColor}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    width: "100%",
    // marginTop: 20,
    flex: 0,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  label: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 2,
    marginHorizontal: 20,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 20,
    paddingLeft: 20,
    paddingVertical: 8,
    borderStyle: "solid",
    width: "100%",
    color: "black",
    backgroundColor: "transparent",
  },
  icon: {
    position: "absolute",
    right: 0,
    marginRight: 10,
  },
});

export default AnimatedInput;
