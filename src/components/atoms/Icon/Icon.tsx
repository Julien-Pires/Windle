import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps, TouchableOpacityProps {
    icon: React.FC<SvgProps>
}

export const Icon = (props: IconProps) : JSX.Element => {
    const { icon: SvgIcon, onPress } = props;

    if(onPress) {
        return (
            <TouchableOpacity onPress={onPress}>
                <SvgIcon {...props} />
            </TouchableOpacity>
        );
    }

    return (
        <SvgIcon {...props} />
    );
};
