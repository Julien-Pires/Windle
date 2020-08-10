import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Input } from '../../atoms';

export interface SearchBoxProps<T> {
    children?: React.ReactNode,
    getData: (input: string) => Promise<T[]> | T[],
    throttle?: number
}

export const SearchBox = function<T>({
    children,
    throttle,
    getData
}: SearchBoxProps<T>) : JSX.Element {
    const [ data, setData ] = useState(new Array<T>());
    const changeStream = new Subject<string>();
    changeStream.pipe(debounceTime(throttle ?? 0)).subscribe(async (text) => {
        const data = await getData(text);
        setData(data);
    });

    const clonedChildren = React.isValidElement(children) ? 
        React.cloneElement(children, { data: data }) 
        : undefined;

    return (
        <View>
            <Input style={stylesheet.input} onChangeText={text => changeStream.next(text)} />
            {clonedChildren}
        </View>
    );
};

const stylesheet = StyleSheet.create({
    input: {
        alignSelf: 'center',
        width: '78%',
        marginTop: 24
    }
});
