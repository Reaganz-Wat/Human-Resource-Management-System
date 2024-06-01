import React, { useState } from "react";
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

function EmployeeBenefits() {
  const [modalVisible, setModalVisible] = useState(false);
  const [benefit, setBenefit] = useState("");
  const [description, setDescription] = useState("");

  const benefitsData = [
    {
      id: 1,
      title: "Healthcare",
      description: "Comprehensive healthcare plans including medical, dental, and vision.",
      icon: "hospital-box",
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Retirement",
      description: "401(k) plan with company matching contributions.",
      icon: "account-cash",
      color: "#2196F3",
    },
    {
      id: 3,
      title: "Vacation",
      description: "Generous paid time off and holiday policies.",
      icon: "beach",
      color: "#FF9800",
    },
    {
      id: 4,
      title: "Education",
      description: "Tuition reimbursement for continued education and professional development.",
      icon: "school",
      color: "#9C27B0",
    },
  ];

  const renderItems = ({ item, index }) => (
    <View style={styles.card}>
      <View style={{ ...styles.cardContent, borderColor: item.color }}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Apply" color="blue" onPress={() => applyForBenefit(item.id)} />
          <CustomButton title="Cancel" color="red" onPress={() => cancelBenefitApplication(item.id)} />
        </View>
      </View>
    </View>
  );

  const benefitForms = () => (
    <View style={styles.modalContainer}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.modalTitle}>Add Benefit Program</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Benefit name" onChangeText={setBenefit} />
        <TextInput placeholder="Benefit description" onChangeText={setDescription} />
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
        data={benefitsData}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(!modalVisible)}
        contentComponent={benefitForms}
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