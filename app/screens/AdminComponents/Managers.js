import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ManagersCard from "../../components/ManagersCard";
import axios from "axios";
import MyAPI from "../../components/API";

const Managers = ({ navigation }) => {
  const [managers, setManagers] = useState([]);
  const getManagers = () => {
    axios
      .get(MyAPI.fetchManagers)
      .then((response) => {
        setManagers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getManagers();
  }, []);
  return (
    <View>
      <ScrollView>
        {managers.map((manager) => (
          <View key={manager.manager_id}>
            <ManagersCard item={manager} nextPage={true} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Managers;
