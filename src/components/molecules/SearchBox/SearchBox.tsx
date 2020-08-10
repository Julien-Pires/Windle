import React, { useState } from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Input } from '../../atoms';

export interface SearchBoxStyle {
    searchBox: StyleProp<ViewStyle>,
    searchInput: StyleProp<TextStyle>
}

export interface SearchBoxProps<T> {
    getData: (input: string) => Promise<T[]> | T[],
    children?: React.ReactNode,
    throttle?: number,
    style?: SearchBoxStyle
}

export const SearchBox = function<T>({
    children,
    throttle,
    style,
    getData
}: SearchBoxProps<T>) : JSX.Element {
    const [ data, setData ] = useState(new Array<T>());
    const [ currentText, setCurrentText] = useState('');
    const changeStream = new Subject<string>();
    changeStream.pipe(debounceTime(throttle ?? 0)).subscribe(async (text) => {
        const data = await getData(text);
        setData(data);
        setCurrentText(text);
    });

    const clonedChildren = React.isValidElement(children) ? 
        React.cloneElement(children, { data: data, input: currentText }) 
        : undefined;

    return (
        <View style={style?.searchBox}>
            <Input style={style?.searchInput} onChangeText={text => changeStream.next(text)} />
            {clonedChildren}
        </View>
    );
};
