"use client";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

interface IAcademicInfoModalProps {
  education: {
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string | "present";
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
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const addAcademicInfo = () => {
    onAdd();
    closeModal();
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onChange({
        target: { name: "endDate", value: "present" },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      onChange({
        target: { name: "endDate", value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const today = new Date().toISOString().split("T")[0];

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
            <label className="label" htmlFor="startDate">
              <span className="label-text">Starts in</span>
              <span className="text-xs">(MM/DD/YYYY)</span>
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              className="input input-bordered"
              value={education.startDate}
              onChange={onChange}
              max={today}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="endDate">
              <span className="label-text">Ended in</span>
              <span className="text-xs">(MM/DD/YYYY)</span>
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              className={`input input-bordered ${
                isChecked ? "cursor-not-allowed" : ""
              }`}
              value={isChecked ? "present" : education.endDate}
              onChange={onChange}
              max={today}
              disabled={isChecked}
            />
            <label className="cursor-pointer flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="label-text">Currently studying here</span>
            </label>
          </div>
          <div className="w-full flex justify-end mt-6">
            <button
              type="button"
              className="btn btn-primary"
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
