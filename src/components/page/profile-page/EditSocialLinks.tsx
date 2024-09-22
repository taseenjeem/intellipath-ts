import { IUserInfo } from "@/types";

interface IEditSocialLinkProps {
  formData: IUserInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditSocialLinks = ({ formData, onChange }: IEditSocialLinkProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mt-16 mb-5">
        Social Links
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="form-control">
          <label className="label" htmlFor="facebook">
            <span className="label-text">Facebook</span>
          </label>
          <input
            id="facebook"
            name="facebook"
            type="text"
            className="input input-bordered"
            value={formData?.socialLinks?.facebook || ""}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="twitter">
            <span className="label-text">X (Twitter)</span>
          </label>
          <input
            id="twitter"
            name="twitter"
            type="text"
            className="input input-bordered"
            value={formData?.socialLinks?.twitter || ""}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="linkedin">
            <span className="label-text">LinkedIn</span>
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="text"
            className="input input-bordered"
            value={formData?.socialLinks?.linkedin || ""}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="github">
            <span className="label-text">GitHub</span>
          </label>
          <input
            id="github"
            name="github"
            type="text"
            className="input input-bordered"
            value={formData?.socialLinks?.github || ""}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="website">
            <span className="label-text">Website</span>
          </label>
          <input
            id="website"
            name="website"
            type="text"
            className="input input-bordered"
            value={formData?.socialLinks?.website || ""}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default EditSocialLinks;
