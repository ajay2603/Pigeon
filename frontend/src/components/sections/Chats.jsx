import React from "react";
import SearchBar from "../SearchBar";
import UserListItem from "../UserListItem";

function Chats() {
  return (
    <div className="w-1/4 rounded-2xl flex flex-col gap-4">
      <SearchBar />
      <div className="bg-white h-full w-full shadow-md shadow-blue-200 rounded-2xl">
        <h1 className=" text-2xl font-semibold flex w-full h-fit pl-4 pt-3 pb-2">
          Chats
        </h1>
        <div className="overflow-y-auto">
          <UserListItem userName={"ajay"} />
          <UserListItem userName={"anil"} />
          <UserListItem userName={"ajay1"} />
        </div>
      </div>
    </div>
  );
}

export default Chats;
