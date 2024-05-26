import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../components/Colors";
import { useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import MyAPI from "../../components/API";

const MarkAttendance = () => {
  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };
  const route = useRoute();
  const name = route.params.name;
  const user_id = route.params.id;
  const firstLetter = route.params.name[0];
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // making a request to the database to create attendance record
  const markAttendanceToDatabase = () => {
    axios
      .post(MyAPI.markAttendancecruds, {
        employee_id: user_id,
        creator_id: 1,
        date: selectedDate.toLocaleString(),
        status: attendanceStatus,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  const modal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            padding: 22,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          
          {selectedDate == null? (<Text style={{ fontSize: 20, marginBottom: 5, color: 'red' }}>
            Please select the date
          </Text>): (<Text style={{ fontSize: 20, marginBottom: 5 }}>
            Attendance Submitted Successfully for {name}
          </Text>)}

          <Button
            title="OK"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* TopHeading and Date */}
      <View style={styles.topdate}>
        <Ionicons name="chevron-back" size={30} color="black" />
        <Pressable style={{ alignSelf: "center" }} onPress={showDatePicker}>
          <Text style={{ fontWeight: "bold" }}>
            {selectedDate == null
              ? "Select Date"
              : selectedDate.toLocaleString()}
          </Text>
        </Pressable>
        <Ionicons name="chevron-forward" size={30} color="black" />
      </View>

      {/* Middlewritings */}
      <View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.blue,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
              {firstLetter}
            </Text>
          </View>
          <View>
            <Text
              style={[styles.textStyles, { fontWeight: "bold", fontSize: 20 }]}
            >
              {name}
            </Text>
            <Text style={styles.textStyles}>Backend Engineer</Text>
          </View>
        </View>
        <Text style={styles.textStyles}>Basic Pay: $50000</Text>
        <Text style={{ fontSize: 20 }}>ATTENDANCE</Text>
      </View>

      {/* Present and Absent radiobuttons */}
      <View style={styles.clickableRow}>
        <View style={styles.radioButtonCard}>
          <Pressable
            onPress={() => {
              setAttendanceStatus("Present");
            }}
          >
            {attendanceStatus === "Present" ? (
              <Ionicons name="radio-button-on" size={30} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={30} color="black" />
            )}
          </Pressable>

          <Text style={styles.textStyles}>Present</Text>
        </View>
        <View style={styles.radioButtonCard}>
          <Pressable
            onPress={() => {
              setAttendanceStatus("Absent");
            }}
          >
            {attendanceStatus === "Absent" ? (
              <Ionicons name="radio-button-on" size={30} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={30} color="black" />
            )}
          </Pressable>

          <Text style={styles.textStyles}>Absent</Text>
        </View>
      </View>

      {/* Halfday and Holiday radiobuttons */}
      <View style={styles.clickableRow}>
        <View style={styles.radioButtonCard}>
          <Pressable
            onPress={() => {
              setAttendanceStatus("Halfday");
            }}
          >
            {attendanceStatus === "Halfday" ? (
              <Ionicons name="radio-button-on" size={30} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={30} color="black" />
            )}
          </Pressable>

          <Text style={styles.textStyles}>Halfday</Text>
        </View>
        <View style={styles.radioButtonCard}>
          <Pressable
            onPress={() => {
              setAttendanceStatus("Holiday");
            }}
          >
            {attendanceStatus === "Holiday" ? (
              <Ionicons name="radio-button-on" size={30} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={30} color="black" />
            )}
          </Pressable>

          <Text style={styles.textStyles}>Holiday</Text>
        </View>
      </View>

      {/* Submit button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          setModalVisible(!modalVisible);
          markAttendanceToDatabase();
          // console.log("ID: ", user_id);
        }}
      >
        <Text style={[styles.textStyles, { color: "#fff", fontSize: 17 }]}>
          Submit attendance
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      {modal()}

      {/* DatePicker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  topdate: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 10,
  },
  radioButtonCard: {
    backgroundColor: COLORS.lightBlue,
    padding: 5,
    borderRadius: 8,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
  },
  textStyles: {
    fontSize: 16,
  },
  clickableRow: {
    flexDirection: "row",
    gap: 9,
  },
  submitButton: {
    backgroundColor: COLORS.blue,
    width: 200,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
});

export default MarkAttendance;