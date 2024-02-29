import React from 'react';
import COLORS from '../components/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from './AdminDashboard';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
        screenOptions={{
            drawerStyle: {
                backgroundColor: COLORS.white,
                width: 200
            },
            headerStyle: {
                backgroundColor: COLORS.white
            },
            headerShown: false,
            headerTintColor: COLORS.black,
            drawerLabelStyle: {
                color: COLORS.black,
                fontSize: 14,
                marginLeft: -10
            }
        }}
        >
        <Drawer.Screen
            name='Homer'
            options={{
                drawerLabel: "Home",
                title: "Home",
                headerShadowVisible: false,
                drawerIcon: ()=>(
                    <Ionicons name="settings" size={20} color="blue"/>
                )
            }}
            component={AdminDashboard} 
        />
        </Drawer.Navigator>
    );
}


export default DrawerNavigation;