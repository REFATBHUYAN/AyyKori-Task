import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PartitionPage2 from './PartitionPage2';
import HomePage from './HomePage';
import AlphabetGrid from './components/AlphabetGrid';

function App3() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partitioning" element={<PartitionPage2 />} />
        <Route path="/alphabet-tiles" element={<AlphabetGrid />} />
        
      </Routes>
    </Router>
  );
}

export default App3;
