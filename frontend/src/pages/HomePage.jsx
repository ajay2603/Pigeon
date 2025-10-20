import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Peer from "peerjs";

import Loading from "./Loading";
import Home from "../components/Home";
import consts from "../const";

import VideoCall from "../components/calls/VideoCall";

import { useCookies } from "react-cookie";

function HomePages() {
  const [Page, setPage] = useState(<Loading />);
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState();

  const [cookies, setCookie] = useCookies(["userName", "logID"]);

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

  const handleEndCall = () => {
    setPage(
      <Home
        userName={userName}
        socket={getSocket()}
        videoCall={handleVideoCall}
      />
    );
  };

  const handleVideoCall = (callUser) => {
    setPage(
      <VideoCall
        callUser={callUser}
        endCall={handleEndCall}
        peer={peer}
        socket={socket}
        userName={userName}
        peerId={peerId}
        calling={false}
      />
    );
  };

  useEffect(() => {
    validateSession();

    const initializeSocket = async () => {
      const authCookies = {
        userName: cookies["userName"],
        logID: cookies["logID"],
      };
      if (authCookies) {
        const peer = new Peer();

        peer.on("open", (id) => {
          setPeerId(id);
          console.log(id);
          const socketConnection = io("/", {
            transports: ["websocket"],
            query: authCookies,
          });

          socketConnection.on("connect", () => {
            setSocket(socketConnection);
            setPeer(peer);
          });
        });
      }
    };

    initializeSocket();
  }, []);

  useEffect(() => {
    if (userName && socket && peer) {
      setPage(
        <Home userName={userName} socket={socket} videoCall={handleVideoCall} />
      );
    }
  }, [userName, socket, peer]);

  if (socket) {
    socket.on("callRequest", (details) => {
      console.log("call Req");
      setPage(
        <VideoCall
          socketID={details.socketID}
          callUser={details.userName}
          endCall={handleEndCall}
          socket={socket}
          peer={peer}
          userName={userName}
          peerId={peerId}
          callingId={details.peerId}
          calling={true}
        />
      );
    });
  }

  return Page;
}

export default HomePages;
