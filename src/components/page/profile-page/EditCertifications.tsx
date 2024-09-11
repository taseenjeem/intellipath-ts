import { IUserInfo } from "@/types";
import { IoClose } from "react-icons/io5";

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
                  <li>
                    <strong>Show Credentials: </strong>
                    <p className="line-clamp-1">
                      {item.url ? item.url : "N/A"}
                    </p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-10 md:p-20 mt-5">
            <p className="text-center">
              You have not added any education qualifications yet!
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-5 items-end mt-5">
          <div className="form-control">
            <label className="label" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="input input-bordered"
              placeholder="EX: Certificate of Best Developer in 2024"
              value={certifications.title}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="issuer">
              <span className="label-text">Issuer</span>
            </label>
            <input
              id="issuer"
              name="issuer"
              type="text"
              className="input input-bordered"
              placeholder="Ex: University of Oxford"
              value={certifications.issuer}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="dateOfIssue">
              <span className="label-text">Date of issue</span>
            </label>
            <input
              id="dateOfIssue"
              name="dateOfIssue"
              type="text"
              className="input input-bordered"
              placeholder="Ex: 17 Feb 2016"
              value={certifications.dateOfIssue}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="url">
              <span className="label-text">Credential Link</span>
            </label>
            <input
              id="url"
              name="url"
              type="text"
              className="input input-bordered"
              placeholder="Ex: www.something.com"
              value={certifications.url}
              onChange={onChange}
            />
          </div>
          <div className="w-full">
            <button
              type="button"
              className="btn btn-primary mt-3 w-full"
              onClick={onAdd}
            >
              Add New Certification
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCertifications;
