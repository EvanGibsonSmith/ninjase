// App.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Play from './boundary/routes/Play';
import Make from './boundary/routes/Make';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/play" />} />
        <Route path="/play" element={<Play />} />
        <Route path="/make" element={<Make />} />
      </Routes>
    </div>
  );
}

export default App;