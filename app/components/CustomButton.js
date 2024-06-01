import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const CustomButton = ({ title, color, ...props}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.buttonStyles, {backgroundColor: color}]}
      {...props}
      >
        <Text style={styles.textStyles}> {title} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: "blue",
    padding: 6,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  textStyles: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CustomButton;
