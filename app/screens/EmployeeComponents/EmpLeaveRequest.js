import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";
import COLORS from "../../components/Colors";
import MyAPI from "../../components/API";
import FloatingButton from "../../components/FloatingButton";
import { TextInput } from "react-native-gesture-handler";
import CustomModal from "../../components/CustomModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LeaveCard from "../../components/LeaveCard";

const EmpLeaveRequest = () => {
  const [value, setValue] = useState([]);
  const [userId, setUserId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const fetchLeave = async (id) => {
    try {
      const response = await axios.get(MyAPI.get_employee_leaves_by_id, {
        params: { id }
      });
      const dataInfo = response.data;
      setValue(dataInfo);
      console.log(dataInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const id = await AsyncStorage.getItem("user_id");
        if (id) {
          setUserId(id);
          fetchLeave(id); // Fetch leave data once user ID is set
        }
      } catch (error) {
        console.log("Error fetching user_id from AsyncStorage:", error);
      }
    };

    getUserIdFromStorage();
  }, []);

  const saveLeaveRequest = async () => {
    try {
      const response = await axios.post(MyAPI.create_employee_leaves, {
        "start_date": startDate,
        "end_date": endDate,
        "leavetype": leaveType,
        "reason": reason,
        "created_by": userId
      });
      const response_data = await response.data;
      console.log("Response: ", response_data);
    } catch (err) {
      console.log("Error: ", err);
    }

    // refresh
    if(userId === null) {
      console.log("UserId is null");
    } else {
      fetchLeave(userId);
    }
  }

  const renderLeaveCard = ({ item }) => (
    <LeaveCard leaveDetails={item} isAdmin={false} />
  );

  const handleFloatingButtonClick = () => {
    setModalVisible(true);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date.toISOString().split('T')[0]);
    setStartDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date.toISOString().split('T')[0]);
    setEndDatePickerVisible(false);
  };

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <TextInput
        style={styles.input}
        placeholder="Leave Type e.g Holiday leave"
        value={leaveType}
        onChangeText={setLeaveType}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setStartDatePickerVisible(true)}
      >
        <Text>{startDate ? startDate : "Start Date"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setEndDatePickerVisible(true)}
      >
        <Text>{endDate ? endDate : "End Date"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Reason"
        value={reason}
        onChangeText={setReason}
      />
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={() => setStartDatePickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={() => setEndDatePickerVisible(false)}
      />
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={() => {
            // Add logic to submit leave
            setModalVisible(false);
            saveLeaveRequest();
          }}
        >
          <Text style={styles.buttonText}>Submit Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => {
            // clear the input fields
            setModalVisible(false);
            setStartDate("");
            setEndDate("");
            setLeaveType("");
            setReason("");
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Leave request */}
      <FlatList
        keyExtractor={(item) => item.request_id}
        data={value}
        renderItem={renderLeaveCard}
      />

      {/* Modal for entering leave request */}
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} contentComponent={renderModalContent} />

      {/* Floating button */}
      <FloatingButton onPress={handleFloatingButtonClick} />
      
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
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: COLORS.lightBlue,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: COLORS.red,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

export default EmpLeaveRequest;