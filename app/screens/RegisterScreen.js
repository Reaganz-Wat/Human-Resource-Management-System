import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../components/Colors";
import Input from "../components/Input";
import Button from "../components/Button";

const RegisterScreen = ({navigation}) => {

    // const onPress = () => {
    //     navigation.navigate('LoginScreen');
    // }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>Register</Text>
                <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>Enter your details to register</Text>
                <View style={{marginVertical: 20}}>
                    <Input label="Full name" iconName="account-outline" placeholder="Enter your name"/>
                    <Input label="Email" iconName="email-outline" placeholder="Enter your email"/>
                    <Input label="Password" iconName="lock-outline" placeholder="Enter your password" password />
                    <Input label="Phone number" iconName="phone-outline" placeholder="Enter your contact" keyboardType="numeric"/>
                    <Button title="Register"/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen;