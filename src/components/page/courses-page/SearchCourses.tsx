"use client";
import { useState, useRef } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

interface SearchProps {
  onSearch: (searchValue: string) => void;
  onReset: () => void;
}

const SearchCourses = ({ onSearch, onReset }: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === "") {
      onReset();
    } else {
      onSearch(value);
    }
  };

  const handleResetClick = () => {
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onReset();
  };

  return (
    <>
      <div className="input input-bordered max-w-sm w-full input-primary flex items-center gap-2">
        <input
          id="search"
          name="search"
          type="text"
          className="grow"
          placeholder="Search"
          value={searchValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
        {searchValue ? (
          <button
            type="button"
            onClick={handleResetClick}
            className="ml-2 text-red-500"
            aria-label="Reset search"
          >
            <IoClose size={18} />
          </button>
        ) : (
          <IoSearch size={18} className="text-primary" />
        )}
      </div>
    </>
  );
};

export default SearchCourses;
