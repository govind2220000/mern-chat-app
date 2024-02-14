import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const searchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered rounded-full"
      />
      <button className="btn btn-circle bg-sky-500 text-gray-200">
        <IoSearchSharp className="w-6 h-6 outline-none"></IoSearchSharp>
      </button>
    </form>
  );
};

export default searchInput;
