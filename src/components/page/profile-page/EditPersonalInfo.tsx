import { IUserInfo } from "@/types";
import EditUserAvatar from "./EditUserAvatar";

interface IEditPersonalInfoProps {
  formData: IUserInfo;
  profileImageUrl: string | null | undefined;
  userId: string;
  userEmail: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const EditPersonalInfo = ({
  formData,
  handleChange,
  profileImageUrl,
  userId,
  userEmail,
}: IEditPersonalInfoProps) => {
  return (
    <>
      <EditUserAvatar
        profileImageUrl={profileImageUrl}
        userEmail={userEmail}
        userId={userId}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
        {/* First Name Input */}
        <div className="form-control">
          <label className="label" htmlFor="firstName">
            <span className="label-text">First Name</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="input input-bordered"
            value={formData.firstName ?? ""}
            onChange={handleChange}
          />
        </div>
        {/* Last Name Input */}
        <div className="form-control">
          <label className="label" htmlFor="lastName">
            <span className="label-text">Last Name</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="input input-bordered"
            value={formData.lastName ?? ""}
            onChange={handleChange}
          />
        </div>
        {/* Username Input */}
        <div className="form-control">
          <label className="label" htmlFor="username">
            <span className="label-text">Username</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="input input-bordered"
            value={formData.username ?? ""}
            onChange={handleChange}
          />
        </div>
        {/* Gender Input */}
        <div className="form-control">
          <label className="label" htmlFor="gender">
            <span className="label-text">Gender</span>
          </label>
          <select
            id="gender"
            name="gender"
            className="select select-bordered"
            value={formData.gender ?? ""}
            onChange={handleChange}
          >
            <option disabled value="">
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {/* Birth Date Input */}
        <div className="form-control">
          <label className="label" htmlFor="birthDate">
            <span className="label-text">Date of birth</span>
            <span className="text-xs">(MM/DD/YYYY)</span>
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            className="input input-bordered"
            value={formData.birthDate ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-control mt-5">
        <label className="label" htmlFor="birthDate">
          <span className="label-text">About me / Biography</span>
        </label>
        <textarea
          id="biography"
          name="biography"
          className="input input-bordered pt-3 min-h-60"
          value={formData.biography ?? ""}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default EditPersonalInfo;
