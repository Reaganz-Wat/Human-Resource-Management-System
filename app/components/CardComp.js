import React from 'react';
import { StyleSheet, View } from 'react-native';

function CardComp({children}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#00BFFF',
        borderWidth: 1,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        marginHorizontal: 15,
        padding: 5,
        borderRadius: 7
    }
});

export default CardComp;