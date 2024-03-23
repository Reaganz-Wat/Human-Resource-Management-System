import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../components/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import RNPickerSelect from "react-native-picker-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextMessage from "../components/TextMessage";
import MyAPI from "../components/API";

const RegisterScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: "Select an option...",
    value: null,
  };

  const options = [
    { label: "Admin", value: "Admin" },
    { label: "Employee", value: "Employee" },
    { label: "Manager", value: "Manager" },
  ];

  // All fields to be captured, Admin, Manager, and Employee
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department_id, setDepartment_id] = useState("");
  const [title, setTitle] = useState("");


  const [modalVisible, setModalVisible] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const successMsg = "Registered Successfully";
  const errorMsg = "Oops! Error Occured";

  const registerMember = () => {
    // console.log("FullName: ", fullName);
    // console.log("Email: ", email);
    // console.log("Password: ", password);
    // console.log("Phone Number: ", phoneNumber);
    // console.log("Department id: ", department_id);
    // console.log("Title: ", title);
    // console.log("Role: ", selectedValue);

    fetch(MyAPI.registerUser, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: fullName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            department_id: department_id,
            job_title: title,
            role: selectedValue
        })
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log("Data: ", data)
        setRegistrationStatus(true)
    })
    .catch((error)=>{
        console.log(error)
        setRegistrationStatus(false)
    });


  }

  const renderProgressBar = () => {
    return (
      <View>
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
              backgroundColor: "rgba(0,0,0,0.7)",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
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
              {registrationStatus ? (
                <Ionicons
                  name="checkmark-done-circle"
                  color={"green"}
                  size={80}
                />
              ) : (
                <MaterialIcons name="cancel" color={"red"} size={80} />
              )}

              <TextMessage
                message={registrationStatus ? successMsg : errorMsg}
                txtSize={18}
                txtColor={registrationStatus ? "green" : "red"}
              />

              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                title="Close"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const ManagerFields = () => (
    <View>
      <Input
        label="Department Name"
        iconName="home-outline"
        placeholder="Department name"
        onChangeText={setDepartment_id}
        value={department_id}
      />
    </View>
  );

  const EmployeeFields = () => (
    <View>
      <Input
        label="Department Name"
        iconName="home-outline"
        placeholder="Department name"
        onChangeText={setDepartment_id}
        value={department_id}
      />

      <Input
        label="Phone number"
        iconName="phone-outline"
        placeholder="Enter your contact"
        keyboardType="numeric"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />

      <Input label="Date of Birth" iconName="calendar-outline" placeholder="DoB" />

      <Input
        label="Job Title"
        iconName="briefcase-outline"
        placeholder="Job title"
        onChangeText={setTitle}
        value={title}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter your details to register
        </Text>
        <View style={{ marginVertical: 20 }}>
          {/* Fullname */}
          <Input
            label="User name"
            iconName="account-outline"
            placeholder="Enter your name"
            onChangeText={setFullName}
            value={fullName}
          />

          {/* Email */}
          <Input
            label="Email"
            iconName="email-outline"
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
          />

          {/* Password */}
          <Input
            label="Password"
            iconName="lock-outline"
            placeholder="Enter your password"
            password
            onChangeText={setPassword}
            value={password}
          />

          {/* Role: Employee, Admin, Manager */}
          <View>
            <Text style={styles.txt}>Role:</Text>
            <View style={styles.inp}>
              <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => setSelectedValue(value)}
                value={selectedValue}
              />
            </View>
          </View>
          {/* Logic here to render based on the */}
          {selectedValue == "Admin"
            ? null
            : selectedValue == "Employee"
            ? EmployeeFields()
            : selectedValue == "Manager"
            ? ManagerFields()
            : null}

          {renderProgressBar()}

          <Button
            title="Register"
            onPress={() => {
              registerMember();
              setModalVisible(!modalVisible);
              
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inp: {
    height: 55,
    backgroundColor: COLORS.light,
    marginBottom: 10,
  },
  txt: {
    color: COLORS.grey,
    fontSize: 14,
  },
});

export default RegisterScreen;
