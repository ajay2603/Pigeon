import React from "react";
import SearchBar from "../SearchBar";
import UserListItem from "../UserListItem";

function Chats(props) {
  const changeChatArea = (userName) => {
    props.setChatAreaUsr(userName);
  };

  return (
    <div className="w-1/4 rounded-2xl flex flex-col gap-4">
      <SearchBar />
      <div className="flex flex-col bg-white h-full w-full shadow-md shadow-blue-200 rounded-2xl">
        <h1 className=" text-2xl font-semibold flex w-full h-fit pl-4 pt-3 pb-2">
          Chats
        </h1>
        <div className="flex flex-col h-full">
          <UserListItem userName={"ajay"} onClickGetUsr={changeChatArea} />
          <UserListItem userName={"anil"} onClickGetUsr={changeChatArea} />
          <UserListItem userName={"ajay1"} onClickGetUsr={changeChatArea} />
        </div>
      </div>
    </div>
  );
}

export default Chats;
