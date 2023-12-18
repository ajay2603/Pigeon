import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInUp from "./pages/SignInUp";
import Home from "./pages/Home";
import Open from "./pages/Open";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin-signup" element={<SignInUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Open />} />
      </Routes>
    </Router>
  );
}

export default App;
