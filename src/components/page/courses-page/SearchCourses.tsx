import { IoSearch } from "react-icons/io5";

const SearchCourses = () => {
  return (
    <>
      <form className="input input-bordered max-w-sm w-full input-primary flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <button type="submit">
          <IoSearch size={18} className="text-primary" />
        </button>
      </form>
    </>
  );
};

export default SearchCourses;
