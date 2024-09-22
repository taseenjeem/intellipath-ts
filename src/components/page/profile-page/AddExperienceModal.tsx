"use client";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

interface IExperienceModalProps {
  experience: {
    companyName: string;
    designation: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const closeModal = () => {
  const logoutModal = document.getElementById(
    "add_experience"
  ) as HTMLDialogElement | null;
  if (logoutModal) {
    logoutModal.close();
  }
};

const AddExperienceModal = ({
  experience,
  onAdd,
  onChange,
}: IExperienceModalProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const addExperience = () => {
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
              value={experience.companyName}
              onChange={onChange}
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
              value={experience.designation}
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
              value={experience.location}
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
              value={experience.startDate}
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
              value={isChecked ? "present" : experience.endDate}
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
          <div className="w-full">
            <button
              type="button"
              className="btn btn-primary mt-3 w-full"
              onClick={addExperience}
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddExperienceModal;
