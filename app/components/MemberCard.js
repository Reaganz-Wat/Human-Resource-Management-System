import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import COLORS from "./Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const MemberCard = ({ item, nextPage, ...props}) => {
  return (
    <View style={styles.cardContainer}>
      <Pressable
      {...props}
      >
        <View style={styles.card}>
          <View>
            <Image
              source={require("../../assets/profile.png")}
              style={styles.profilePic}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 80, flex: 1 }}>
              <Text style={styles.textStyles}>{item.username}</Text>
              <Text style={{ fontSize: 17 }}>{item.email}</Text>
              <Text style={{ fontSize: 15 }}>{item.role}</Text>
            </View>
            {nextPage ? (
              <View style={{ width: 20 }}>
                <Ionicons name="chevron-forward" size={23} color="blue" />
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    marginHorizontal: 5,
    alignItems: "center",
    borderLeftWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderLeftColor: COLORS.blue,
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 5,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 8,
  },
  textStyles: { fontSize: 20, flexWrap: "wrap" },
});

export default MemberCard;
