import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../components/Colors";
import CustomModal from "../../components/CustomModal";

const EmployeeDashboard = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Failed to load username from AsyncStorage", error);
      }
    };

    loadUsername();
  }, []);

  const [data, setData] = useState([
    {
      name: "Profile",
      key: "1",
      topColor: "#5D5FEE",
      backgColor: "#c7d7eb",
      icon: require("../../../assets/profile.png"),
    },
    {
      name: "Attendance",
      key: "2",
      topColor: "#FF4F00",
      backgColor: "#F7D088",
      icon: require("../../../assets/attendance.png"),
    },
    {
      name: "Salary",
      key: "3",
      topColor: "#A556B9",
      backgColor: "#E6AFF5",
      icon: require("../../../assets/salary.png"),
    },
    {
      name: "Performance Reviews",
      key: "4",
      topColor: "#F41E1E",
      backgColor: "#F6AEAE",
      icon: require("../../../assets/report.png"),
    },
    {
      name: "Leave Requests",
      key: "5",
      topColor: "#511F52",
      backgColor: "#ECD4EA",
      icon: require("../../../assets/job-offer.png"),
    },
    {
      name: "Employee Benefits",
      key: "11",
      topColor: "#5D5FEE",
      backgColor: "#c7d7eb",
      icon: require("../../../assets/benefits.png"),
    },
  ]);

  const handleClick = (itemID) => {
    switch (itemID) {
      case "1":
        navigation.navigate("EmployeeProfile");
        break;
      case "2":
        navigation.navigate("EmployeeAttendance");
        break;
      case "3":
        navigation.navigate("EmployeeSalaryScreen");
        break;
      case "4":
        navigation.navigate("EmployeePerformanceScreen");
        break;
      case "5":
        navigation.navigate("LeaveRequestsScreen");
        break;
      case "11":
        navigation.navigate("EmployeeBenefits");
        break;
      default:
        console.log("Unknown itemID:", itemID);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleClick(item.key)}>
      <View
        style={[
          styles.card,
          { borderTopColor: item.topColor, backgroundColor: item.backgColor },
        ]}
      >
        <View style={styles.cardInner}>
          <Image style={styles.img} source={item.icon} />
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: item.topColor }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  // logout function
  const logout = () => {
    //navigation.navigate("LoginScreen");
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  // cancel the modal
  const cancel = () => {
    setModalVisible(false);
  }

  //   Modal content
  const logoutContent = () => (
    <View>
      <TouchableOpacity style={[styles.buttons, {backgroundColor: 'blue'}]}>
        <Text style={styles.textStyles}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout} style={styles.buttons}>
        <Text style={styles.textStyles}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancel} style={[styles.buttons, {backgroundColor: 'green'}]}>
        <Text style={styles.textStyles}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {username}!</Text>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Image
            style={styles.userImage}
            source={require("../../../assets/profile.png")}
          />
        </Pressable>
      </View>

      {/* Main content */}
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Menu Custom Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
        contentComponent={logoutContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#c7d7eb",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },
  card: {
    width: 160,
    height: 200,
    borderRadius: 10,
    borderTopWidth: 4,
    marginVertical: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  cardInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  textStyles: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});

export default EmployeeDashboard;
