import React, { useState } from "react";
import SignUp from "../components/forms/SignUp";
import SignIn from "../components/forms/SignIn";

function SignInUp() {
  const [sIn, setSIn] = useState(true);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className={`flex min-w-[675px] relative h-[570px] overflow-hidden rounded-3xl p-2 shadow-2xl ${
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
          className={`bg-[#5e3df3] h-full w-[700px] absolute top-0 rounded-3xl cover-r ${
            sIn ? "cover-r" : "cover-l"
          }`}></div>
      </div>
    </div>
  );
}

export default SignInUp;
