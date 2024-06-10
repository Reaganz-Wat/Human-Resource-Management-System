import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, IconButton, TextInput } from "react-native-paper";
import FloatingButton from "../../components/FloatingButton";
import CustomModal from "../../components/CustomModal";
import MyAPI from "../../components/API";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/CustomButton";

function AdminEmployeeBenefits() {
  const [modalVisible, setModalVisible] = useState(false);
  const [benefitId, setBenefitId] = useState("");
  const [benefit, setBenefit] = useState("");
  const [description, setDescription] = useState("");
  const [benefitsData, setBenefitsData] = useState([]);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [userId, setUserId] = useState(null);

  // flags to show actions e.g, editing
  const [isDeleting, setIsDeleting] = useState(false);

  const get_user_id = async () => {
    const id = await AsyncStorage.getItem("user_id");
    if (id) {
      setUserId(id);
    }
  };

  useEffect(() => {
    fetchBenefitsData();
    get_user_id();
    console.log("user_id: ", userId);
  }, []);

  const fetchBenefitsData = async () => {
    try {
      const response = await axios.get(MyAPI.benefits_endpoint);
      const responseData = response.data;
      setBenefitsData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching benefits data:", error);
    }
  };

  const handleCardPress = (item) => {
    setSelectedBenefit(item);
    setBenefitId(item.benefit_id);
    setBenefit(item.benefit);
    setDescription(item.description);
    setModalVisible(true);
  };

  const deleteBenefit = async () => {
    try {
      const response = await axios.post(MyAPI.delete_benefit, {
        params: { id: benefitId },
      });
      const response_data = response.data;
      console.log("Delete Response: ", response_data);
      fetchBenefitsData(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting benefit:", error);
    }
  };
  

  const RenderItems = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => handleCardPress(item)}
      onLongPress={() => {
        setBenefitId(item.benefit_id);
        setIsDeleting(true);
        setModalVisible(true);
      }}
    >
      <Card.Title
        title={item.benefit}
        left={(props) => (
          <IconButton {...props} icon="folder" color="#4CAF50" size={30} />
        )}
      />
      <Card.Content>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  const benefitForms = () => (
    <View style={styles.modalContainer}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", margin: 5 }}>
          {selectedBenefit ? "Edit Benefit Program" : "Add Benefit Program"}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <TextInput
          placeholder="Benefit name"
          value={benefit}
          onChangeText={setBenefit}
        />
        <TextInput
          placeholder="Benefit description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "red" }]}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={{ color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            setModalVisible(!modalVisible);
            selectedBenefit
              ? editBenefitProgram()
              : sendBenefitProgramsToDatabase();
          }}
        >
          <Text style={{ color: "#fff" }}>
            {selectedBenefit ? "Edit Benefit" : "Create Benefit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const DeleteForm = () => (
    <View>
      <Text>Are you sure you want to delete ?</Text>
      <View>
        <CustomButton
          title={"Cancel"}
          color={"blue"}
          onPress={() => {
            setIsDeleting(false);
            setModalVisible(false);
          }}
        />
        <CustomButton title={"Delete"} color={"red"} onPress={
          ()=>{
            deleteBenefit();
            setModalVisible(false);
          }
        } />
      </View>
    </View>
  );

  const sendBenefitProgramsToDatabase = async () => {
    try {
      const response = await axios.post(MyAPI.create_benefit, {
        benefit: benefit,
        description: description,
        created_by: userId,
      });
      const response_data = await response.data;
      console.log("Response: ", response_data);
      fetchBenefitsData(); // Refresh the list after adding a new benefit
    } catch (error) {
      console.log("ERROR_: ", error);
    }
  };

  const editBenefitProgram = async () => {
    try {
      const response = await axios.post(MyAPI.edit_benefit, {
        id: benefitId,
        benefit: benefit,
        description: description,
        modified_by: userId,
      });
      const response_data = await response.data;
      console.log("Response: ", response_data);
      fetchBenefitsData(); // Refresh the list after editing a benefit
      setSelectedBenefit(null); // Reset selected benefit after edit
    } catch (error) {
      console.log("ERROR_: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={benefitsData}
        renderItem={({ item }) => <RenderItems item={item} />}
        keyExtractor={(item) => item.benefit_id}
        showsVerticalScrollIndicator={false}
      />
      <CustomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
        contentComponent={isDeleting ? DeleteForm : benefitForms}
      />
      <FloatingButton
        onPress={() => {
          setSelectedBenefit(null);
          setBenefit("");
          setDescription("");
          setModalVisible(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  modalContainer: {},
  buttons: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdminEmployeeBenefits;
