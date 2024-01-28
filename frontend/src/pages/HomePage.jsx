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
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState(null);

  const [onCallPage, setOnCallPage] = useState(false);
  const [callUser, setCallUser] = useState();
  const [Call, setCall] = useState();

  const [localStream, setLocalStream] = useState();

  const [cookies, setCookie] = useCookies(["userName", "logID"]);

  const myVideoRef = useRef();
  const remoteVideoRef = useRef();

  const callEndSeq = () => {
    socket.emit("remove-from-calls");
    myVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
    setCallUser("Call Ended");
    setCall(null);
    console.log("in call end seq");
    setTimeout(() => {
      window.location.href = "/?page=home";
    }, 1500);
  };

  const handleEndCall = () => {
    if (Call) {
      Call.close();
    }
    callEndSeq();
  };

  const videoCallPage = (
    <VideoCall
      myVideoRef={myVideoRef}
      remoteVideoRef={remoteVideoRef}
      callUser={callUser}
      endCall={handleEndCall}
      localStream={localStream}
    />
  );

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
          const socketConnection = io(consts.domurl, {
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

  if (peer) {
    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          setLocalStream(stream);
          call.answer(stream, {
            metadata: { socketId: socket.id, userName: userName },
          });
          setCall(call);
          setPage(videoCallPage);
          setOnCallPage(true);

          setTimeout(() => {
            myVideoRef.current.srcObject = stream;
          }, 10);

          call.on("stream", (remoteStream) => {
            setCallUser(call.metadata.userName);
            socket.emit("add-new-call", {
              me: socket.id,
              and: call.metadata.socketId,
            });
            setTimeout(() => {
              remoteVideoRef.current.srcObject = remoteStream;
            }, 10);
          });

          call.on("close", () => {
            callEndSeq();
          });
        });
    });
  }

  const handleAnswerCall = (data) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setPage(videoCallPage);
        setOnCallPage(true);
        setLocalStream(stream);
        const call = peer.call(data.cPid, stream, {
          metadata: {
            socketId: socket.id,
            userName: userName,
          },
        });
        setCall(call);
        setTimeout(() => {
          myVideoRef.current.srcObject = stream;
        }, 10);
        call.on("stream", (remoteStream) => {
          setCallUser(call.metadata.userName);
          socket.emit("add-new-call", {
            me: socket.id,
            and: call.metadata.socketId,
          });
          setTimeout(() => {
            remoteVideoRef.current.srcObject = remoteStream;
          }, 10);
        });
        call.on("close", () => {
          callEndSeq();
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

  //VideoCallRoom

  if (socket) {
    socket.on("end-call-on-close", () => {
      handleEndCall();
    });
  }

  return Page;
}

export default HomePages;
