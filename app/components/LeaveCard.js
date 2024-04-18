import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "./Colors";

const LeaveCard = ({ leaveDetails }) => {
  const [status, setStatus] = useState("Pending");
  return (
    <View style={styles.leaveCardStyle}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {leaveDetails.leave_type}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.blue,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            {leaveDetails.username[0]}
          </Text>
        </View>
        <Text style={{ alignSelf: "center", fontSize: 15 }}>
          {leaveDetails.username}
        </Text>
      </View>
      <Text style={{ fontSize: 15 }}>
        {leaveDetails.start_date} - {leaveDetails.end_date}
      </Text>
      <View style={styles.buttonStyles}>
        <TouchableOpacity
          style={[
            styles.touchStyles,
            status == "Accepted"
              ? { backgroundColor: "green" }
              : status == "Cancelled"
              ? { backgroundColor: COLORS.red }
              : null,
          ]}
        >
          <Text>
            {status == "Pending"
              ? "Pending"
              : status == "Accepted"
              ? "Accepted"
              : "Cancelled"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchStyles}>
          <Text>Cancel Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leaveCardStyle: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    elevation: 8,
    gap: 7,
    marginVertical: 5,
    marginHorizontal: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
    borderRightWidth: 4,
    borderRightColor: COLORS.grey,
  },
  buttonStyles: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    paddingHorizontal: 10,
  },
  touchStyles: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 2,
  },
});

export default LeaveCard;
