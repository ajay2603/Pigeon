import React from "react";

import img from "../../assets/pegion_ico.png"

function DefChatArea() {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <img src={img} className="h-1/6" />
      <h1 className="w-fit text-center text-gray-600">
        Chit chat your friends
        <br />
        with
        <br />
        <span className="text-xl text-blue-700">Pegion</span>
      </h1>
    </div>
  );
}

export default DefChatArea;