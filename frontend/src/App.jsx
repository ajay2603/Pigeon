import React, { useEffect, useState } from "react";
import SignInUp from "./pages/SignInUp";
import Open from "./pages/Open";
import HomePages from "./pages/HomePage";
import Loading from "./pages/Loading";

import { useLocation } from "react-router-dom";

function App() {
  const [Page, setPage] = useState(<Loading />);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    if (page) {
      if (page === "home") {
        setPage(<HomePages />);
      } else if (page === "signin-signup") {
        setPage(<SignInUp />);
      } else {
        setPage(<Open />);
      }
    } else {
      setPage(<Open />);
    }
  }, []);
  return Page;
}

export default App;
