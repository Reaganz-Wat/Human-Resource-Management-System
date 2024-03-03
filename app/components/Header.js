import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from './Colors';

const Header = ({title, onPress}) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity
                    onPress={()=>navigation.toggleDrawer()}
                    style={styles.iconContainer}
                >
                    <Ionicons name="menu" size={24} color="black" />

                </TouchableOpacity>
                <Text style={{
                    marginLeft: 12,
                    fontSize: 17,
                    fontWeight: "bold"
                }}>
                    {title}
                </Text>
            </View>
            <TouchableOpacity
                    style={styles.iconContainer}
                >
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />

                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        marginHorizontal: 16, 
        backgroundColor: COLORS.white
    },
    iconContainer: {
        height: 45,
        width: 45,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.lightBLUE
    }
})

export default Header;