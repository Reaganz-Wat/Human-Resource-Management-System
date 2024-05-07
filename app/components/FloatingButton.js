import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from "./Colors";

function FloatingButton({...props}) {
  return (
    <View>
      <TouchableOpacity style={styles.addButton} {...props}>
        <Ionicons name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    addButton: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        position: "absolute",
        bottom: 15,
        right: 15,
        height: 70,
        backgroundColor: COLORS.blue,
        borderRadius: 100,
    }
});

export default FloatingButton;
