import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


type ButtonProps = {
    handlePress: () => void;
    text: string;
}

const Button = ({ handlePress, text }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            className="bg-[#652D8B] py-4 rounded-full items-center mb-4"
        >
            <Text className="text-white font-bold text-base">{text}</Text>
        </TouchableOpacity>
    )
}

export default Button