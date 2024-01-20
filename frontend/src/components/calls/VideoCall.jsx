import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
function VideoCall(props) {
  const [chatUser, setChatUser] = useState(props.chatUser);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [isDisp, setIsDisp] = useState(true);

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
    console.log("In videoCall");
    props.endCall();
  };

  return (
    <div className="flex justify-center">
      <div
        className={`text-white absolute flex justify-center items-center h-[10vh] w-full custom-gradient-bottom ${
          !isDisp ? " hidden" : " animate-to-vis"
        } `}>
        <label className="text-2xl logsupTxt">{chatUser}</label>
      </div>
      <video
        ref={props.remoteVideoRef}
        autoPlay
        playsInline
        className=" flex h-screen w-screen bg-blue-500"
        onClick={handleDisp}></video>
      <Draggable>
        <video
          ref={props.myVideoRef}
          autoPlay
          playsInline
          muted
          className={`absolute top-[10vh] right-4 aspect-video md:h-24 h-20 bg-green-500 `}></video>
      </Draggable>
      <div
        className={`text-white absolute bottom-0 flex justify-center h-[15vh] w-full gap-6 custom-gradient-top items-center ${
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
          onClick={handleEndCall}>
          <span className="material-symbols-outlined text-3xl font-medium text-white">
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
    </div>
  );
}

export default VideoCall;
