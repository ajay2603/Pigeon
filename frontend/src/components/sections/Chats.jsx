import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar";
import UserListItem from "../UserListItem";
import consts from "../../const";

function Chats(props) {
  const changeChatArea = (userName) => {
    props.setChatAreaUsr(userName);
  };

  const [chatList, setChatList] = useState([]);
  const [dispList, setDispList] = useState([]);

  const setDisp = () => {
    const lis = chatList.map((userName) => (
      <UserListItem
        key={userName}
        userName={userName}
        onClickGetUsr={changeChatArea}
      />
    ));
    setDispList(lis);
  };

  const getChats = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/fetch/user-details/get-user-chats`,
        {},
        {
          withCredentials: true,
        }
      );

      const result = response.data;
      if (result.stat) {
        setChatList(result.chats);
      } else {
        window.location.href = "/signin-signup";
      }
    } catch (err) {
      alert("Error in connecting server");
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    setDisp();
  }, [chatList]);

  const empty = (
    <h1 className="m-auto mt-6 text-gray-700 text-lg">No recent chats</h1>
  );

  return (
    <div className="w-1/4 rounded-2xl flex flex-col gap-4">
      <SearchBar />
      <div className="flex flex-col bg-white h-full w-full shadow-md shadow-blue-200 rounded-2xl">
        <h1 className="text-2xl font-semibold flex w-full h-fit pl-4 pt-3 pb-2">
          Chats
        </h1>
        <div className="flex flex-col h-full">
          {dispList.length == 0 ? empty : dispList}
        </div>
      </div>
    </div>
  );
}

export default Chats;
