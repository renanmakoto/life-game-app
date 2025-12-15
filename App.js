import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/navigation/Routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgba(21, 21, 21, 0.98)" />
      <Routes />
    </>
  );
}
