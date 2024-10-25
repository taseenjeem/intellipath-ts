"use client";
import {
  courseCategory,
  courseLanguages,
  courseLevel,
} from "@/database/static-data";
import { IoIosCloseCircle } from "react-icons/io";

const FilterModal = () => {
  const openModal = () => {
    const filterModal = document.getElementById(
      "filter_modal"
    ) as HTMLDialogElement | null;

    if (filterModal) {
      filterModal.showModal();
    }
  };

  const closeModal = () => {
    const filterModal = document.getElementById(
      "filter_modal"
    ) as HTMLDialogElement | null;

    if (filterModal) {
      filterModal.close();
    }
  };

  return (
    <>
      <button
        className="btn btn-sm btn-primary block md:hidden"
        onClick={openModal}
      >
        Filters
      </button>
      <dialog id="filter_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">Sort Products</h3>
            <button onClick={closeModal}>
              <IoIosCloseCircle className="size-8 text-primary" />
            </button>
          </div>
          <div className="py-4">
            <h3 className="text-lg ">Category</h3>
            <hr className="my-2" />
            {courseCategory.map((item) => (
              <div key={item} className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">{item}</span>
                  <input
                    id={item}
                    name={item}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="py-4">
            <h3 className="text-lg ">Language</h3>
            <hr className="my-2" />
            {courseLanguages.map((item) => (
              <div key={item} className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">{item}</span>
                  <input
                    id={item}
                    name={item}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="py-4">
            <h3 className="text-lg ">Select category</h3>
            <hr className="my-2" />
            {courseLevel.map((item) => (
              <div key={item} className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">{item}</span>
                  <input
                    id={item}
                    name={item}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={closeModal}
            className="btn btn-sm btn-primary w-full"
          >
            Done
          </button>
        </div>
      </dialog>
    </>
  );
};

export default FilterModal;
