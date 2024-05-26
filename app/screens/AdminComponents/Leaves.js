// import React, { useEffect, useState } from "react";
// import { View, FlatList, StyleSheet } from "react-native";
// import LeaveCard from "../../components/LeaveCard";
// import axios from "axios";
// import MyAPI from "../../components/API";

// const Leaves = () => {
//   const [value, setValue] = useState([]);

//   const fetchLeave = async () => {
//     try {
//       const response = await axios.get(MyAPI.get_accepted_leaves);
//       const dataInfo = await response.data;
//       setValue(dataInfo);
//       console.log(dataInfo);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchLeave();
//   }, []);

//   const renderLeaveCard = ({ item }) => (
//     <LeaveCard leaveDetails={item} isAdmin={false} />
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         keyExtractor={(item) => item.request_id.toString()}
//         data={value}
//         renderItem={renderLeaveCard}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default Leaves;

import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import LeaveCard from "../../components/LeaveCard";
import axios from "axios";
import MyAPI from "../../components/API";

const Leaves = () => {
  const [value, setValue] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeave = async () => {
    try {
      const response = await axios.get(MyAPI.get_accepted_leaves);
      const dataInfo = await response.data;
      setValue(dataInfo);
      console.log(dataInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLeave().then(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  const renderLeaveCard = ({ item }) => (
    <LeaveCard leaveDetails={item} isAdmin={false} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.request_id.toString()}
        data={value}
        renderItem={renderLeaveCard}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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

export default Leaves;