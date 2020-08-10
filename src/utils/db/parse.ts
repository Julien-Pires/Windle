import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';

const init = (): void => {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize(
        '19G1dESZbJwIivEQsDQsy1coCEDeafW3bnLaNvSt',
        'Y7a01LvlSAa55XMTcFH2SBYEkQgY4kHlWlGudd3e'
    );
    Parse.serverURL = 'https://parseapi.back4app.com/';
};

const query = (className: string): Parse.Query => {
    const instance = Parse.Object.extend(className);

    return new Parse.Query(instance);
};

export default {
    initialize: init,
    query: query
};
