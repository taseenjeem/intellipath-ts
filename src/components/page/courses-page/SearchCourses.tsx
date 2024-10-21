"use client";
import { IoSearch } from "react-icons/io5";

const SearchCourses = () => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="input input-bordered max-w-sm w-full input-primary flex items-center gap-2"
      >
        <input type="text" className="grow" placeholder="Search" />
        <button type="submit">
          <IoSearch size={18} className="text-primary" />
        </button>
      </form>
    </>
  );
};

export default SearchCourses;
