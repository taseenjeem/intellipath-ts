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
        </div>
      </dialog>
    </>
  );
};

export default AddExperienceModal;
