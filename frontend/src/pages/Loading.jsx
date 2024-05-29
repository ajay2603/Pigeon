import React from "react";
import pegion_gif from "../assets/pigeon-dove.gif";
import LoadingGif from "../assets/loadingGIF.gif";

function Loading() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center flex-col gap-6 bg-[#eff6fc]">
      <h1 className="text-4xl text-[#5e3df3] font-medium logsupTxt">Pigeon</h1>
      <img src={pegion_gif} className=" h-80" />
      <h1 className="inline-flex h-fit items-center text-4xl text-[#5e3df3] font-medium logsupTxt">
        Loading <img src={LoadingGif} className="h-14 m-3 relative top-3" />
      </h1>
    </div>
  );
}

export default Loading;
