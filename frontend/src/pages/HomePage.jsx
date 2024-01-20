import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Peer from "peerjs";

import Loading from "./Loading";
import Home from "../components/Home";
import consts from "../const";
import MakeCall from "../components/calls/MakeCall";
import ReceiveCall from "../components/calls/ReceiveCall";
import VideoCall from "../components/calls/VideoCall";

import { useCookies } from "react-cookie";

function HomePages() {
  const [Page, setPage] = useState(<Loading />);
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [peer, setpeer] = useState(null);
  const [peerId, setPeerId] = useState(null);

  const [onCallPage, setOnCallPage] = useState(false);
  const [callUser, setCallUser] = useState();
  const [Call, setCall] = useState();

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
        const peer = new Peer();

        peer.on("open", (id) => {
          setPeerId(id);

          console.log("my-peerID");
          console.log(id);

          const socketConnection = io(consts.domurl, {
            query: authCookies,
          });

          setSocket(socketConnection);
        });

        setpeer(peer);
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

  const handleCancelCall = () => {
    setPage(
      <Home userName={userName} socket={socket} videoCall={handleVideoCall} />
    );
  };

  //makeCall

  const handleVideoCall = (chatUser) => {
    setCallUser(chatUser);
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

  if (peer) {
    peer.on("call", async (call) => {
      console.log("called");
      try {
        console.log("in try before stream");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("in try after stream");
        call.answer(stream);
        setCall(call);
        setOnCallPage(true);
        console.log("after call page");

        // Set the stream to the video elements after a delay using setTimeout
        setTimeout(() => {
          myVideoRef.current.srcObject = stream;
        }, 1000);

        call.on("stream", (remoteStream) => {
          console.log("In remote stream");
          // Set the remote stream to the remote video element after a delay
          setTimeout(() => {
            remoteVideoRef.current.srcObject = remoteStream;
          }, 1000);
        });
      } catch (error) {
        console.error("Error accessing media devices:", error);
        // Handle errors or display a user-friendly message
      }
    });
  }

  const handleAnswerCall = (data) => {
    setCallUser(data.chatUser);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setOnCallPage(true);
        console.log("chat- user");
        console.log(data.cPid);
        const call = peer.call(data.cPid, stream);
        setCall(call);
        setTimeout(() => {
          myVideoRef.current.srcObject = stream;
        }, 1000);
        call.on("stream", (remoteStream) => {
          setTimeout(() => {
            remoteVideoRef.current.srcObject = remoteStream;
          }, 1000);
        });
      });
  };

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
          answerCall={handleAnswerCall}
        />
      );
    });
  }

  return !onCallPage ? (
    Page
  ) : (
    <VideoCall
      myVideoRef={myVideoRef}
      remoteVideoRef={remoteVideoRef}
      callUser={callUser}
    />
  );
}

export default HomePages;
