import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import COLORS from "../../components/Colors";
import PieChart from "react-native-pie-chart";
import axios from "axios";
import MyAPI from "../../components/API";
import MemberCard from "../../components/MemberCard";

const Users = ({ navigation }) => {
  const series = [15, 8, 3];
  const widthAndHeight = 120;
  const sliceColor = [COLORS.blue, COLORS.lightBlue, COLORS.grey];
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [users, setUsers] = useState([]);
  const fetchAllUsers = () => {
    axios
      .get(MyAPI.fetchUsers)
      .then((response) => {
        setUsers(response.data);
        console.log(users);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchAllUsers();
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.topcontainer}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.6}
              coverFill={"#FFF"}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center", alignSelf: "center" }}>
            <View style={{ flexDirection: "row", gap: 5, margin: 3 }}>
              <View
                style={{ width: 30, height: 30, backgroundColor: COLORS.blue }}
              />
              <Text style={{ fontSize: 20 }}>Employees</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5, margin: 3 }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: COLORS.lightBlue,
                }}
              />
              <Text style={{ fontSize: 20 }}>Managers </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5, margin: 3 }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: COLORS.grey,
                }}
              />
              <Text style={{ fontSize: 20 }}>Admin</Text>
            </View>
          </View>
        </View>

        {users.map((item) => (
          <MemberCard item={item} key={item.user_id}/>
        ))}
        
      </ScrollView>
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
