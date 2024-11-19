"use client";
import { getAllCourses } from "@/database/server-actions";
import { ICourse } from "@/types";
import { placeholderBase64 } from "@/utils/placeholderBase64";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";

const Search = () => {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ICourse[] | null>(null);
  const router = useRouter();

  const openModal = () => {
    const filterModal = document.getElementById(
      "nav_search_modal"
    ) as HTMLDialogElement | null;
    if (filterModal) {
      filterModal.showModal();
    }
  };

  const closeModal = () => {
    const filterModal = document.getElementById(
      "nav_search_modal"
    ) as HTMLDialogElement | null;
    if (filterModal) {
      filterModal.close();
    }
    setSearchTerms("");
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerms.trim()) return;
    openModal();
    setIsLoading(true);
    setResult(null);

    try {
      const allCourses: ICourse[] = await getAllCourses();
      const searchResult = allCourses.filter((course) =>
        course.title.toLowerCase().includes(searchTerms.toLowerCase())
      );
      setResult(searchResult);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectCourseDetails = (slug: string) => {
    closeModal();
    router.push(`/courses/${slug}`);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="join max-w-xl w-full">
        <input
          required
          type="text"
          id="search_courses"
          name="search_courses"
          className="input input-sm input-bordered join-item max-w-xl w-full"
          placeholder="Search Courses"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm join-item">
          <BiSearch />
        </button>
      </form>
      <dialog
        id="nav_search_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box text-base-content">
          <div className="flex justify-between items-center">
            {searchTerms ? (
              <h3 className="font-bold text-lg">
                Results of &quot;{searchTerms}&quot;
              </h3>
            ) : (
              <h3 className="font-bold text-lg">
                You must search for something
              </h3>
            )}
            <button onClick={closeModal}>
              <IoMdCloseCircle size={24} />
            </button>
          </div>
          <div>
            {isLoading ? (
              <>
                <div className="flex items-center gap-4 w-full mt-4">
                  <div className="skeleton w-52 h-28 flex-shrink-0"></div>
                  <div className="w-full space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-4 w-2/4"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full mt-4">
                  <div className="skeleton w-52 h-28 flex-shrink-0"></div>
                  <div className="w-full space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-4 w-2/4"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full mt-4">
                  <div className="skeleton w-52 h-28 flex-shrink-0"></div>
                  <div className="w-full space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-4 w-2/4"></div>
                  </div>
                </div>
              </>
            ) : result && result.length === 0 ? (
              <div className="border custom-border rounded-xl p-5 h-40 flex justify-center items-center mt-4">
                <p>No result found!</p>
              </div>
            ) : (
              result?.map((item) => (
                <>
                  <div className="border-t custom-border my-3" />
                  <span
                    onClick={() => redirectCourseDetails(item.slug)}
                    role="button"
                    className="mt-4 group"
                  >
                    <div className="flex justify-start gap-3">
                      <div className="relative w-52 h-28 flex-shrink-0">
                        <Image
                          fill
                          src={item.thumbnail}
                          alt={item.title}
                          placeholder="blur"
                          blurDataURL={placeholderBase64}
                          className="object-cover object-center flex-shrink-0"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold leading-none group-hover:text-primary duration-150">
                          {item.title}
                        </h3>
                        <h3 className="text-sm">
                          Instructor: {item.instructor.firstName}{" "}
                          {item.instructor.lastName}
                        </h3>
                        <h3 className="text-sm">
                          Price: {item.discount ? item.discount : item.price}
                        </h3>
                      </div>
                    </div>
                  </span>
                </>
              ))
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Search;
