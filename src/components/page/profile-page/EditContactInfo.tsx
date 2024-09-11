import { ICountry, IUserInfo } from "@/types";

interface IEditContactInfoProps {
  formData: IUserInfo;
  allCountries: ICountry[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const EditContactInfo = ({
  formData,
  handleChange,
  allCountries,
}: IEditContactInfoProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mt-16 mb-5">
        Contact information
      </h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {/* Email Input */}
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Your Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input input-bordered cursor-not-allowed"
            readOnly
            value={formData.email ?? ""}
            onChange={handleChange}
          />
        </div>
        {/* Phone Input */}
        <div className="form-control">
          <label className="label" htmlFor="phone">
            <span className="label-text">Your Phone Number</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="number"
            className="input input-bordered"
            value={formData.phone ?? ""}
            onChange={handleChange}
          />
        </div>
        {/* Country Input */}
        <div className="form-control">
          <label className="label" htmlFor="country">
            <span className="label-text">Your Country</span>
          </label>
          <select
            id="country"
            name="country"
            className="select select-bordered"
            value={formData.country ?? ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Please select your country
            </option>
            {allCountries.map((item) => (
              <option key={item.code} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {/* Address Input */}
        <div className="form-control">
          <label className="label" htmlFor="address">
            <span className="label-text">Your Address</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            className="input input-bordered"
            value={formData.address ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default EditContactInfo;
