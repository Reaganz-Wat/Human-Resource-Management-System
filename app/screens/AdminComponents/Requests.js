import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import COLORS from "../../components/Colors";
import LeaveCard from "../../components/LeaveCard";
import axios from "axios";
import MyAPI from "../../components/API";

const Requests = () => {
  const [leaveD, setLeaveD] = useState([]);
  const [value, setValue] = useState([]);

  const fetchLeave = async () => {
    try {
      const response = await axios.get(MyAPI.leaveRequestcruds);
      const dataInfo = response.data;
      setValue(dataInfo);
      console.log(dataInfo);
    } catch (error) {
      console.log(error);
    }
    
  };

  // fetching the leave using useEffect hook
  useEffect(() => {
    fetchLeave();
  }, []);

  const [status, setStatus] = useState("Pending");

  const renderLeaveCard = ({ item }) => <LeaveCard leaveDetails={item} />;

  return (
    <View style={styles.container}>
      
      <FlatList
        keyExtractor={(Item) => Item.request_id}
        data={value}
        renderItem={renderLeaveCard}
      />

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

export default Requests;
