"use client";
import { useEffect, useState } from "react";
import { ICountry, ILearnerInfo } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { updateLearnerInfo } from "@/redux/slices/LearnerInfoSlice";

const getCountries = async () => {
  return import("@/database/json/countries.json").then(
    (module) => module.default
  );
};

const ProfileInfoForm = () => {
  const dispatch = useAppDispatch();
  const savedFormData = useAppSelector((state: RootState) => state.learnerInfo);
  const [formData, setFormData] = useState<ILearnerInfo>(savedFormData);
  const [allCountries, setAllCountries] = useState<ICountry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      setAllCountries(countries);
    };
    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      dispatch(updateLearnerInfo(formData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-base-300 card card-compact mt-5 md:mt-16">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {/* First Name Input */}
          <div className="form-control">
            <label className="label" htmlFor="name">
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
            <label className="label" htmlFor="name">
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
          {/* Email Input */}
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Your Email</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered"
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
