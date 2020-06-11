import React from 'react';

import { DataStore } from './data';
import { UIStore } from './UI';

const dataStore = new DataStore();
const uiStore = new UIStore(dataStore);
const storesContext = React.createContext({
    dataStore: dataStore,
    UIStore: uiStore,
});

export const useStores = () => React.useContext(storesContext);
export * from './dataStores';