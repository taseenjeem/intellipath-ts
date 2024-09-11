import { IUserInfo } from "@/types";
import { IoClose } from "react-icons/io5";

interface IEditAcademicInfoProps {
  formData: IUserInfo;
  education: {
    degree: string;
    institution: string;
    location: string;
    yearOfCompletion: string;
  };
  handleRemoveEducation: (degree: string) => void;
  handleEducationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddEducation: () => void;
}

const EditAcademicInfo = ({
  formData,
  handleRemoveEducation,
  education,
  handleEducationChange,
  handleAddEducation,
}: IEditAcademicInfoProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mt-16 mb-5">
        Academic Education
      </h3>
      <div>
        {formData?.education && formData?.education.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            {formData?.education?.map((item) => (
              <div
                className="card card-body w-full h-full bg-base-100 hover:shadow-xl border border-base-300 hover:border-primary duration-300 relative"
                key={item.degree}
              >
                <button
                  type="button"
                  className="bg-red-500 text-white p-1 rounded-full flex justify-end items-center absolute -top-2 -right-2"
                  onClick={() => handleRemoveEducation(item.degree)}
                >
                  <IoClose />
                </button>

                <ul>
                  <li className="text-xl font-bold">{item.degree}</li>
                  <hr className="my-3 border-gray-400" />
                  <li>
                    <strong>Institution: </strong>
                    {item.institution}
                  </li>
                  <li>
                    <strong>Location: </strong>
                    {item.location}
                  </li>
                  <li>
                    <strong>Year of accomplished: </strong>
                    {item.yearOfCompletion}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-10 md:p-20 mt-5">
            <p className="text-center">
              You have not added any education qualifications yet! Go to the
              &quot;Settings&quot; tab to add your academic education.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-5 items-end mt-5">
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
              onChange={handleEducationChange}
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
              onChange={handleEducationChange}
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
              onChange={handleEducationChange}
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
              onChange={handleEducationChange}
            />
          </div>
          <div className="w-full">
            <button
              type="button"
              className="btn w-full btn-primary"
              onClick={handleAddEducation}
            >
              Add New Academic Education
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAcademicInfo;
