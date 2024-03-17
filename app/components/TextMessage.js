import React from "react";
import { View, Text } from "react-native";

function TextMessage({ message, txtSize, txtColor }) {
  return (
    <View>
      <Text style={{ color: txtColor, fontSize: txtSize }}>{message}</Text>
    </View>
  );
}

export default TextMessage;
