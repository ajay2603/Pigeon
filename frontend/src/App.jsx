import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInUp from "./pages/SignInUp";
import Home from "./pages/Home";
import Open from "./pages/Open";

import MakeCall from "./pages/MakeCall";
import ReceiveCall from "./pages/ReceiveCall";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin-signup" element={<SignInUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" index element={<Open />} />
        <Route path="/make-call" element={<MakeCall />} />
        <Route path="/receive-call" element={<ReceiveCall />} />
      </Routes>
    </Router>
  );
}

export default App;
