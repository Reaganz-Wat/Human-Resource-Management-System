// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FlatList, ScrollView, Text, View } from "react-native";
// import MyAPI from "../../components/API";
// import MemberCard from "../../components/MemberCard";

// const Attendance = ({ navigation }) => {
//   const [users, setUsers] = useState([]);
//   const fetchUsers = () => {
//     axios
//       .get(MyAPI.fetchEmployees)
//       .then((response) => {
//         setUsers(response.data);
//         // console.log(response.data);
//       })
//       .catch((err) => console.error(err));
//   };

//   const RenderAttendance = ({ items }) => {
//     <View>
//       <MemberCard
//         item={items}
//         nextPage
//         onPress={() => markAttendancePage(items.username, items.employee_id)}
//       />
//     </View>;
//   };

//   useEffect(() => {
//     fetchUsers();
//     console.log("Users: ", users);
//   }, []);

//   const markAttendancePage = (name, id) => {
//     navigation.navigate("MarkAttendanceScreen", { name, id });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* <ScrollView>
//         {users.map((item) => (
//           // key is needed for each items
//           <View key={item.user_id}>
//             <MemberCard
//               item={item}
//               nextPage
//               onPress={() =>
//                 markAttendancePage(item.username, item.employee_id)
//               }
//             />
//           </View>
//         ))}
//       </ScrollView> */}
//       <FlatList
//         data={users}
//         renderItem={({item}) => (<RenderAttendance items={item}/>) }
//         keyExtractor={(item) => item.user_id}
//       />
//     </View>
//   );
// };

// export default Attendance;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import MyAPI from "../../components/API";
import MemberCard from "../../components/MemberCard";

const Attendance = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(MyAPI.fetchEmployees)
      .then((response) => {
        setUsers(response.data);
        console.log("Users fetched: ", response.data); // Log fetched users here
      })
      .catch((err) => console.error(err));
  };

  const RenderAttendance = ({ items }) => (
    <View>
      <MemberCard
        item={items}
        nextPage
        onPress={() => markAttendancePage(items.username, items.employee_id)}
      />
    </View>
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const markAttendancePage = (name, id) => {
    navigation.navigate("MarkAttendanceScreen", { name, id });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        renderItem={({ item }) => <RenderAttendance items={item} />}
        keyExtractor={(item) => item.employee_id}
      />
    </View>
  );
};

export default Attendance;
