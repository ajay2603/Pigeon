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

function HomePages() {
  const [page, setPage] = useState(<Loading />);
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [peerInstance, setPeerInstance] = useState(null);
  const [peerId, setPeerId] = useState(null);

  const myVideoRef = useRef();
  const remoteVideoRef = useRef();

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
        window.location.href = "/?page=signin-signup";
      }
    } catch (error) {
      console.error("Error occurred during session validation:", error);
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
      console.error("Error connecting to the server:", err);
      alert("Error in connecting to the server");
      return null;
    }
  };

  useEffect(() => {
    validateSession();

    const initializeSocket = async () => {
      const authCookies = await getDetails();
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
