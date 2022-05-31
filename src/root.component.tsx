import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from '@/modules/App';

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path='/external-websites/*' element={<App />} />
      </Routes>
    </Router>
  );
}
