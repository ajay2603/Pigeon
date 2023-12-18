import React, { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import Chats from "../components/sections/Chats";
import DefChatArea from "../components/sections/DefChatArea";
import ChatArea from "../components/sections/ChatArea";
import consts from "../const";

function Home() {
  const [userName, setUserName] = useState();

  var [chatAreaUser, updateChatAreaUser] = useState();
  const changeChatAreaUsr = (value) => {
    updateChatAreaUser(value);
  };

  const validateSession = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/user-auth/auth-session-login`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.stat === true) {
        setUserName(response.data.userName);
      } else {
        window.location.href = "/signin-signup";
      }
    } catch (error) {
      alert("Error occured");
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <div className="h-full w-full p-2 bg-[#eff6fc] flex max-md:flex-col gap-2">
      <div className="md:h-full md:w-fit max-md:w-full max-md:h-fit">
        <NavBar />
      </div>
      <div className="md:w-full max-md:h-full flex gap-2">
        <Chats setChatAreaUsr={changeChatAreaUsr} />
        <div className="w-3/4 bg-white rounded-3xl">
          {chatAreaUser ? (
            <ChatArea userName={chatAreaUser} />
          ) : (
            <DefChatArea />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
