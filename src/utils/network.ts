import axios from 'axios';
import { ResultKind, Result } from './types';

export const query = async (url: string, query: object): Promise<Result<any, string>> => {
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
}