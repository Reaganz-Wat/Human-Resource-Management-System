import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from "react-native";
import MyAPI from "../../components/API";
import { Cell } from "react-native-table-component";

const EmpProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [modalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      get_user_profile(userId);
    }
  }, [userId]);

  const get_user_profile = async (userId) => {
    try {
      // console.log("UserId: ", userId);
      const response = await axios.get(MyAPI.get_user_by_id, {
        params: { id: userId },
      });
      const data = response.data;
      // console.log("Profile Info: ", data);
      if (data) {
        setName(data.username); // updated to match the API response
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address || ""); // handle case if address is not returned by the API
        setJobTitle(data.role || ""); // handle case if jobTitle is not returned by the API
      }
    } catch (err) {
      console.error(err);
    }
  };

  // update the update_user_profile to save data to the database
  const handleSave = async () => {
    try {
      const response = await axios.post(MyAPI.edit_employee, {
        id: userId,
        username: name,
        email: email,
        phone: phone,
        address: address,
        role: jobTitle,
      });
      console.log("Profile saved:", response.data);
      if (response.data.message === "Employee updated successfully") {
        setModalVisibility(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../../assets/profile.png")} // Replace with actual image URL
        />
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          value={jobTitle}
          onChangeText={setJobTitle}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={styles.button} onPress={()=>{handleSave()}}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>

        {/* Modal for alerting the user of the update for the profile */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisibility(!modalVisible)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
                <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Profile Updated Successfully</Text>
                <TouchableOpacity style={{backgroundColor: 'green', padding: 5, borderRadius: 5, alignItems: 'center', width: 60, alignSelf: 'center', marginTop: 30}} onPress={()=>{setModalVisibility(false)}}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "600",
  },
  profileContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#696969",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#00BFFF",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default EmpProfile;
