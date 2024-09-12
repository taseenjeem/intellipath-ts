import { IUserInfo } from "@/types";
import { IoClose } from "react-icons/io5";
import AddAcademicInfoModal from "./AddAcademicInfoModal";
import { IoIosAddCircleOutline } from "react-icons/io";

interface IEditAcademicInfoProps {
  formData: IUserInfo;
  education: {
    degree: string;
    institution: string;
    location: string;
    yearOfCompletion: string;
  };
  onRemove: (degree: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const openModal = () => {
  const logoutModal = document.getElementById(
    "add_academic_info"
  ) as HTMLDialogElement | null;

  if (logoutModal) {
    logoutModal.showModal();
  }
};

const EditAcademicInfo = ({
  formData,
  onRemove,
  education,
  onChange,
  onAdd,
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
                  onClick={() => onRemove(item.degree)}
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
            <div
              onClick={openModal}
              role="button"
              className="border rounded-2xl w-full min-h-44 flex gap-2 flex-col items-center justify-center hover:text-primary hover:border-primary duration-300"
            >
              <IoIosAddCircleOutline size={60} />
              Add New Academic Info
            </div>
          </div>
        ) : (
          <div className="border rounded-3xl p-10 md:p-20 mt-5">
            <p className="text-center">
              You have not added any education qualifications yet! Go to the
              &quot;Settings&quot; tab to add your academic education.
            </p>
          </div>
        )}
      </div>

      <AddAcademicInfoModal
        education={education}
        onAdd={onAdd}
        onChange={onChange}
      />
    </>
  );
};

export default EditAcademicInfo;
