import React from 'react';
import { WeatherStore, UIStore } from '../stores';

const storesContext = React.createContext({
    UIStore: new UIStore(),
    weatherStore: new WeatherStore()
})

export const useStores = () => React.useContext(storesContext);