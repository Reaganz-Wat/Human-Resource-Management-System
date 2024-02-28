import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './AdminComponents/Home';
import COLORS from '../components/Colors';
import EmployeeDetails from './AdminComponents/EmployeeDetails';
import Settings from './AdminComponents/Settings';
import Notifications from './AdminComponents/Notifications';


const Tab = createBottomTabNavigator();


// Components name
const homeName = 'Home';
const employeeName = 'EmployeeDetails';
const settingName = 'Settings';
const notification = 'Notifications';

const AdminDashboard = ({navigation}) => {
    return (
        <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={
            ({route})=>(
                {
                    tabBarIcon: ({focused, color, size})=>{
                        let iconName;
                        let rn = route.name;
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === employeeName) {
                            iconName = focused ? 'people' : 'people-outline';
                        } else if (rn === settingName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (rn === notification) {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    }
                }
            )
        }
        >
            <Tab.Screen name={homeName} component={Home}/>
            <Tab.Screen name={employeeName} component={EmployeeDetails}/>
            <Tab.Screen name={settingName} component={Settings}/>
            <Tab.Screen name={notification} component={Notifications}/>
        </Tab.Navigator>
    );
}

export default AdminDashboard;