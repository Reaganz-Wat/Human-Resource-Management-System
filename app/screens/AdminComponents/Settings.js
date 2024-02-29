import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => {
    return (
        <View style={style.container}>
            <Text style={{fontSize: 22}}>Settings Page</Text>
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

export default Settings;