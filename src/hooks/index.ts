import React from 'react';
import { WeatherStore, UIStore, SystemStore } from '../stores';

const storesContext = React.createContext({
    system: new SystemStore(),
    UIStore: new UIStore(),
    weatherStore: new WeatherStore()
})

export const useStores = () => React.useContext(storesContext);