import React from 'react';
import COLORS from '../components/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image } from 'react-native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from './AdminDashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props)=>{
                return (
                    <SafeAreaView>
                        <View style={{
                            width: '100%',
                            height: 200,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.white
                        }}>
                            <Image
                                source={require('../../assets/wat.jpg')}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 50
                                }}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}
                                >Reagan Watmon</Text>
                                <Text>Admin</Text>
                        </View>
                        <DrawerItemList {...props} />
                    </SafeAreaView>
                );
            }}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: COLORS.white,
                    width: 250
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
            name='Profile'
            options={{
                drawerLabel: "Profile",
                title: "Home",
                headerShadowVisible: false,
                drawerIcon: ()=>(
                    <Ionicons name="person-outline" size={20} color="blue"/>
                )
            }}
            component={AdminDashboard} 
            />
        <Drawer.Screen
            name='Register'
            options={{
                drawerLabel: "Register Member",
                title: "Home",
                headerShadowVisible: false,
                drawerIcon: ()=>(
                    <Ionicons name="person-add-outline" size={20} color="blue"/>
                )
            }}
            component={RegisterScreen} 
            />
            <Drawer.Screen
                name='Help'
                options={{
                drawerLabel: "Help",
                title: "Home",
                headerShadowVisible: false,
                drawerIcon: ()=>(
                    <Ionicons name="help-circle-outline" size={20} color="blue"/>
                )
            }}
            component={AdminDashboard} 
            />
            <Drawer.Screen
                name='Logout'
                options={{
                drawerLabel: "Logout",
                title: "Home",
                headerShadowVisible: false,
                drawerIcon: ()=>(
                    <Ionicons name="log-out-outline" size={20} color="blue"/>
                )
            }}
            component={LoginScreen} 
            />
        
        </Drawer.Navigator>
    );
}


export default DrawerNavigation;