import { IUserInfo } from "@/types";
import { IoClose } from "react-icons/io5";
import AddCertificationModal from "./AddCertificationModal";
import { IoIosAddCircleOutline } from "react-icons/io";

interface IEditCertificationProps {
  formData: IUserInfo;
  certifications: {
    title: string;
    issuer: string;
    dateOfIssue: string;
    url: string;
  };
  onRemove: (title: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const openModal = () => {
  const logoutModal = document.getElementById(
    "add_certification"
  ) as HTMLDialogElement | null;

  if (logoutModal) {
    logoutModal.showModal();
  }
};

const EditCertifications = ({
  formData,
  onRemove,
  certifications,
  onChange,
  onAdd,
}: IEditCertificationProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mt-16 mb-5">
        Certifications
      </h3>
      <div>
        {formData?.certifications && formData?.certifications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            {formData?.certifications?.map((item) => (
              <div
                className="card card-body w-full h-full bg-base-100 hover:shadow-xl border border-base-300 hover:border-primary duration-300 relative"
                key={item.title}
              >
                <button
                  type="button"
                  className="bg-red-500 text-white p-1 rounded-full flex justify-end items-center absolute -top-2 -right-2"
                  onClick={() => onRemove(item.title)}
                >
                  <IoClose />
                </button>

                <ul>
                  <li className="text-xl font-bold">{item.title}</li>
                  <hr className="my-3 border-gray-400" />
                  <li>
                    <strong>Issuer: </strong>
                    {item.issuer}
                  </li>
                  <li>
                    <strong>Date of Issue: </strong>
                    {item.dateOfIssue}
                  </li>
                  <li className="flex gap-1">
                    <strong>Show Credentials: </strong>
                    <p className="line-clamp-1">
                      {item.url ? item.url : "N/A"}
                    </p>
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
              Add New Certification
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-10 md:p-20 mt-5">
            <p className="text-center">
              You have not added any education qualifications yet!
            </p>
          </div>
        )}
      </div>

      <AddCertificationModal
        certifications={certifications}
        onAdd={onAdd}
        onChange={onChange}
      />
    </>
  );
};

export default EditCertifications;
