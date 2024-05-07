import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const CustomCard = ({ cardContent, job, ...props }) => {
  return (
    <TouchableOpacity style={styles.card} {...props}>
      {/* Card content here */}
      {cardContent({job})}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    borderLeftColor: "blue",
    elevation: 5,
    borderLeftColor: "blue",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});

export default CustomCard;
