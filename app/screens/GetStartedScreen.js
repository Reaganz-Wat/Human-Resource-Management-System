import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../components/Colors';
import Button from '../components/Button';
import { useFonts } from 'expo-font';
import WhiteButton from '../components/WhiteButton';


const GetStartedScreen = ({navigation}) => {

    const go_to_login = () => {
        navigation.navigate('LoginScreen');
    }

    const [fontsLoaded] = useFonts({
        'Inter-Black': require('../../assets/fonts/youmurdererbb_reg.ttf'), // Adjust the path and file extension if needed
    });

    if (!fontsLoaded) {
        // Fonts are not yet loaded
        return null; // You can return a loading indicator or any other component
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                backgroundColor: COLORS.blue,
                flex: 1,
                paddingHorizontal: 20
            }}>
                <Image source={require("../../assets/white.png")} style={{width: 110, height: 110, alignSelf: 'flex-start', marginTop: 20}}/>
                <Image source={require("../../assets/wat.jpg")}
                style={{width: 200, height: 200, alignSelf: 'center', borderRadius: 12, marginBottom: 50, transform: [
                    {translateX: 10}, {translateY: 10}, {rotate: '-20deg'}
                ]}}/>
                <Text style={{fontSize: 55, marginVertical: 5, fontFamily: 'Inter-Black', color: "#fff"}}>Human Resource</Text>
                <Text style={{fontSize: 25, marginVertical: 5, color: "#fff"}}>Management System</Text>
                <Text style={styles.reg_and_name}>Watmon Reagan Nyero</Text>
                <Text style={styles.reg_and_name}>21/U/3438/GCS/PS</Text>
            
                <WhiteButton title="Get Started" onPress={go_to_login}/>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    reg_and_name: {
        alignSelf: 'center',
        marginVertical: 5,
        color: "#fff"
    }
});

export default GetStartedScreen;