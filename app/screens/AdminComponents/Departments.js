import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import COLORS from '../../components/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

const Departments = () => {

    const [departments, setDepartments] = useState([
        {key: '1', name: 'Department of Computer Science'},
        {key: '2', name: 'Department of Information Technology'},
        {key: '3', name: 'Department of Applied Sciences'},
        {key: '4', name: 'Department of Computer Science'},
        {key: '5', name: 'Department of Information Technology'},
        {key: '6', name: 'Department of Applied Sciences'},
        {key: '7', name: 'Department of Computer Science'},
        {key: '8', name: 'Department of Information Technology'},
        {key: '9', name: 'Department of Applied Sciences'},
        {key: '10', name: 'Department of Computer Science'},
        {key: '11', name: 'Department of Information Technology'},
        {key: '12', name: 'Department of Applied Sciences'},
        {key: '13', name: 'Department of Computer Science'},
        {key: '14', name: 'Department of Information Technology'},
        {key: '15', name: 'Department of Applied Sciences'}
    ]);

    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
      };
    
      const handleCancel = () => {
        setVisible(false);
      };

      const handleAdd = () => {
        setVisible(false);
      };


    const renderDepartment = ({item}) => {
        return (
            <View style={styles.innerContainer}>
            <View style={styles.card}>
                <View style={{width: '80%'}}>
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="create-outline" size={28} color="green"/>
                    <Ionicons name="trash-outline" size={28} color="red"/>
                </View>
            </View>
        </View>
        );
    }

    return (
        <View style={styles.container}>

            <FlatList
                numColumns={1}
                keyExtractor={(item)=>item.key}
                data={departments}
                renderItem={renderDepartment}
            />

            <TouchableOpacity style={styles.addButton}
                onPress={showDialog}
                >
                <Ionicons name='add-outline' size={30} color="#fff"/>
            </TouchableOpacity>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Add Department</Dialog.Title>
                <Dialog.Input placeholder='Enter department name'/>
                <Dialog.Button label="CANCEL" onPress={handleCancel} />
                <Dialog.Button label="ADD" onPress={handleAdd} />
            </Dialog.Container>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        margin: 5,
    },
    card: {
        height: 80,
        backgroundColor: '#DCE9ED',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderLeftWidth: 4,
        borderLeftColor: 'blue'
    },
    addButton: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 15,
        right: 15,
        height: 70,
        backgroundColor: COLORS.blue,
        borderRadius: 100,
    }
});

export default Departments;