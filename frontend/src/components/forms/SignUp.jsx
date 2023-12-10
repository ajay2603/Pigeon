import React, { useState } from "react";

function SignUp(props) {
  const [values, setValues] = useState({
    fName: "",
    lName: "",
    uName: "",
    pass: "",
    cnfPass: "",
  });

  const upVal = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="flex-col justify-center items-center w-full gap-5 flex">
      <div className="w-fit">
        <h1 className="logsupTxt logsupHeading text-center">Sign Up</h1>
      </div>
      <form className="flex flex-col gap-3 w-full">
        <input
          type="text"
          name="fName"
          value={values.fName}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="First Name"
        />
        <input
          type="text"
          name="lName"
          value={values.lName}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="Last Name"
        />
        <input
          type="text"
          name="uName"
          value={values.uName}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="User Name"
        />
        <input
          type="password"
          name="pass"
          value={values.pass}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="Password"
        />
        <input
          type="password"
          name="cnfPass"
          value={values.cnfPass}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="Confirm Password"
        />
      </form>
      <button className="text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white hover:bg-[#563da5]">
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
