import React, { useEffect, useState } from "react";
import axios from "axios";
import consts from "../const";
import Loading from "./Loading";
import { useCookies } from "react-cookie";

function Open() {
  const [Page, setPage] = useState(<Loading />);
  const [cookies, setCookie] = useCookies(["userName", "logID"]);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await axios.post(
          `${consts.domurl}/api/user-auth/auth-session-login`,
          {
            userName: cookies["userName"],
            logID: cookies["logID"],
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.stat === true) {
          const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

          setCookie("userName", response.data.userName, {
            expires: expirationDate,
          });
          setCookie("logID", response.data.logID, {
            expires: expirationDate,
          });
          window.location.href = "/?page=home";
        } else {
          window.location.href = "/?page=signin-signup";
        }
      } catch (error) {
        window.location.href = "/?page=signin-signup";
      }
    };

    validateSession();
  }, []);

  return Page;
}

export default Open;
