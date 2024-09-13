import { CgClose } from "react-icons/cg";

const closeModal = () => {
  const logoutModal = document.getElementById(
    "add_experience"
  ) as HTMLDialogElement | null;
  if (logoutModal) {
    logoutModal.close();
  }
};

const AddExperienceModal = () => {
  return (
    <>
      <dialog
        id="add_experience"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-primary mb-5">
              Add new experience
            </h3>
            <span
              onClick={closeModal}
              className="btn btn-primary btn-circle btn-sm"
            >
              <CgClose />
            </span>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="companyName">
              <span className="label-text">Company Name</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="designation">
              <span className="label-text">Designation</span>
            </label>
            <input
              id="designation"
              name="designation"
              type="text"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="location">
              <span className="label-text">Location</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="period">
              <span className="label-text">Period</span>
            </label>
            <input
              id="period"
              name="period"
              type="text"
              className="input input-bordered"
            />
          </div>
          <div className="w-full">
            <button type="button" className="btn btn-primary mt-3 w-full">
              Done
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddExperienceModal;
