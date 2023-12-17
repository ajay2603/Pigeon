import React, { useEffect } from "react";
import axios from "axios";
import consts from "../const";

function Open() {
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

  return;
}

export default Open;
