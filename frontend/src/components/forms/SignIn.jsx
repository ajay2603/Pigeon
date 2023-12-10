import React, { useState } from "react";

function SignIn() {
  const [values, setValues] = useState({
    uName: "",
    pass: "",
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
      <form className="flex flex-col gap-5 w-full">
        <div>
          <input
            type="text"
            name="uName"
            value={values.uName}
            onChange={upVal}
            className="txt-input logsupTxt"
            placeholder="User Name"
          />
        </div>
        <div>
          <input
            type="password"
            name="pass"
            value={values.pass}
            onChange={upVal}
            className="txt-input logsupTxt"
            placeholder="Password"
          />
        </div>
      </form>
      <button className=" text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white hover:bg-[#563da5]">
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
