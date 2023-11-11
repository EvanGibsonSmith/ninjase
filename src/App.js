// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Play from './boundary/routes/Play';
import Make from './boundary/routes/Make';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/play" element={<Play />} />
        <Route path="/make" element={<Make />} />
      </Routes>
    </div>
  );
}

export default App;