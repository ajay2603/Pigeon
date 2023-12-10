import React, { useState } from "react";

import SignUp from "../components/forms/SignUp";
import SignIn from "../components/forms/SignIn";

import chatSymb from "../assets/chatSymb.png"

function SignInUp() {
  const [sIn, setSIn] = useState(false);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className={`flex min-w-[675px] w-[750px] m-3 relative h-[570px] overflow-hidden rounded-3xl p-4 shadow-2xl ${
          sIn ? "justify-start" : "justify-end"
        }`}>
        <div
          className={`px-5 justify-center items-center ${
            sIn ? "flex" : "hidden"
          }`}>
          <SignIn />
        </div>
        <div
          className={`px-5 justify-center items-center ${
            sIn ? "hidden" : "flex"
          }`}>
          <SignUp />
        </div>
        <div
          className={`bg-[#5e3df3] h-full w-[700px] absolute top-0 rounded-[100px] cover-r ${
            sIn ? "cover-r" : "cover-l"
          }`}>
          <div className=" w-fit absolute right-0 h-full flex flex-col justify-center">
            <img src = {chatSymb} className=" h-1/2"/>
            <div className="w-full flex justify-center">
              <button className="logsupTxt text-lg font-bold w-[100px] border-white border p-2 rounded-lg text-white hover:text-[#5e3df3] hover:bg-white">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInUp;
