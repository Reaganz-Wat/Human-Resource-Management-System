import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import CardComp from "../../components/CardComp";

function UsersDetails() {
  // variables
  const route = useRoute();
  const userId = route.params.id;

  // FUNCTIONS AND COMPONENTS
  // text component
  const TextComponent = ({name, value}) => (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <Text style={styles.label}>{name}:</Text>
      <Text style={[styles.label, { fontWeight: "bold" }]}>{value}</Text>
    </View>
  );

  // content for the card
  const Content = () => (
    <View>
      <TextComponent name={"Username"} value={"Reagan-Wat"}/>
      <TextComponent name={"Email"} value={"reaganwatmon6@gmail.com"} />
      <TextComponent name={"Role"} value={"Admin"} />
      <TextComponent name={"Department"} value={"IT Department"} />
    </View>
  );

  return (
    <SafeAreaView>
      {/* Profile Image */}
      <View>
        <Image
          source={require("../../../assets/wat.jpg")}
          style={styles.profilePic}
        />
      </View>

      {/* Main body */}
      <CardComp>
        <Content />
      </CardComp>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: "#696969",
    marginBottom: 5,
    alignSelf: "flex-start",
  }
});

export default UsersDetails;
