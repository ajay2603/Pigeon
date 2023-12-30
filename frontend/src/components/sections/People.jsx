import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar";
import UserListItem from "../UserListItem";
import consts from "../../const";

function People(props) {
  const changeChatArea = (userName) => {
    props.setChatAreaUsr(userName);
  };
  const [peopleList, updatePeopleList] = useState([]);

  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (value) => {
    setSearchVal(value);
  };

  const getSearchResult = async () => {
    try {
      const response = await axios.get(
        `${consts.domurl}/api/fetch/user-details/get-search-users-list?userName=${searchVal}`
      );
      const result = response.data;
      if (result.stat) {
        updatePeopleList(result.list);
      } else {
        alert("Internal server error");
      }
    } catch (err) {
      alert("Error in connecting server");
    }
  };

  useEffect(() => {
    getSearchResult();
  }, [searchVal]);

  const defDisplay = "No user found";

  return (
    <div className="w-1/4 rounded-2xl flex flex-col gap-4">
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-col bg-white h-full w-full shadow-md shadow-blue-200 rounded-2xl">
        <h1 className="text-2xl font-semibold flex w-full h-fit pl-4 pt-3 pb-2">
          People
        </h1>
        <hr className=" border-solid border-gray-500 mx-3 my-2 border-[1.5px]" />
        <div className="flex flex-col h-full">
          {peopleList.length !== 0 ? (
            peopleList.map((userName) => (
              <div key={userName}>
                {" "}
                {/* Ensure to add a unique key here */}
                <UserListItem
                  key={userName}
                  userName={userName}
                  onClickGetUsr={changeChatArea}
                />
                <hr className=" border-solid mx-3" />
              </div>
            ))
          ) : (
            <h1 className="m-auto mt-6 text-gray-700 text-lg">{defDisplay}</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default People;
