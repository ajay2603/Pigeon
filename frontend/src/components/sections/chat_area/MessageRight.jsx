import React from "react";

import dispTime from "../../../functions/dispMsgTime";

function MessageRight(props) {
  return (
    <div className="flex h-fit w-full justify-end">
      <div className="flex h-fit w-fit max-w-5/6 flex-col pl-2">
        <div className="flex w-fit h-fit bg-[#6e00ff] p-2 px-3 rounded-[1.3rem] text-lg text-white">
          {props.msg.text}
        </div>
        <div className="flex flex-row-reverse">
          <div className="w-3 h-3 rounded-[50%] bg-[#6e00ff] relative left-[4px] bottom-[3px]"></div>
          <span className="mr-2 text-xs text-[#707070]">
            {dispTime(props.msg.time)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageRight;
