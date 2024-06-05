import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, IconButton, TextInput, Title } from "react-native-paper";
import FloatingButton from "../../components/FloatingButton";
import CustomModal from "../../components/CustomModal";
import MyAPI from "../../components/API";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EmployeeBenefits() {
  const [modalVisible, setModalVisible] = useState(false);
  const [benefit, setBenefit] = useState("");
  const [description, setDescription] = useState("");
  const [benefitData, setBenefitData] = useState([]);
  const [benefitId, setBenefitId] = useState("");
  const [userId, setUserId] = useState("");

  // are for showing modals
  const [isApplying, setIsApplying] = useState(false); // modal for applying for a benefit

  const getBenefits = async () => {
    try {
      const response = await axios.get(MyAPI.benefits_endpoint);
      const response_data = await response.data;
      setBenefitData(response_data);
      console.log(benefitData);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("user_id");
      if (id !== null) {
        setUserId(id);
      } else {
        console.log("No user id exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const benefitApplication = async () => {
    // console.log("Benefit id: ", benefitId);
    // console.log("User id", userId);
    try {
      const response = await axios.post(MyAPI.employee_benefit_application, {
        user_id: userId,
        benefit_id: benefitId,
      });
      const response_data = await response.data;

      console.log("Response: ", response_data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItems = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setIsApplying(true);
        setModalVisible(true);
        setBenefitId(item.benefit_id);
      }}
    >
      <View style={{ ...styles.cardContent, borderColor: item.color }}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.benefit}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardTitle}>{item.date_created}</Text>
        </View>
        {/* <View style={styles.buttonContainer}>
          <CustomButton title="Apply" color="blue" onPress={() => applyForBenefit(item.id)} />
          <CustomButton title="Cancel" color="red" onPress={() => cancelBenefitApplication(item.id)} />
        </View> */}
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    getUserId();
    getBenefits();
  }, []);

  const benefitForms = () => (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.modalTitle}>Add Benefit Program</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Benefit name" onChangeText={setBenefit} />
        <TextInput
          placeholder="Benefit description"
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: "red" }]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={{ color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            setModalVisible(!modalVisible);
            sendBenefitProgramsToDatabase();
          }}
        >
          <Text style={{ color: "#fff" }}>Create Benefit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const benefitContentApplication = () => (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Apply for Benefit Program
        </Text>
      </View>
      <View>
        <CustomButton
          title={"Apply"}
          color={"green"}
          onPress={() => {
            benefitApplication();
            setModalVisible(false);
          }}
        />
        <CustomButton
          title={"Cancel"}
          color={"blue"}
          onPress={() => {
            setModalVisible(false);
            setIsApplying(false);
          }}
        />
      </View>
    </View>
  );

  const sendBenefitProgramsToDatabase = async () => {
    try {
      const response = await axios.post(MyAPI.create_benefit, {
        benefit: benefit,
        description: description,
      });
      const response_data = await response.data;
      console.log("Response: ", response_data);
    } catch (error) {
      console.log("ERROR_: ", error);
    }
  };

  const applyForBenefit = async (benefitId) => {
    try {
      const response = await axios.post(MyAPI.apply_benefit, {
        benefit_id: benefitId,
      });
      console.log("Application response:", response.data);
      fetchBenefitsData();
    } catch (error) {
      console.error("Error applying for benefit:", error);
    }
  };

  const cancelBenefitApplication = async (benefitId) => {
    try {
      const response = await axios.post(MyAPI.cancel_benefit, {
        benefit_id: benefitId,
      });
      console.log("Cancellation response:", response.data);
      fetchBenefitsData();
    } catch (error) {
      console.error("Error canceling benefit application:", error);
    }
  };

  const fetchBenefitsData = async () => {
    try {
      const response = await axios.get(MyAPI.benefits_endpoint);
      const responseData = response.data;
      setBenefitsData(responseData);
    } catch (error) {
      console.error("Error fetching benefits data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={benefitData}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(!modalVisible)}
        contentComponent={isApplying ? benefitContentApplication : benefitForms}
      />
      <FloatingButton onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  cardContent: {
    borderLeftWidth: 4,
    padding: 10,
  },
  cardTextContainer: {
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 5,
  },
  inputContainer: {
    gap: 5,
  },
  modalButtonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  modalButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmployeeBenefits;
