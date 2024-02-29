import React from 'react';
import { SafeAreaView, View } from 'react-native';
import COLORS from '../../components/Colors';
import Header from '../../components/Header';
const Home = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header title="Home"/>
            </View>
        </SafeAreaView>
    );
}

export default Home;