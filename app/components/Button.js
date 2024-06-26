import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from './Colors';

const Button = ({title, onPress=()=>{}}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: COLORS.blue,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginVertical: 18}
                }>
            <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;