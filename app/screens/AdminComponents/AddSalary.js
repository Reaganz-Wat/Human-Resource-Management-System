import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";
import MyAPI from "../../components/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddSalary = () => {
  const [userId, setUserId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [salary, setSalary] = useState("");
  const [employees, setEmployees] = useState([{
    id: 1,
    name: "John Doe",
    title: "Software Engineer",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Product Manager",
    image: "https://via.placeholder.com/150",
  },]);

  const createSalary = async () => {
    try {
      const response = await axios.post(MyAPI.create_salary, {
        user_id: selectedEmployeeId,
        salary: salary,
        creator_id: userId,
      });
      const response_data = await response.data;
      console.log("Response: ", response_data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployee = async () => {
    try {
        const response = await axios.get(MyAPI.get_emp_sal);
        const response_data = await response.data;
        setEmployees(response_data);
      } catch (err) {
        console.log(err);
    }
  }

  useEffect(()=>{
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
    
    // get all users
    getEmployee();
  }, []);

  const renderEmployee = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedEmployeeId(item.id);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddSalary = () => {
    // Add your logic to handle the salary assignment
    // console.log("USER ID: ", userId);
    // console.log("EMPLOYEE ID: ", selectedEmployeeId);
    // console.log("SALARY: ", salary);
    createSalary();
    setModalVisible(false);
    setSalary("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Add Salary for {selectedEmployee?.name}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Salary"
              value={salary}
              onChangeText={setSalary}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Add Salary" onPress={handleAddSalary} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddSalary;
