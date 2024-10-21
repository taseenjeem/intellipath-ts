"use client";
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
            <h3 className="font-bold text-xl text-white">Sort Products</h3>
            <button onClick={closeModal}>
              <IoIosCloseCircle className="size-8 text-primary" />
            </button>
          </div>
          <div className="py-4">
            <h3 className="text-lg ">Select category</h3>
            <hr className="my-2" />
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
          </div>
          <div className="py-4">
            <h3 className="text-lg ">Select category</h3>
            <hr className="my-2" />
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
          </div>
          <div className="py-4">
            <h3 className="text-lg ">Select category</h3>
            <hr className="my-2" />
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Filter 1</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </label>
            </div>
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
