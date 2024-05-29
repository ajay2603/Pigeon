import React, { useEffect, useState } from "react";
import axios from "axios";
import consts from "../const";

import { useCookies } from "react-cookie";

function NavBar(props) {
  const [profilePic, setProfilePic] = useState("");
  const [cookies, setCookie] = useCookies(["userName", "logID"]);

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/user-auth/sign-out`,
        {
          userName: cookies["userName"],
          logID: cookies["logID"],
        },
        { withCredentials: true }
      );
      const result = response.data;
      setCookie("userName", null);
      setCookie("logID", null);
      if (result.stat) {
        window.location.href = "/?page=signin-signup";
      } else {
        console.log("unable to log out in server side ");
        window.location.href = "/?page=signin-signup";
      }
    } catch (err) {
      console.log("cannot connect to server\nSignup fails in server side");
    }
  };

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${consts.domurl}/api/fetch/user-details/chat-list-info?userName=${props.userName}`
      );
      if (response.status === 200) {
        if (response.data.profilePicPath) {
          setProfilePic(response.data.profilePicPath);
        }
      }
    } catch (err) {
      console.log(err);
      alert("Error in Connecting Server");
    }
  };

  useEffect(() => {
    getDetails();
  }, [props.userName]);

  const setMiddleSection = (option) => {
    props.onSelectMiddleSec(option);
  };

  return (
    <nav className="flex md:h-full md:w-fit max-md:h-fit max-md:w-full flex-col max-md:flex-row justify-between items-center md:p-3 md:py-10 max-md:p-3 sm:px-[10%] bg-[#6e00ff] rounded-2xl">
      <div className="flex justify-between md:h-fit max-md:min-w-3/4 md:flex-col md:gap-4 max-md:gap-10 max-sm:gap-3">
        <div className="h-12 w-12 max-sm:w-10 max-sm:h-10 rounded-[50%] overflow-hidden border-solid border-[#5322bc] border-[3px] max-md:mr-1">
          <img
            src={`${consts.domurl}${profilePic}`}
            alt="Profile"
            className="w-fit h-fit"
          />
        </div>
        <ul className="flex items-center gap-5 md:flex-col">
          <li className="flex hover:cursor-pointer">
            <span
              className="text-white material-symbols-outlined sm:text-3xl"
              onClick={() => setMiddleSection("people")}>
              group
            </span>
          </li>
          <li className="flex hover:cursor-pointer">
            <span
              className="text-white material-symbols-outlined sm:text-3xl"
              onClick={() => setMiddleSection("chats")}>
              chat
            </span>
          </li>
          <li className="flex hover:cursor-pointer">
            <span
              className="text-white material-symbols-outlined sm:text-3xl"
              onClick={() => setMiddleSection("notifications")}>
              notifications
            </span>
          </li>
          <li className="flex hover:cursor-pointer">
            <span
              className="text-white material-symbols-outlined sm:text-3xl"
              onClick={() => setMiddleSection("settings")}>
              settings
            </span>
          </li>
        </ul>
      </div>
      <span
        className="text-white cursor-pointer material-symbols-outlined sm:text-4xl"
        onClick={handleSignOut}>
        logout
      </span>
    </nav>
  );
}

export default NavBar;
