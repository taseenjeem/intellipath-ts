import { IUserInfo } from "@/types";
import { IoClose } from "react-icons/io5";

interface IEditExpertiseProps {
  formData: IUserInfo;
  handleRemoveSkill: (skill: string) => void;
  newExpertise: string;
  setNewExpertise: (value: string) => void;
  handleAddSkill: () => void;
}

const EditExpertise = ({
  formData,
  handleRemoveSkill,
  newExpertise,
  setNewExpertise,
  handleAddSkill,
}: IEditExpertiseProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mt-16 mb-5">
        Skills & Expertise
      </h3>
      {/* Expertise Input */}
      <div className="form-control">
        <label className="label" htmlFor="expertise">
          <span className="label-text">Your Expertise</span>
        </label>
        <div className="px-2 py-5 h-60 border-2 border-base-100 rounded-md mb-2 flex flex-wrap gap-10">
          {formData?.expertise?.length === 0 ? (
            <span>You haven&apos;t added any skills yet!</span>
          ) : (
            formData?.expertise?.map((item) => (
              <div
                className="badge badge-primary h-[2rem] text-lg leading-6 px-[0.988rem] relative"
                key={item}
              >
                {item}
                <button
                  type="button"
                  className="bg-red-500 text-white p-1 rounded-full flex justify-end items-center absolute -top-3 -right-3"
                  onClick={() => handleRemoveSkill(item)}
                >
                  <IoClose />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2 items-center">
          <input
            id="expertise"
            name="expertise"
            type="text"
            className="input input-bordered w-full"
            placeholder="Ex: JavaScript, React, Node.js"
            value={newExpertise}
            onChange={(e) => setNewExpertise(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddSkill}
          >
            Add Skill
          </button>
        </div>
      </div>
    </>
  );
};

export default EditExpertise;
