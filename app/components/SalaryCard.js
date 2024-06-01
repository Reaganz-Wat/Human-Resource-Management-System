import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

const SalaryCard = ({ item, openModal, setSalaryID, setText, ...props }) => {
  return (
    // Render individual employee item
    <TouchableOpacity style={styles.card} >
      <Image
        source={require("../../assets/profile.png")}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.employeeName}>{item.username}</Text>
        <Text style={styles.employeeInfo}>{item.role}</Text>
        <View style={styles.salaryContainer}>
          <Text style={styles.employeeSalary}>
            Salary: ${item.salary_amount}
          </Text>
          <TouchableOpacity style={styles.updateButton} onPress={
            ()=>{
              openModal();
              setSalaryID(item.salary_id);
              setText(item.salary_amount);
            }
            }>
            <Text style={styles.updateTextStyle}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeInfo: {
    fontSize: 16,
    color: "#666",
  },
  employeeSalary: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  updateButton: {
    backgroundColor: "green",
    padding: 4,
    borderRadius: 5,
  },
  updateTextStyle: { color: "#fff" },
  salaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default SalaryCard;
