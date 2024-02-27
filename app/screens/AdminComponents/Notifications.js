import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notifications = () => {
    return (
        <View style={style.container}>
            <Text style={{fontSize: 22}} onPress={()=>alert("This is a notification")}>Notifications</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
} });

export default Notifications;