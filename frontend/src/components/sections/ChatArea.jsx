import React, { useEffect, useState } from "react";
import axios from "axios";

import consts from "../../const";

import MessageTextBox from "./chat_area/MessageTextBox";
import MessageLeft from "./chat_area/MessageLeft";
import MessageRight from "./chat_area/MessageRight";

function ChatArea(props) {
  const userName = props.userName;
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    profilePicPath: "",
  });

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${consts.domurl}/api/fetch/user-details/chat-list-info?userName=${userName}`
      );
      setUserDetails(response.data);
    } catch (err) {
      alert("Error occurred");
    }
  };

  useEffect(() => {
    getDetails();
  }, [props.userName]);

  return (
    <div className="h-full w-full px-2 py-4 pt-1 flex flex-col">
      <div className="flex w-full h-fit px-7 py-4 items-center gap-6">
        <img
          src={`${consts.domurl}${userDetails.profilePicPath}`}
          className="rounded-[50%] h-12 "
        />
        <div className="flex w-full h-fit flex-col">
          <div className="flex w-fit h-fit gap-3 items-center">
            <span className=" text-xl font-semibold w-fit">
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </span>
            <span className=" italic font-medium text-sm w-fit">
              ({`${userName}`})
            </span>
          </div>
          <span className=" text-xs text-gray-500">Online</span>
        </div>
        <div className="flex w-fit h-fit justify-end text-[#9747ff] gap-6">
          <span className="material-symbols-outlined ">call</span>
          <span className="material-symbols-outlined ">videocam</span>
          <span className="material-symbols-outlined ">more_vert</span>
        </div>
      </div>
      <hr className=" border-solid mx-3" />
      <div className="flex flex-col h-full p-3">
        <MessageLeft />
        <MessageRight />
      </div>
      <div className="flex h-fit w-full">
        <MessageTextBox />
      </div>
    </div>
  );
}

export default ChatArea;