import React, { useEffect, useState } from "react";

import axios from "axios";
import io from "socket.io-client";

import Loading from "./Loading";
import Home from "../components/Home";
import consts from "../const";

function HomePages() {
  const [Page, setPage] = useState(<Loading />);
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState();

  const validateSession = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/user-auth/auth-session-login`,
        {},
        { withCredentials: true }
      );
      if (response.data.stat === true) {
        setUserName(response.data.userName);
      } else {
        window.location.href = "/signin-signup";
      }
    } catch (error) {
      alert("Error occurred");
    }
  };

  const getDetails = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/fetch/user-details/get-user-log-details`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      alert("Error in connecting to the server");
      return null;
    }
  };

  useEffect(() => {
    validateSession();
    const initializeSocket = async () => {
      const authCookies = await getDetails();
      const socketConnection = io(consts.domurl, { query: authCookies });
      setSocket(socketConnection);
    };
    initializeSocket();
  }, []);

  useEffect(() => {
    if (userName && socket) {
      setPage(<Home userName={userName} socket={socket} />);
    }
  }, [userName, socket]);
  return Page;
}

export default HomePages;
