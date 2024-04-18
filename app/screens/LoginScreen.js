import React, { useState } from "react";
import { View, Text, ScrollView, Keyboard, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../components/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import MyAPI from "../components/API";

const LoginScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

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
      handleError("Password should be atleast 5 characters", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = () => {
    setModalVisible(true);
    setTimeout(async () => {
      setModalVisible(false);
      try {
        const response = await fetch(MyAPI.loginUser, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: inputs.username }),
        }); // Adjust the URL accordingly
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let userData = await response.json();

        // log to the console for tracking
        console.log("User data: ", userData);
        
        if (
          inputs.password === userData.password &&
          inputs.username === userData.username
        ) {
          // Successful login
          navigation.navigate("DrawerNavigation");
        } else {
          Alert.alert("Error", "Invalid Details");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "User does not exist");
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const go_to_admin = () => {
    // Uncomment this validate() to authenticate the users
    // validate();
    navigation.navigate("DrawerNavigation");
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Login
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Login to HMR
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            label="Username"
            iconName="account-outline"
            placeholder="Enter your username"
            onChangeText={(text) => handleOnChange(text, "username")}
            error={errors.username}
            onFocus={() => {
              handleError(null, "username");
            }}
          />
          <Input
            label="Password"
            iconName="lock-outline"
            placeholder="Enter your password"
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
            error={errors.password}
            password
          />

          {/* ProgressBar */}
          <ProgressBar modalVisible={modalVisible} />

          <Button title="Login" onPress={go_to_admin} />
          <Text
            style={{
              textAlign: "center",
              color: COLORS.black,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Fogort your password: Reset
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
