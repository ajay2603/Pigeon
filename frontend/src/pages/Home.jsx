import React from "react";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div className="h-full w-full p-2 bg-[#eff6fc] flex max-md:flex-col">
      <div className="md:h-full md:w-fit max-md:w-full max-md:h-fit">
        <NavBar />
      </div>
      <div className="md:w-full max-md:h-full"></div>
    </div>
  );
}

export default Home;
