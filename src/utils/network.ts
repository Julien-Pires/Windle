import axios from 'axios';

import { Result, ResultKind } from './types';

export const query = async (url: string, query: Record<string, unknown>): Promise<Result<unknown, string>> => {
    try {
        const response = await axios.get(url, { params: query });

        return {
            kind: ResultKind.Success,
            data: response.data
        };
    } catch(exception) {
        return {
            kind: ResultKind.Failure,
            error: exception
        };
    }
};
