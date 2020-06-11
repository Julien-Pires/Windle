import { AppLoading } from 'expo';
import React, { useState } from 'react';

import { Home } from './src/components/pages/home';
import { loadFonts } from './src/utils/fonts';

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
    <Home />
  );
}
