import React, { useEffect, useState } from "react";
import axios from "axios";
import consts from "../const";

function NavBar(props) {
  const [profilePic, setProfilePic] = useState("");

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/user-auth/sign-out`,
        {},
        { withCredentials: true }
      );
      const result = response.data;
      if (result.stat) {
        window.location.href = "/signin-signup";
      } else {
        alert("unable to log out");
      }
    } catch (err) {
      alert("cannot connect to server\nSignup fails");
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
      <div className="md:h-fit max-md:min-w-3/4 flex md:flex-col justify-between md:gap-4 max-md:gap-10 max-sm:gap-3">
        <div className="h-12 w-12 max-sm:w-10 max-sm:h-10 rounded-[50%] overflow-hidden border-solid border-[#5322bc] border-[3px] max-md:mr-1">
          <img
            src={`${consts.domurl}${profilePic}`}
            alt="Profile"
            className="w-fit h-fit"
          />
        </div>
        <ul className="flex gap-5 md:flex-col items-center">
          <li className="flex hover:cursor-pointer">
            <span
              className="material-symbols-outlined sm:text-3xl text-white"
              onClick={() => setMiddleSection("people")}>
              group
            </span>
          </li>
          <li className="flex hover:cursor-pointer">
            <span
              className="material-symbols-outlined sm:text-3xl text-white"
              onClick={() => setMiddleSection("chats")}>
              chat
            </span>
          </li>
          <li className="flex hover:cursor-pointer">
            <span className="material-symbols-outlined sm:text-3xl text-white">
              notifications
            </span>
          </li>
          <li className="flex hover:cursor-pointer">
            <span className="material-symbols-outlined sm:text-4xl text-white">
              settings
            </span>
          </li>
        </ul>
      </div>
      <span
        className="material-symbols-outlined sm:text-4xl text-white cursor-pointer"
        onClick={handleSignOut}>
        logout
      </span>
    </nav>
  );
}

export default NavBar;
