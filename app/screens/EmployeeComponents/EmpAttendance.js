import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import MyAPI from "../../components/API";

const EmpAttendance = () => {
  const [userId, setUserId] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);


  const sendDummy = async () => {
    try {
      const response = await axios.get(MyAPI.get_employee_attendance, { params: { id: userId } });
      const response_data = await response.data;
      setAttendanceData(response_data);
      console.log("Response data: ", response_data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const get_user_id = async () => {
      try {
        const response_id = await AsyncStorage.getItem("user_id");
        if (response_id) {
          setUserId(response_id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    get_user_id();
  }, []);

  useEffect(()=>{
    sendDummy();
  }, [userId])

  const renderAttendanceItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <Text style={styles.label}>
        Date: <Text style={styles.value}>{item.date}</Text>
      </Text>
      <Text style={styles.label}>
        Time In: <Text style={styles.value}>{item.time_in}</Text>
      </Text>
      <Text style={styles.label}>
        Time Out: <Text style={styles.value}>{item.time_out || "N/A"}</Text>
      </Text>
      <Text style={styles.label}>
        Status: <Text style={styles.value}>{item.status || "N/A"}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={attendanceData}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.attendance_id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    padding: 20,
  },
  list: {
    paddingBottom: 20,
  },
  attendanceItem: {
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#696969",
    marginBottom: 5,
  },
  value: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default EmpAttendance;