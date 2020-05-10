import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { loadFonts } from './src/utils/fonts';
import { Home } from './src/components/pages/home';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if(!dataLoaded) {
    return (
      <AppLoading
        startAsync={async() => {
          await loadFonts();
        }}
        onFinish={() => setDataLoaded(true)}>
      </AppLoading>
    );
  }

  return (
    <Home></Home>
  );
}
