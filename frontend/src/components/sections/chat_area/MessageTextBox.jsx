import React, { useState } from "react";

function MessageTextBox() {
  const [msgVal, setMsgVal] = useState("");
  return (
    <div className="w-full h-fit flex items-center gap-6 px-2">
      <div className="bg-[#f1f7fc] h-12 w-full flex justify-center rounded-xl px-4 py-3">
        <input
          type="text"
          placeholder="Type your message here..."
          value={msgVal}
          onChange={(event) => {
            setMsgVal(event.target.value);
          }}
          className="w-full flex bg-transparent outline-none text-lg font-medium"
        />
      </div>
      <div className="flex h-12 w-12 px-2 items-center justify-center bg-[#6e00ff] rounded-xl">
        <span className="material-symbols-outlined bg-transparent text-3xl text-white">
          send
        </span>
      </div>
    </div>
  );
}

export default MessageTextBox;
