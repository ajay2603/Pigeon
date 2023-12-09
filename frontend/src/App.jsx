import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInUp from "./pages/SignInUp";

function App() {
  return (
    <Router>
        <Routes>
            <Route path = "/signin-signup" element = {<SignInUp />}></Route>
        </Routes>
    </Router>
  )
}

export default App;
