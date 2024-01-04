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
          window.location.href = "/home";
        } else {
          window.location.href = "/signin-signup";
        }
      } catch (error) {
        window.location.href = "/signin-signup";
      }
    };

    validateSession();
  }, []);

  return <Loading />;
}

export default Open;
