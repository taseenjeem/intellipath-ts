"use client";
import { useEffect, useState } from "react";
import { ICountry, IUserInfo } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { getUserByEmail, updateUserDetails } from "@/database/server-actions";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const getCountries = async () => {
  return import("@/database/json/countries.json").then(
    (module) => module.default
  );
};

interface IProfileInfoFormProps {
  userId: string;
  userEmail: string;
}

const ProfileInfoForm = ({ userId, userEmail }: IProfileInfoFormProps) => {
  const dispatch = useAppDispatch();
  const savedFormData = useAppSelector((state: RootState) => state.userInfo);
  const [formData, setFormData] = useState<IUserInfo>(savedFormData);
  const [allCountries, setAllCountries] = useState<ICountry[]>([]);
  const [newExpertise, setNewExpertise] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      setAllCountries(countries);
    };
    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newExpertise.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        expertise: [...(prevData.expertise ?? []), newExpertise.trim()],
      }));
      setNewExpertise("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prevData) => ({
      ...prevData,
      expertise: prevData.expertise?.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUserDetails(userId, formData);

      const userInfo = await getUserByEmail(userEmail);
      if (userInfo) {
        dispatch(updateUserInfo(userInfo));
        toast.success("User updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mb-5">
        Personal information
      </h3>
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <div>
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
          </div>
          <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 my-5">
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
          <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 my-5">
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
        </div>

        {/* Submit Button */}
        <div className="card-actions justify-end mt-5">
          {isLoading ? (
            <button
              disabled
              className="btn btn-primary btn-outline no-animation"
            >
              <span className="loading loading-spinner"></span>
              Saving..
            </button>
          ) : (
            <button type="submit" className="btn btn-primary btn-outline">
              Save Information
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
