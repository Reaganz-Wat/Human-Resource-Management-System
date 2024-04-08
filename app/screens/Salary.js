import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MyAPI from "../components/API";
import SalaryCard from "../components/SalaryCard";

const Salary = ({ navigation }) => {
    const [salaryDetails, setSalaryDetails] = useState([]);
  useEffect(() => {
    axios.get(MyAPI.fetchSalary)
    .then(response=>setSalaryDetails(response.data))
    .catch(error=>console.error(error));
  }, []);

  const cardItems = (item) => (
    <SalaryCard item={item}/>
  );
  
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
      {salaryDetails.map((item)=>(
        <SalaryCard item={item}/>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Salary;