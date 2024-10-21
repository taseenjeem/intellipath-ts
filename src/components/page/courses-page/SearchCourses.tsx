"use client";
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchCourses = ({ onSearch }: SearchProps) => {
  return (
    <>
      <form
        onSubmit={onSearch}
        className="input input-bordered max-w-sm w-full input-primary flex items-center gap-2"
      >
        <input
          id="search"
          name="search"
          type="text"
          className="grow"
          placeholder="Search"
        />
        <button type="submit">
          <IoSearch size={18} className="text-primary" />
        </button>
      </form>
    </>
  );
};

export default SearchCourses;
