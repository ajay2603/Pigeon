import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import axios from "axios";

import consts from "../../../const.js";

function MessageTextBox(props) {
  const [userName, setUserName] = useState(props.userName);
  const [chatUserName, setChatUserName] = useState(props.chatUserName);
  const [msgVal, setMsgVal] = useState("");

  useEffect(() => {
    setMsgVal("");
    setChatUserName(props.chatUserName);
  }, [props.chatUserName]);

  const sendMessage = async () => {
    let trimmedMsgVal = msgVal.trim();
    if (trimmedMsgVal === "") return;

    const msgId = uuidv4();

    const msg = {
      id: msgId,
      user: userName,
      text: msgVal,
      time: "sending..",
    };

    props.appendTempMessage(msg);

    try {
      const response = await axios.post(
        `${consts.domurl}/api/messages/chats/send-message`,
        {
          toUser: chatUserName,
          message: trimmedMsgVal,
          msgId: msgId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.stat === true) {
        setMsgVal("");
        props.moveToTop(chatUserName);
        props.updateMSGTime({ id: msgId, time: response.data.time });
      }
    } catch (err) {
      console.log(err);
      props.removeUnSendMSG(msgId);
      alert("Error in connecting Server");
    }
  };

  return (
    <div className="w-full h-fit flex items-center gap-6 px-2">
      <div className="bg-[#f1f7fc] h-12 w-full flex justify-center rounded-xl px-4 py-3">
        <input
          type="text"
          placeholder="Type your message here..."
          value={msgVal}
          onChange={(event) => {
            setMsgVal(event.target.value);
          }}
          className="w-full flex bg-transparent outline-none text-lg font-medium"
        />
      </div>
      <div className="flex h-12 w-12 px-2 items-center justify-center bg-[#6e00ff] rounded-xl">
        <button onClick={sendMessage}>
          <span className="material-symbols-outlined bg-transparent text-3xl text-white">
            send
          </span>
        </button>
      </div>
    </div>
  );
}

export default MessageTextBox;
