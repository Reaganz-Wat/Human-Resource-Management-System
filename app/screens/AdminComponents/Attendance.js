import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MyAPI from "../../components/API";
import MemberCard from "../../components/MemberCard";

function Attendance({ navigation }) {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    axios
      .get(MyAPI.fetchEmployees)
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchUsers();
    console.log("Users: ", users);
  }, []);

  const markAttendancePage = (name) => {
    navigation.navigate("MarkAttendanceScreen", {name});
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {users.map((item) => (
          // key is needed for each items
          <View key={item.user_id}>
            <MemberCard item={item} nextPage onPress={()=>markAttendancePage(item.username)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Attendance;
