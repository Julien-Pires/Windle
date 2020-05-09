import React from 'react';
import { Text } from 'react-native';
import { headers } from './style';

export enum HeaderSize {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6
}

interface HeaderProps {
    title: string,
    size: HeaderSize
}

const getHeaderStyle = (size: HeaderSize) => {
    switch(size) {
        case HeaderSize.H1:
            return headers.H1;
        
        case HeaderSize.H2:
            return headers.H2;

        case HeaderSize.H3:
            return headers.H3;

        case HeaderSize.H4:
            return headers.H4;

        case HeaderSize.H5:
            return headers.H5;

        case HeaderSize.H6:
            return headers.H6;
    }
}

export const Header = (props: HeaderProps) => {
    const style = getHeaderStyle(props.size);
    return (
        <Text style={style}>{props.title}</Text>
    );
}
