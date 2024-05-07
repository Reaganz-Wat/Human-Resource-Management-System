import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import SalaryCard from "../components/SalaryCard";
import axios from "axios";
import MyAPI from "../components/API";
import CustomModal from "../components/CustomModal";

const Salary = ({ navigation }) => {
  // variables
  const [employees, setEmployees] = useState([]);

  // Function to fetch salary from the database
  const fetchSalary = () => {
    axios
      .get(MyAPI.fetchSalary)
      .then((response) => {
        setEmployees(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.error(err));
  };

  const updateSalaryToDatabase = async () => {
    try {
      const response = await axios.post(MyAPI.updateSalary, {
        salary_id: salaryId,
        amount: text,
        modified_by: 1,
      });
      const data = response.data;
      console.log("Response: ", data);
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };
  

  // POINTS TO NOTE TOMORROW
  // 1. TRY TO IMPLEMENT THE ASYNC STORAGE TO GET THE LOGGED_IN ID
  // 2. TRY ALL THE THREE POSSIBLE WAYS OF SENDING TO THE DATABASE USING fetch, fetch with promise, and fetch with async, and also axios with promise, and axios with asyn, gain more understanding of it better, also perform some recap on what I did on the other day on how promise comes about

  // useEffect to fetch salary on page load
  useEffect(() => {
    fetchSalary();
  }, []);

  // variable to toggle the modal on and off
  const [modalVisible, setModalVisible] = useState(false);

  // variable to hold the id of salary to be updated
  const [salaryId, setSalaryId] = useState("");

  // update text variable
  const [text, setText] = useState("");

  // Function to open modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close modal
  const cancelModal = () => {
    setModalVisible(false);
  };

  /*
   Function to close the update button
   it also sends the update information to the database
   */
  const updateButton = () => {
    console.log("Input text: ", text);
    console.log("SalaryID: ", salaryId);
    // sends the update infor to the database
    updateSalaryToDatabase();
  };

  /*
   Function UpdateFormContent returns the content to be
   rendered in the Modal as the content
   It accepts the close function to close the modal when
   the cancel button is clicked
   */
  const UpdateFormContent = ({ onClose }) => (
    <View>
      <Text>$123,000</Text>
      <TextInput placeholder="Update Price" onChangeText={setText}></TextInput>
      <View style={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 5,
            width: 60,
            borderRadius: 5,
          }}
          onPress={onClose}
        >
          <Text style={{ color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 5,
            width: 60,
            borderRadius: 5,
          }}
          onPress={() => {
            updateButton();
            setText("");
            onClose();
          }}
        >
          <Text style={{ color: "#fff" }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmployeeItem = ({ item }) => (
    <SalaryCard
      item={item}
      key={item.salary_id}
      openModal={openModal}
      setSalaryID={setSalaryId}
    />
  );

  const handleEmployeePress = () => {
    navigation.navigate("SalaryDetailScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Salary Management</Text>
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.salary_id}
        style={styles.employeeList}
      />

      {/* This is the Custom Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={cancelModal}
        contentComponent={UpdateFormContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Salary;
