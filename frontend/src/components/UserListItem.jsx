import React, { useState } from "react";
import axios from "axios";
import consts from "../const";

function UserListItem(props) {
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

  useState(() => {
    getDetails();
  }, []);

  return (
    <div className="w-full h-fit px-2">
      <div className="h-14 w-full flex items-center px-2 gap-4">
        <img
          src={consts.domurl + userDetails.profilePicPath}
          className=" h-9 rounded-[50%]"
        />
        <div className="flex flex-col w-full">
          <h1 className="font-medium overflow-hidden whitespace-nowrap text-ellipsis">
            {`${userDetails.firstName} ${userDetails.lastName}`}
          </h1>
          <h1 className="text-xs font-medium italic text-slate-700">
            {`${userName}`}
          </h1>
        </div>
        <div className="rounded-[50%] w-8 flex justify-center items-center aspect-square bg-[#f24e1e] font-semibold text-white">
          1
        </div>
      </div>
      <hr className="border-solid border-1 m-2" />
    </div>
  );
}

export default UserListItem;
