import React, { useEffect, Suspense } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
// import './App.scss';
import { IndexPage } from './pages/index/IndexPage';

import { initApp } from './initApp';
import { useAppDispatch } from './app/hooks';
function App() {
  useEffect(() => {
    initApp();
  }, [])
  return (
    <IndexPage />
  );
}

export default App;
