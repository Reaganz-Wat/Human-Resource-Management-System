import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import LeaveCard from "../../components/LeaveCard";
import axios from "axios";
import MyAPI from "../../components/API";

const Requests = () => {
  const [value, setValue] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeave = async () => {
    try {
      const response = await axios.get(MyAPI.leaveRequestcruds);
      const dataInfo = response.data;
      setValue(dataInfo);
      console.log(dataInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLeave().then(()=>{setRefreshing(false)});
  }

  useEffect(() => {
    fetchLeave();
  }, []);

  const updateLeave = (id, newData) => {
    axios
      .post(MyAPI.update_employee_leave, {
        id: id,
        status: newData,
      })
      .then((response) => {
        console.log("Response: ", response.data);
        fetchLeave(); // Refresh data after update
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderLeaveCard = ({ item }) => (
    <LeaveCard leaveDetails={item} updateLeaveStatus={updateLeave} isAdmin={true} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.request_id.toString()}
        data={value}
        renderItem={renderLeaveCard}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>{
            fetchLeave().then(()=>{onRefresh})
          }}/>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Requests;