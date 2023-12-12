import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInUp from "./pages/SignInUp";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin-signup" element={<SignInUp />}></Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
