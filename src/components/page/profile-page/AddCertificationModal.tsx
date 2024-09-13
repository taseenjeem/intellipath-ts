import { CgClose } from "react-icons/cg";

interface ICertificationModalProps {
  certifications: {
    title: string;
    issuer: string;
    dateOfIssue: string;
    url: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const closeModal = () => {
  const logoutModal = document.getElementById(
    "add_certification"
  ) as HTMLDialogElement | null;
  if (logoutModal) {
    logoutModal.close();
  }
};

const AddCertificationModal = ({
  certifications,
  onChange,
  onAdd,
}: ICertificationModalProps) => {
  const addCertification = () => {
    onAdd();
    closeModal();
  };

  return (
    <>
      <dialog
        id="add_certification"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary mb-5">
                Add new certification
              </h3>
              <span
                onClick={closeModal}
                className="btn btn-primary btn-circle btn-sm"
              >
                <CgClose />
              </span>
            </div>
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
                onClick={addCertification}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddCertificationModal;
