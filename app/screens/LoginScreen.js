import React, { useState } from "react";
import { View, Text, ScrollView, Keyboard, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from "../components/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import MyAPI from "../components/API";

const LoginScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.username) {
      handleError("Please input username", "username");
      valid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("Password should be at least 5 characters", "password");
      valid = false;
    }
    if (valid) {
      login();
    }
  };

  const login = async () => {
    setModalVisible(true);
    try {
      const response = await fetch(MyAPI.loginUser, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: inputs.username, password: inputs.password }),
      });
      setModalVisible(false);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userData = await response.json();
      console.log("User data: ", userData);

      if (userData.username && userData.password && userData.role) {
        // Successful login, store user data in AsyncStorage
        await AsyncStorage.setItem("user_id", userData.user_id.toString());
        await AsyncStorage.setItem("username", userData.username);
        await AsyncStorage.setItem("role", userData.role);

        // Navigate based on role
        switch (userData.role) {
          case "Admin":
            //navigation.navigate("DrawerNavigation");
            navigation.reset({
              index: 0,
              routes: [{ name: "DrawerNavigation" }]
            })
            break;
          case "Employee":
            //navigation.navigate("EmployeeDashboardScreen");
            navigation.reset({
              index: 0,
              routes: [{ name: "EmployeeDashboardScreen" }]
            });
            break;
          case "Manager":
            //navigation.navigate("ManagerDashboardScreen");
            navigation.reset({
              index: 0,
              routes: [{ name: "ManagerDashboardScreen" }]
            })
            break;
          default:
            Alert.alert("Error", "Unknown user role");
        }
      } else {
        Alert.alert("Error", "Invalid login details");
      }
    } catch (error) {
      setModalVisible(false);
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "User does not exist");
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>Login</Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Login to HMR</Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            label="Username"
            iconName="account-outline"
            placeholder="Enter your username"
            onChangeText={(text) => handleOnChange(text, "username")}
            error={errors.username}
            onFocus={() => handleError(null, "username")}
          />
          <Input
            label="Password"
            iconName="lock-outline"
            placeholder="Enter your password"
            onFocus={() => handleError(null, "password")}
            onChangeText={(text) => handleOnChange(text, "password")}
            error={errors.password}
            password
          />
          <ProgressBar modalVisible={modalVisible} />
          <Button title="Login" onPress={validate} />
          <Text style={{ textAlign: "center", color: COLORS.black, fontWeight: "bold", marginVertical: 10 }}>
            Forgot your password: Reset
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
