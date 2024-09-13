import { CgClose } from "react-icons/cg";

interface IAcademicInfoModalProps {
  education: {
    degree: string;
    institution: string;
    location: string;
    yearOfCompletion: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const closeModal = () => {
  const logoutModal = document.getElementById(
    "add_academic_info"
  ) as HTMLDialogElement | null;
  if (logoutModal) {
    logoutModal.close();
  }
};

const AddAcademicInfoModal = ({
  education,
  onChange,
  onAdd,
}: IAcademicInfoModalProps) => {
  const addAcademicInfo = () => {
    onAdd();
    closeModal();
  };

  return (
    <>
      <dialog
        id="add_academic_info"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-primary mb-5">
              Add new academic education
            </h3>
            <span
              onClick={closeModal}
              className="btn btn-primary btn-circle btn-sm"
            >
              <CgClose />
            </span>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="degree">
              <span className="label-text">Degree</span>
            </label>
            <input
              id="degree"
              name="degree"
              type="text"
              className="input input-bordered"
              placeholder="Ex: BSc, BCS, Hons"
              value={education.degree}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="institution">
              <span className="label-text">Institution</span>
            </label>
            <input
              id="institution"
              name="institution"
              type="text"
              className="input input-bordered"
              placeholder="Ex: University of Oxford"
              value={education.institution}
              onChange={onChange}
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
              placeholder="Ex: UK"
              value={education.location}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="yearOfCompletion">
              <span className="label-text">Time Period</span>
            </label>
            <input
              id="yearOfCompletion"
              name="yearOfCompletion"
              type="text"
              className="input input-bordered"
              placeholder="Ex: 2018 - 2020, 2018 - Present"
              value={education.yearOfCompletion}
              onChange={onChange}
            />
          </div>
          <div className="w-full flex justify-end mt-6">
            <button
              type="button"
              className="btn  btn-primary"
              onClick={addAcademicInfo}
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddAcademicInfoModal;
