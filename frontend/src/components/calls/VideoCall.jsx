import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { io } from "socket.io-client";

function VideoCall(props) {
  const [userName, setUserName] = useState(props.userName);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [isDisp, setIsDisp] = useState(true);
  const [socket, setSocket] = useState(props.socket);
  const [callUser, setCallUser] = useState(props.callUser);
  const [dispBar, setDispBar] = useState("");
  const [peer, setPeer] = useState(props.peer);
  const [peerId, setPeerId] = useState(props.peerId);
  const [calling, setCalling] = useState(props.calling);
  const [Call, setCall] = useState();
  const [callUserSid, setCallUserSid] = useState(props.socketID);
  const [callUserPid, setCallUserPid] = useState();
  const [callStarted, setCallStarted] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const endSequence = (disp) => {
    setDispBar(disp);
    setIsDisp(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const handelVidoOnOff = () => {
    setVideoOn(!videoOn);
  };

  const handelMicOnOff = () => {
    setMicOn(!micOn);
  };

  const handleDisp = () => {
    setIsDisp(!isDisp);
  };

  const handleEndCall = () => {
    if (Call) {
      Call.close();
      socket.emit("remove-from-calls");
      endSequence("Call Ended");
    }
  };

  const declineCall = () => {
    socket.emit("declineCall", { userName: userName, cSid: callUserSid });
    window.location.href = "/";
  };

  const initCall = (cid) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        const call = peer.call(cid, stream, {
          metadata: {
            socketId: socket.id,
            peerId: peerId,
          },
        });
        setCall(call);
        call.on("stream", (remoteStream) => {
          setDispBar(callUser);
          setCallStarted(true);
          socket.emit("add-new-call", {
            me: socket.id,
            and: call.metadata.socketId,
          });
          setCallStarted(true);
          setCallUserPid(call.metadata.peerId);
          setCallUserSid(call.metadata.socketId);
          remoteVideoRef.current.srcObject = remoteStream;
        });
        call.on("close", () => {
          socket.emit("remove-from-calls");
          endSequence("Call Ended");
        });
      });

    setCalling(false);
  };

  const cancleCall = () => {
    socket.emit("cancleCall", callUser);
    socket.emit("remove-from-calls");
    endSequence("Call Cancled");
  };

  const answerCall = () => {
    socket.emit("answerCall", userName);
    initCall(props.callingId);
  };

  useEffect(() => {
    if (!props.callingId) {
      setDispBar("Connecting...");
      socket.emit("startVideoCall", {
        userName: userName,
        chatUser: callUser,
        socketID: socket.id,
        peerId: peerId,
      });
    } else {
      setDispBar(`Call from ${callUser}`);
    }
  }, []);

  peer.on("call", async (call) => {
    setCall(call);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;
    call.answer(stream, {
      metadata: {
        socketId: socket.id,
        peerId: peerId,
      },
    });
    call.on("stream", (remoteStream) => {
      setDispBar(callUser);
      setCallStarted(true);
      socket.emit("add-new-call", {
        me: socket.id,
        and: call.metadata.socketId,
      });
      setCallStarted(true);
      setCallUserPid(call.metadata.peerId);
      setCallUserSid(call.metadata.socketId);
      remoteVideoRef.current.srcObject = remoteStream;
    });
    call.on("close", () => {
      socket.emit("remove-from-calls");
      endSequence("Call Ended");
    });
  });

  socket.on("end-call-on-close", () => {
    socket.emit("remove-from-calls");
    endSequence("Call Ended");
  });

  socket.on("callStat", (data) => {
    if (data.onCall) setDispBar(data.stat);
    else endSequence(data.stat);
  });

  socket.on("callDeclined", (data) => {
    if (data.same) endSequence("Call declined");
    else window.location.href = "/";
  });

  socket.on("callCancled", () => {
    window.location.href = "/";
  });

  return (
    <div className="flex justify-center w-screen h-screen">
      <div
        className={`text-white absolute flex justify-center items-center h-[10vh] w-full custom-gradient-bottom ${
          !isDisp ? " hidden" : " animate-to-vis"
        } `}>
        <label className="text-2xl logsupTxt">{dispBar}</label>
      </div>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="flex items-center justify-center w-full h-full bg-gray-900"
        onClick={handleDisp}></video>
      <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className={`absolute top-[10vh] right-4 aspect-video md:h-24 h-20 bg-gray-800 border-solid border-[1px] border-slate-600 `}></video>
      </Draggable>
      {calling ? (
        <div className="flex gap-20 absolute bottom-[0vh] h-[15vh] justify-center">
          <div
            className=" bg-green-500 h-16 w-16 flex justify-center items-center rounded-[50%] cursor-pointer"
            onClick={answerCall}>
            <span className="text-3xl font-medium text-white material-symbols-outlined">
              call
            </span>
          </div>
          <div
            className=" bg-red-500 h-16 w-16 flex justify-center items-center rounded-[50%] cursor-pointer"
            onClick={declineCall}>
            <span className="text-3xl font-medium text-white material-symbols-outlined">
              phone_disabled
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`text-white absolute bottom-[0vh] flex justify-center h-[15vh] w-full gap-6 custom-gradient-top items-center ${
            !isDisp ? " hidden" : " animate-to-vis"
          } `}>
          <div
            className={`${
              videoOn ? "bg-gray-600" : " bg-white "
            }  h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer`}
            onClick={handelVidoOnOff}>
            <span
              className={`material-symbols-outlined text-3xl font-medium ${
                videoOn ? "text-white" : "text-black"
              }`}>
              videocam_off
            </span>
          </div>
          <div
            className=" bg-red-500 h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer "
            onClick={callStarted ? handleEndCall : cancleCall}>
            <span className="text-3xl font-medium text-white material-symbols-outlined">
              phone_disabled
            </span>
          </div>
          <div
            className={`${
              micOn ? "bg-gray-600" : " bg-white "
            }  h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer`}
            onClick={handelMicOnOff}>
            <span
              className={`material-symbols-outlined text-3xl font-medium ${
                micOn ? "text-white" : "text-black"
              }`}>
              mic_off
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
