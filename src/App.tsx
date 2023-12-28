import React, { useEffect } from 'react';
import { IndexPage } from './pages/index/IndexPage';

import { initApp } from './initApp';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  useEffect(() => {
    initApp();
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/:lang/" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}

export default App;
