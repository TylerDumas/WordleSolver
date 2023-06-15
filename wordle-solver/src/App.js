import './App.css';
import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Home from './screens/Home';
import Solver from './screens/Solver';

function App() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solver" element={<Solver />} />
        </Routes>
    );
}

export default App;
