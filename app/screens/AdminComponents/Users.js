import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import MyAPI from "../../components/API";
import MemberCard from "../../components/MemberCard";

const Users = ({navigation}) => {
  const [usersInfo, setUsersInfo] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(MyAPI.fetchUsers);
      const response_data = response.data;
      setUsersInfo(response_data);
      console.log(response_data);
    } catch (error) {
      console.error(error);
    }
  };

  const RenderItem = ({ item }) => <MemberCard item={item} nextPage onPress={
    () => navigation.navigate("userdetailscreen", {id: item.user_id})
  } />;

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={usersInfo}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.user_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    flex: 1,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  topcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
  },
});

export default Users;
