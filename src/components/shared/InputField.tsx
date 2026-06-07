import { Eye, EyeOff, LucideIcon } from 'lucide-react-native';
import React from 'react';
import {
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

type InputFieldProps = TextInputProps & {
  label: string;
  Icon: LucideIcon;
};

const InputField = ({
  label,
  Icon,
  secureTextEntry,
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View>
      <Text className="text-[18px] font-medium text-[#0F0B18] mb-1">
        {label}
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: isFocused ? '#652D8B' : 'transparent',
          backgroundColor: '#F0EAF3',
        }}
        className="flex-row items-center rounded-xl px-4 py-1 mb-4"
      >
        <Icon size={20} color="#4F4F59" />

        <TextInput
          placeholderTextColor="#4F4F59"
          style={{
            flex: 1,
            color: '#0F0B18',
            backgroundColor: 'transparent',
            marginLeft: 8,
          }}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color="#4F4F59" />
            ) : (
              <Eye size={20} color="#4F4F59" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;