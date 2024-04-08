import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const My3DButton = ({ text, faceColor, sidecolor, ...props }) => {
  const [pressedButton, setPressedButton] = useState(null);

  const handleButtonPressIn = (buttonName) => {
    setPressedButton(buttonName);
  };

  const handleButtonPressOut = () => {
    setPressedButton(null);
  };

  const isPressed = (buttonName) => {
    return buttonName === pressedButton;
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          isPressed("info") && styles.buttonPressed,
          { backgroundColor: faceColor, borderColor: sidecolor },
        ]}
        onPressIn={() => handleButtonPressIn("info")}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center",
    marginVertical: 5,
    alignItems: "center",
    width: 200,
    height: 60,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: "#eee",
    borderBottomWidth: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    shadowColor: "#1c5da6",
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    borderBottomWidth: 0,
  },
});

export default My3DButton;
