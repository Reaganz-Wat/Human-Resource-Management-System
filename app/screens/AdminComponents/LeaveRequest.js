import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Requests from './Requests';
import Leaves from './Leaves';

const Tab = createMaterialTopTabNavigator();

const LeaveRequest = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Requests' component={Requests} />
            <Tab.Screen name='Leaves' component={Leaves} />
        </Tab.Navigator>
    );
}

export default LeaveRequest;