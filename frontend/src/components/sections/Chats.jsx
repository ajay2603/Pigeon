// Chats.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar";
import UserListItem from "../UserListItem";
import consts from "../../const";
import { useCookies } from "react-cookie";

function Chats(props) {
  const me = props.userName;

  const [chatList, setChatList] = useState([]);

  const [chatUser, setChatUser] = useState(props.chatUser);

  const [dispChats, setDispChats] = useState(props.dispChats);

  const [cookies, setCookie] = useCookies(["userName", "logID"]);

  useEffect(() => {
    setDispChats(props.dispChats);
  }, [props.dispChats]);

  const handleChatAreaUser = (chatAreaUser) => {
    props.setChatAreaUsr(chatAreaUser);
  };

  const getChats = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/fetch/user-details/get-user-chats`,
        {
          userName: cookies["userName"],
          logID: cookies["logID"],
        },
        {
          withCredentials: true,
        }
      );

      const result = response.data;
      const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      if (result.stat) {
        setCookie("userName", response.data.userName, {
          expires: expirationDate,
        });
        setCookie("logID", response.data.logID, {
          expires: expirationDate,
        });
        setChatList(result.chats);
      }
    } catch (err) {
      console.log(err);
      alert("Error in connecting server");
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    movetoTop(props.moveUserTop);
  }, [props.moveUserTop]);

  const movetoTop = (userName) => {
    setChatList((prevChatList) => {
      const updatedChatList = [
        userName,
        ...prevChatList.filter((name) => name !== userName),
      ];
      return updatedChatList;
    });
  };

  const onReorder = (fromIndex, toIndex) => {
    const updatedChatList = [...chatList];
    const movedItem = updatedChatList.splice(fromIndex, 1)[0];
    updatedChatList.splice(toIndex, 0, movedItem);
    setChatList(updatedChatList);
  };

  const [socket, setSocket] = useState(null);

  if (socket) {
    socket.on("newLiveChat", (user) => {
      if (!chatList.includes(user)) {
        setChatList([user, ...chatList]);
      }
    });
  }

  useEffect(() => {
    setSocket(props.socket);
  }, [props.socket]);

  useEffect(() => {
    setChatUser(props.chatUser);
  }, [props.chatUser]);

  const empty = (
    <h1 className="m-auto mt-6 text-lg text-gray-700">No recent chats</h1>
  );

  return (
    <div
      className={`w-1/4 max-md:w-full rounded-2xl flex flex-col gap-4 max-md:${
        dispChats ? "flex" : "hidden"
      }`}>
      <SearchBar />
      <div className="flex flex-col w-full h-full bg-white shadow-md shadow-blue-200 rounded-2xl">
        <h1 className="flex w-full pt-3 pb-2 pl-4 text-2xl font-semibold h-fit">
          Chats
        </h1>
        <hr className=" border-solid border-gray-500 mx-3 my-2 border-[1.5px]" />
        <div className="flex flex-col h-full">
          {chatList.map((userName, index) => (
            <div key={userName + index}>
              <UserListItem
                key={userName}
                userName={userName}
                onClickGetUsr={() => handleChatAreaUser(userName)}
                onReorder={(dragIndex, hoverIndex) =>
                  onReorder(dragIndex, hoverIndex)
                }
                index={index}
                chatUser={chatUser}
                me={me}
              />
              <hr className="mx-3 border-solid " />
            </div>
          ))}
          {chatList.length === 0 && empty}
        </div>
      </div>
    </div>
  );
}

export default Chats;
