import React, { useEffect, useState } from "react";
import consts from "../../const";
import axios from "axios";

import { useCookies } from "react-cookie";

const Settings = () => {
  const [isPassUpdate, setIsPassUpdate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const [cookies, setCookie] = useCookies(["userName", "logID"]);

  const getUserDetails = () => {
    console.log("hello");
    axios
      .get(
        `${consts.domurl}/api/fetch/user-details?req_details=firstName%lastName&userName=${cookies["userName"]}&logID=${cookies["logID"]}`,
        {
          body: {
            userName: cookies["userName"],
            logID: cookies["logID"],
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        const result = response.data;
        setLastName(result.lastName);
        setFirstName(result.firstName);
      })
      .catch((err) => {
        switch (err.status) {
          case 404:
            alert(err.data.msg);
            break;
          case 500:
            alert(err.data.msg);
            break;
          default:
            alert("Newtork message");
            break;
        }
        console.error(err);
      });
  };

  useEffect(() => {
    setUserName(cookies["userName"]);
    getUserDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full gap-2 m-3 ">
        <h1 className="text-5xl logsupHeading">Settings</h1>
        <img
          src={`${consts.domurl}/profile_pics/def_profile.jpg`}
          className=" rounded-[50%] h-28 border-solid border-4 border-blue-700"
        />
        <div className="relative flex p-1 bg-blue-700 rounded-lg cursor-pointer bottom-16 left-12">
          <span className="text-white material-symbols-outlined">edit</span>
        </div>
        <div className="flex flex-col gap-3 w-80 ">
          <div className="flex flex-col w-full">
            <label className="text-lg font-bold ">User Name</label>
            <input className="h-10 px-4 rounded-full" value={userName}></input>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-lg font-bold ">Name</label>
            <div className="w-full">
              <input
                className="w-full h-10 px-4 pr-10 rounded-full "
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}></input>
              <div className="flex justify-end w-full h-0">
                <span className="relative text-blue-700 cursor-pointer material-symbols-outlined bottom-8 right-3">
                  edit
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-bold ">Last Name</label>
            <div className="w-full">
              <input
                className="w-full h-10 px-4 pr-10 rounded-full "
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}></input>
              <div className="flex justify-end w-full h-0">
                <span className="relative text-blue-700 cursor-pointer material-symbols-outlined bottom-8 right-3">
                  edit
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-lg font-bold ">Password</label>
            <div className="w-full">
              <input
                className="w-full h-10 px-4 pr-10 rounded-full "
                type="password"
                value={"Edit password"}></input>
              <div className="flex justify-end w-full h-0">
                <span
                  className="relative text-blue-700 cursor-pointer material-symbols-outlined bottom-8 right-3"
                  onClick={() => setIsPassUpdate(true)}>
                  edit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute w-screen h-screen bg-[#21316aa2] justify-center items-center flex-col gap-10 top-0 left-0 ${
          isPassUpdate ? "flex" : " hidden"
        }`}>
        <input
          className="h-10 px-4 pr-10 rounded-full shadow-md shadow-black "
          type="password"
          placeholder="Current Password"></input>
        <input
          className="h-10 px-4 pr-10 rounded-full shadow-md shadow-black "
          type="password"
          placeholder="New Password"></input>
        <input
          className="h-10 px-4 pr-10 rounded-full shadow-md shadow-black"
          type="password"
          placeholder="Confirm new Password"></input>
        <button className="px-5 py-3 font-medium text-white bg-blue-600 shadow-md rounded-xl shadow-black">
          Edit Password
        </button>
        <span
          class="material-symbols-outlined text-white absolute right-10 top-7 text-4xl font-semibold cursor-pointer"
          onClick={() => setIsPassUpdate(false)}>
          close
        </span>
      </div>
    </>
  );
};

export default Settings;
