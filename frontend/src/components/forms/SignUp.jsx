import React, { useState } from "react";
import axios from "axios";
import consts from "../../const";

function SignUp(props) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    cnfPassword: "",
  });

  const [usrOutLin, setUsrOutLin] = useState({});

  const upVal = (event) => {
    const { name, value } = event.target;
    if (["password, cnfPassword"].includes(name))
      setValues({ ...values, [name]: value });
    else setValues({ ...values, [name]: value.trim() });
  };

  const handleUsrOutLine = async (event) => {
    try {
      const response = await axios.post(
        `${consts.domurl}/api/user-auth/check-user-exist`,
        {
          userName: event.target.value.trim(),
        }
      );

      const res = response.data;

      if (!res.stat && !res.err) {
        setUsrOutLin({
          outline: "3px solid #03b831",
        });
      } else if (res.stat && !res.err) {
        setUsrOutLin({
          outline: "3px solid red",
        });
      } else {
        setUsrOutLin({});
      }
    } catch (err) {
      console.log("error in connecting server");
      console.log(err);
    }
  };

  const validateSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());
    if (formData.password !== formData.cnfPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }
    try {
      const result = await axios.post(
        `${consts.domurl}/api/user-auth/add-new-user`,
        formData
      );

      const res = result.data;

      if (!res.stat) {
        if (!res.err) {
          alert("User already exist");
        } else {
          alert("Error occured");
        }
      } else {
        props.updatePG();
      }
    } catch (err) {
      alert("Error in connecting Server");
      alert(err);
    }
  };

  return (
    <div className="flex-col justify-center items-center w-full gap-5 flex">
      <div className="w-fit">
        <h1 className="logsupTxt logsupHeading text-center">Sign Up</h1>
      </div>
      <form
        className="flex flex-col gap-3 w-ful"
        onSubmit={validateSubmit}
        id="helo">
        <input
          type="text"
          name="firstName"
          value={values.fName}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={values.lName}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="userName"
          value={values.uName}
          style={usrOutLin}
          onChange={(event) => {
            upVal(event);
            handleUsrOutLine(event);
          }}
          className="txt-input logsupTxt"
          placeholder="User Name"
          required
        />
        <input
          type="password"
          name="password"
          value={values.pass}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="cnfPassword"
          value={values.cnfPass}
          onChange={upVal}
          className="txt-input logsupTxt"
          placeholder="Confirm Password"
          required
        />
        <div className="flex justify-center mt-3">
          <button
            className="text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white transition-all duration-[0.2s] hover:bg-[#563da5] hover:-translate-y-1"
            type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
