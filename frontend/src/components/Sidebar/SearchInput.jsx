import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation.js";
import useGetConversations from "../../hooks/useGetConversations.js";
import { toast } from "react-hot-toast";
const searchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3)
      return toast.error("Search must be atleast 3 characters");
    const conversation = conversations.find((c) =>
      c.userName.toLowerCase().includes(search.toLowerCase())
    );

    if (!conversation) {
      return toast.error("No user found");
    } else {
      setSelectedConversation(conversation);
      setSearch("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search Username"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className="btn btn-circle bg-sky-500 text-gray-200">
        <IoSearchSharp className="w-6 h-6 outline-none"></IoSearchSharp>
      </button>
    </form>
  );
};

export default searchInput;
