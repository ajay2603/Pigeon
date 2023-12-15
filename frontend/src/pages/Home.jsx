import React from "react";

import NavBar from "../components/NavBar";
import Chats from "../components/sections/Chats";
import DefChatArea from "../components/sections/DefChatArea";

function Home() {
  return (
    <div className="h-full w-full p-2 bg-[#eff6fc] flex max-md:flex-col gap-2">
      <div className="md:h-full md:w-fit max-md:w-full max-md:h-fit">
        <NavBar />
      </div>
      <div className="md:w-full max-md:h-full flex gap-2">
        <Chats />
        <div className="w-3/4 bg-white rounded-3xl">
          <DefChatArea />
        </div>
      </div>
    </div>
  );
}

export default Home;
