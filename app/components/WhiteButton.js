import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from './Colors';

const WhiteButton = ({title, onPress=()=>{}}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 18}
                }>
            <Text style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 18}}>{title}</Text>
        </TouchableOpacity>
    );
}

export default WhiteButton;