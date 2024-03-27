import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../components/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";
import MyAPI from "../../components/API";
import axios from "axios";

const Departments = () => {
  const API = MyAPI.readDepartment;

  const [departments, setDepartments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [status, setStatus] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);

  const fetchMydata = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMydata();
  }, [status]);

  const handleDepartmentItemClick = (id, name) => {
    setEditDepartmentId(id);
    setDepartmentName(name);
    setEditMode(true);
    setVisible(true);
  };

  const handleCancel = () => {
    setDepartmentName("");
    setEditDepartmentId(null);
    setEditMode(false);
    setVisible(false);
  };

  const handleAdd = () => {
    if (editMode) {
      // Update department

      // Update department
      axios
        .put(MyAPI.editDepartment, {
          id: editDepartmentId,
          name: departmentName,
          logged_in_user_id: 1,
        })
        .then((response) => {
          console.log("Department updated successfully:", response.data);

          // setting status so that when the update is taken, it should re-fresh
          setStatus(!status);
          // You can update the departments state or perform any other necessary actions upon successful update
        })
        .catch((error) => {
          console.error("Error updating department:", error);
          // Handle error appropriately
        });
    } else {
      // Add department
      // You need to implement your add logic here

      // Add department
      axios
        .post(MyAPI.createDepartment, {
          department_name: departmentName,
          id: 1,
        })
        .then((response) => {
          console.log("Department added successfully:", response.data);
          // You can update the departments state or perform any other necessary actions upon successful addition

          // this is used for updating the UI
          setStatus(!status);
        })
        .catch((error) => {
          console.error("Error adding department:", error);
          // Handle error appropriately
        });

      console.log("Add department with name:", departmentName);
    }
    setDepartmentName("");
    setEditDepartmentId(null);
    setEditMode(false);
    setVisible(false);
  };
  const showDialog = () => {
    setVisible(true);
  };
  const showDeleteDialog = (id) => {
    setDeleteDepartmentId(id);
    setDeleteMode(true);
  };
  const cancelDeleteDialog = () => {
    setDeleteMode(false);
  };
  const deleteButton = () => {
    axios
      .post(MyAPI.deleteDepartment, {
        id: deleteDepartmentId,
      })
      .then((response) => {
        console.log("Department deleted successfully:", response.data);

        // setting status so that when the update is taken, it should re-fresh
        setStatus(!status);
        // You can update the departments state or perform any other necessary actions upon successful update
      })
      .catch((error) => {
        console.error("Error deleting department:", error);
        // Handle error appropriately
      });
    setDeleteDepartmentId(null);
    setDeleteMode(false);
    setVisible(false);
  };

  const renderDepartment = ({ item }) => {
    return (
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.editButton}>
              <Ionicons
                name="create-outline"
                size={28}
                onPress={() => handleDepartmentItemClick(item.key, item.name)}
              />
            </View>
            <View style={[styles.editButton, {backgroundColor: COLORS.delete_button}]}>
            <Ionicons
              name="trash-outline"
              size={28}
              onPress={() => {
                showDeleteDialog(item.key);
              }}
            />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    
      <FlatList
        numColumns={1}
        keyExtractor={(item) => item.key}
        data={departments}
        renderItem={renderDepartment}
      />

      <TouchableOpacity style={styles.addButton} onPress={showDialog}>
        <Ionicons name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>

      <Dialog.Container visible={visible}>
        <Dialog.Title>
          {editMode ? "Edit Department" : "Add Department"}
        </Dialog.Title>
        <Dialog.Input
          placeholder="Enter department name"
          onChangeText={(text) => setDepartmentName(text)}
          value={departmentName}
        />
        <Dialog.Button label="CANCEL" onPress={handleCancel} />
        <Dialog.Button label={editMode ? "SAVE" : "ADD"} onPress={handleAdd} />
      </Dialog.Container>

      {/* Delete Modal dialog */}
      <Dialog.Container visible={deleteMode}>
        <Dialog.Title style={{ color: "red" }}>
          Are you sure you want to delete ?
        </Dialog.Title>
        <Dialog.Button label="CANCEL" onPress={cancelDeleteDialog} />
        <Dialog.Button label="DELETE" onPress={deleteButton} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginLeft: 5,
    marginRight: 10,
    marginVertical: 5
  },
  card: {
    height: 80,
    backgroundColor: "#DCE9ED",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: "blue",
    elevation: 3,
  },
  addButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 15,
    right: 15,
    height: 70,
    backgroundColor: COLORS.blue,
    borderRadius: 100,
  },
  editButton: {
    backgroundColor: COLORS.edit_button,
    width: 40,
    borderRadius: 6,
    alignItems: 'center',
    padding: 2,
    margin: 1
  },
});

export default Departments;
