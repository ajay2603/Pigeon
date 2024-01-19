import React, { useEffect, useState } from "react";
import axios from "axios";
import consts from "../const";
import Home from "../components/Home";
import Loading from "./Loading";

function Open() {
  const [Page, setPage] = useState(<Loading />);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await axios.post(
          `${consts.domurl}/api/user-auth/auth-session-login`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.stat === true) {
          window.location.href = "/?page=home";
        } else {
          window.location.href = "/?page=signin-signup";
        }
      } catch (error) {
        window.location.href = "/?page=signin-signup";
      }
    };

    const cookieValue = "this is the cookie value";
    const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    document.cookie = `myCookie=${cookieValue}; expires=${expirationDate.toUTCString()}`;
    alert("seted Cookie");

    validateSession();
  }, []);

  return Page;
}

export default Open;
