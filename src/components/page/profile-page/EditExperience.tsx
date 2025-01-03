import { IUserInfo } from "@/types";
import AddExperienceModal from "./AddExperienceModal";
import { IoClose } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { formatDate } from "@/utils/dateFormatter";

interface IEditExperienceProps {
  formData: IUserInfo;
  experience: {
    companyName: string;
    designation: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  onRemove: (title: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const openModal = () => {
  const logoutModal = document.getElementById(
    "add_experience"
  ) as HTMLDialogElement | null;

  if (logoutModal) {
    logoutModal.showModal();
  }
};

const EditExperience = ({
  formData,
  experience,
  onAdd,
  onRemove,
  onChange,
}: IEditExperienceProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold text-primary mt-16 mb-5">
        Experiences
      </h3>
      <div>
        {formData?.experience && formData?.experience.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            {formData?.experience?.map((item) => (
              <div
                className="p-3 md:p-6 rounded-xl w-full h-full bg-base-100 hover:shadow-xl border border-base-100 hover:border-primary duration-300 relative"
                key={item.companyName}
              >
                <button
                  type="button"
                  className="bg-red-500 text-white p-1 rounded-full flex justify-end items-center absolute -top-2 -right-2"
                  onClick={() => onRemove(item._id ?? "")}
                >
                  <IoClose />
                </button>

                <ul>
                  <li className="text-xl font-bold">{item.companyName}</li>
                  <li className="my-1 text-sm">
                    {formatDate(item.startDate)} -{" "}
                    {item.endDate === "present"
                      ? "Present"
                      : formatDate(item.endDate)}
                  </li>
                  <hr className="my-3 border-gray-400" />
                  <li>
                    <strong>Designation: </strong>
                    {item.designation}
                  </li>
                  <li>
                    <strong>Location: </strong>
                    {item.location}
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
              Add New Experience
            </div>
          </div>
        ) : (
          <div
            onClick={openModal}
            role="button"
            className="border rounded-2xl w-full min-h-44 flex gap-2 flex-col items-center justify-center hover:text-primary hover:border-primary duration-300"
          >
            <IoIosAddCircleOutline size={60} />
            Add New Experience
          </div>
        )}
      </div>

      <AddExperienceModal
        experience={experience}
        onAdd={onAdd}
        onChange={onChange}
      />
    </>
  );
};

export default EditExperience;
