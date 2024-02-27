import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../components/Colors";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginScreen = ({navigation}) => {

    const go_to_login = () => {
        navigation.navigate('RegisterScreen');
    }
    const go_to_admin = () => {
        navigation.navigate('AdminDashboard');
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>Login</Text>
                <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>Login to HMR</Text>
                <View style={{marginVertical: 20}}>
                    <Input label="Username" iconName="account-outline" placeholder="Enter your username"/>
                    <Input label="Password" iconName="lock-outline" placeholder="Enter your password" password />
                    <Button title="Login" onPress={go_to_admin}/>
                    <Text style={{color: COLORS.black, textAlign: 'center', fontWeight: 'bold'}} onPress={go_to_login}>Don't have an account?SignUp</Text>
                    <Text style={{textAlign: 'center', color: COLORS.black, fontWeight: 'bold', marginVertical: 10}}>Fogort your password: Reset</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen;