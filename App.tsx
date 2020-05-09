import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { loadFonts } from './src/utils/fonts';
import Home from './src/screens/home/home';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if(!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setDataLoaded(true)}>
      </AppLoading>
    );
  }

  return (
    <Home></Home>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
