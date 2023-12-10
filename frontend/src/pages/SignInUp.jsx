import React, { useState } from "react";

import SignUp from "../components/forms/SignUp";
import SignIn from "../components/forms/SignIn";

import chatSymb from "../assets/chatSymb.png";
import SignUpSymb from "../assets/signupSymb.png";

function SignInUp() {
  const [sIn, setSIn] = useState(true);

  function dispState() {
    setSIn(!sIn);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className={`flex min-w-[675px] w-[750px] m-3 relative h-[570px] overflow-hidden rounded-3xl p-4 shadow-2xl ${
          sIn ? "justify-start" : "justify-end"
        }`}>
        <div
          className={`px-5 justify-center items-center rit-lef ${
            sIn ? "flex" : "hidden"
          }`}>
          <SignIn />
        </div>
        <div
          className={`px-5 justify-center items-center lef-rit ${
            sIn ? "hidden" : "flex"
          }`}>
          <SignUp />
        </div>
        <div
          className={`bg-[#5e3df3] h-full w-[700px] absolute top-0 rounded-[100px] transition-all ease-in-out duration-[1s] ${
            sIn ? "cover-r" : "cover-l"
          }`}>
          <div
            className={`w-fit absolute right-0 h-full flex-col justify-center mx-5 rit-lef ${
              sIn ? "hidden" : "flex"
            }`}>
            <h1 className="logsupTxt text-white text-[35px] font-semibold text-center">
              Already a User
            </h1>
            <img src={chatSymb} className=" h-1/2" />
            <div className="w-full flex justify-center">
              <button
                className="logsupTxt text-lg font-bold w-[150px] border-white border p-2 rounded-lg text-white hover:text-[#5e3df3] hover:bg-white"
                onClick={dispState}>
                Sign In
              </button>
            </div>
          </div>
          <div
            className={`w-fit absolute left-0 h-full flex-col justify-center ml-20 lef-rit ${
              !sIn ? "hidden" : "flex"
            }`}>
            <h1 className="logsupTxt text-white text-[35px] font-semibold text-center">
              New to Pegion
            </h1>
            <img src={SignUpSymb} className=" h-1/2" />
            <div className="w-full flex justify-center">
              <button
                className="logsupTxt text-lg font-bold w-[150px] border-white border p-2 rounded-lg text-white hover:text-[#5e3df3] hover:bg-white"
                onClick={dispState}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInUp;
