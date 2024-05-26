import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation } from "react-native";
import COLORS from "./Colors";

const LeaveCard = ({ leaveDetails, updateLeaveStatus, isAdmin }) => {
  const {
    request_id,
    username,
    leave_type,
    start_date,
    end_date,
    status: initialStatus,
    reason,
    created
  } = leaveDetails;

  const [status, setStatus] = useState(initialStatus || "Pending");
  const [isReasonVisible, setIsReasonVisible] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (updateLeaveStatus) {
      updateLeaveStatus(request_id, newStatus); // Update the status in the database
    }
  };

  const toggleReasonVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsReasonVisible(!isReasonVisible);
  };

  return (
    <View style={styles.leaveCardStyle}>
      <Text style={styles.leaveType}>{leave_type}</Text>
      <View style={styles.userInfoContainer}>
        <View style={styles.userIcon}>
          <Text style={styles.userIconText}>{username[0]}</Text>
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.dates}>{start_date} - {end_date === "0000-00-00" ? "Ongoing" : end_date}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <TouchableOpacity onPress={toggleReasonVisibility} style={styles.reasonButton}>
        <Text style={styles.reasonButtonText}>
          {isReasonVisible ? "Hide Reason" : "Show Reason"}
        </Text>
      </TouchableOpacity>
      {isReasonVisible && <Text style={styles.reasonText}>{reason}</Text>}
      <Text style={styles.createdDate}>Created on: {created}</Text>
      {isAdmin && (
        <View style={styles.buttonStyles}>
          <TouchableOpacity
            style={[
              styles.touchStyles,
              status === "Accepted"
                ? { backgroundColor: "green" }
                : status === "Cancelled"
                ? { backgroundColor: COLORS.red }
                : null,
            ]}
            onPress={() => handleStatusChange("Accepted")}
          >
            <Text>
              {status === "Pending"
                ? "Pending"
                : status === "Accepted"
                ? "Accepted"
                : "Cancelled"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchStyles}
            onPress={() => handleStatusChange("Cancelled")}
          >
            <Text>Cancel Request</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leaveCardStyle: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    elevation: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
    borderRightWidth: 4,
    borderRightColor: COLORS.grey,
  },
  leaveType: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 5,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.blue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  userIconText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    fontSize: 15,
    color: COLORS.darkGrey,
  },
  dates: {
    fontSize: 15,
    color: COLORS.darkGrey,
    marginBottom: 5,
  },
  status: {
    fontSize: 15,
    color: COLORS.darkGrey,
    marginBottom: 5,
  },
  reasonButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  reasonButtonText: {
    color: COLORS.blue,
    fontWeight: "bold",
  },
  reasonText: {
    fontSize: 15,
    color: COLORS.darkGrey,
    marginBottom: 5,
  },
  createdDate: {
    fontSize: 13,
    color: COLORS.lightGrey,
    marginBottom: 10,
  },
  buttonStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchStyles: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
});

export default LeaveCard;