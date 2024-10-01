import { CgClose } from "react-icons/cg";

const closeModal = () => {
  const lessonModal = document.getElementById(
    "add_lesson"
  ) as HTMLDialogElement | null;
  if (lessonModal) {
    lessonModal.close();
  }
};

const AddLessonsModal = () => {
  return (
    <>
      <dialog id="add_lesson" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-primary mb-5">Add Lesson</h3>
            <span
              onClick={closeModal}
              className="btn btn-primary btn-circle btn-sm"
            >
              <CgClose />
            </span>
          </div>
          <div className="space-y-5">
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Lesson title</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Lesson URL</span>
                <span className="label-text">(YouTube Video)</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="input input-bordered"
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary">Add lesson</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddLessonsModal;
