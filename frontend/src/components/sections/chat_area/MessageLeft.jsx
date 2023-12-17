import React from "react";

function MessageLeft() {
  return (
    <div className="flex h-fit w-full">
      <div className="flex h-fit w-5/6 flex-col pl-2">
        <div className="flex w-fit h-fit bg-[#e5e5e5] p-2 px-3 rounded-[1.3rem] text-lg">
          Display text messages <br />
          Hello World
        </div>
        <div className="flex">
          <div className="w-3 h-3 rounded-[50%] bg-[#e5e5e5] relative right-[4px] bottom-[3px]"></div>
          <span className="ml-2 text-xs text-[#707070]">Displaying time</span>
        </div>
      </div>
    </div>
  );
}

export default MessageLeft;
