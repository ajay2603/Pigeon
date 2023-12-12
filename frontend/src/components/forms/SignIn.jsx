import React, { useState } from "react";
import axios from "axios";

import consts from "../../const";

function SignIn() {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const upVal = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-10">
      <div className="w-fit">
        <h1 className="logsupTxt logsupHeading text-center">Sign In</h1>
      </div>
      <form className="flex flex-col gap-5 w-full" onSubmit={handleSignIn}>
        <div>
          <input
            type="text"
            name="userName"
            value={values.uName}
            onChange={upVal}
            className="txt-input logsupTxt"
            placeholder="User Name"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={values.pass}
            onChange={upVal}
            className="txt-input logsupTxt"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className=" text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white hover:bg-[#563da5] transition-all duration-[0.2s] hover:-translate-y-1"
            type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
