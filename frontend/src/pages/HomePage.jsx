import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Peer from "peerjs";

import Loading from "./Loading";
import Home from "../components/Home";
import consts from "../const";
import MakeCall from "../components/calls/MakeCall";
import ReceiveCall from "../components/calls/ReceiveCall";
import CallRoom from "../components/calls/CallRoom";

import { useCookies } from "react-cookie";

function HomePages() {
  const [page, setPage] = useState(<Loading />);
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [peerInstance, setPeerInstance] = useState(null);
  const [peerId, setPeerId] = useState(null);

  const [cookies, setCookie] = useCookies(["userName", "logID"]);

  const myVideoRef = useRef();
  const remoteVideoRef = useRef();

  const validateSession = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/user-auth/auth-session-login`,
        {
          userName: cookies["userName"],
          logID: cookies["logID"],
        },
        { withCredentials: true }
      );
      if (response.data.stat === true) {
        const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

        setCookie("userName", response.data.userName, {
          expires: expirationDate,
        });
        setCookie("logID", response.data.logID, {
          expires: expirationDate,
        });
        setUserName(response.data.userName);
      } else {
        window.location.href = "/?page=signin-signup";
      }
    } catch (error) {
      console.error("Error occurred during session validation:", error);
      alert("Error occurred");
    }
  };

  useEffect(() => {
    validateSession();

    const initializeSocket = async () => {
      const authCookies = {
        userName: cookies["userName"],
        logID: cookies["logID"],
      };
      if (authCookies) {
        const peerInstance = new Peer();

        peerInstance.on("open", (id) => {
          setPeerId(id);

          const socketConnection = io(consts.domurl, {
            query: authCookies,
          });

          setSocket(socketConnection);
        });

        setPeerInstance(peerInstance);
      }
    };

    initializeSocket();
  }, []);

  useEffect(() => {
    if (userName && socket && peerInstance) {
      setPage(
        <Home userName={userName} socket={socket} videoCall={handleVideoCall} />
      );
    }
  }, [userName, socket, peerInstance]);

  const handleCancelCall = () => {
    setPage(
      <Home userName={userName} socket={socket} videoCall={handleVideoCall} />
    );
  };

  //makeCall

  const handleVideoCall = (chatUser) => {
    setPage(
      <MakeCall
        chatUser={chatUser}
        socket={socket}
        peerId={peerId}
        userName={userName}
        cancleCall={handleCancelCall}
      />
    );
  };

  //receiveCalls

  if (socket) {
    socket.on("callRequest", (data) => {
      setPage(
        <ReceiveCall
          userName={userName}
          socket={socket}
          chatUser={data.userName}
          cSid={data.socketId}
          cPid={data.peerId}
          cancleCall={handleCancelCall}
        />
      );
    });
  }

  return page;
}

export default HomePages;
