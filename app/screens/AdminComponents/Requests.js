import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../../components/Colors";

const Requests = () => {

    // Here i want to make the pending, when you click it shows approved 
    // with the color changing to green
    // and also when the cancel request is clicked, it shows red with the word canceled
  const [status, setStatus] = useState();

  const leaveCard = () => (
    <View style={styles.leaveCardStyle}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Sick Leave Request
      </Text>
      <Text style={{ fontSize: 15 }}>08/04/2023 - 10/04/2023</Text>
      <Text>Pending approval from Admin</Text>
      <View style={styles.buttonStyles}>
        <TouchableOpacity style={styles.touchStyles}>
          <Text>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchStyles}>
          <Text>Cancel Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <ScrollView>
        {leaveCard()}
        {leaveCard()}
        {leaveCard()}
        {leaveCard()}
        {leaveCard()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leaveCardStyle: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    elevation: 8,
    gap: 7,
    marginVertical: 5,
    marginHorizontal: 10
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

export default Requests;
