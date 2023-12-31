import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import NavBar from "../components/NavBar";
import Chats from "../components/sections/Chats";
import DefChatArea from "../components/sections/DefChatArea";
import ChatArea from "../components/sections/ChatArea";
import consts from "../const";
import People from "../components/sections/People";

function Home() {
  const [userName, setUserName] = useState();
  const [chatAreaUser, setChatAreaUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [middleSection, setMiddleSection] = useState("chats");

  const changeChatAreaUser = (value) => {
    setChatAreaUser(value);
  };

  const [moveUserTop, setMoveUserTop] = useState("");

  const handleMoveToTop = (moveUser) => {
    setMoveUserTop(moveUser);
  };

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

  const selectMiddleSec = (option) => {
    setMiddleSection(option);
  };

  return (
    <div className="h-full w-full p-2 bg-[#eff6fc] flex max-md:flex-col gap-2">
      <div className="md:h-full md:w-fit max-md:w-full max-md:h-fit">
        <NavBar onSelectMiddleSec={selectMiddleSec} userName={userName} />
      </div>
      <div className="md:w-full max-md:h-full flex gap-2">
        {middleSection === "chats" ? (
          <Chats
            setChatAreaUsr={changeChatAreaUser}
            userName={userName}
            socket={socket}
            moveUserTop={moveUserTop}
          />
        ) : (
          <People setChatAreaUsr={changeChatAreaUser} />
        )}
        <div className="w-3/4 bg-white rounded-3xl">
          {chatAreaUser ? (
            <ChatArea
              chatUserName={chatAreaUser}
              userName={userName}
              socket={socket}
              moveToTop={handleMoveToTop}
            />
          ) : (
            <DefChatArea />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
