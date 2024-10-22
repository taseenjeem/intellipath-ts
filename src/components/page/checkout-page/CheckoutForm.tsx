"use client";
import {
  getCountries,
  getUserByEmail,
  updateUserDetails,
} from "@/database/server-actions";
import {
  initializeFormData,
  setAllCountries,
  setFormData,
  setIsLoading,
} from "@/redux/slices/profileInfoSlice";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const dispatch = useAppDispatch();

  const { formData, allCountries, isLoading } = useAppSelector(
    (state) => state.editProfileInfo
  );

  const userInfo = useAppSelector((state) => state.userInfo);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      dispatch(setAllCountries(countries));
    };

    fetchCountries();
    dispatch(initializeFormData(userInfo));
  }, [dispatch, userInfo]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    try {
      await updateUserDetails(formData._id, formData);
      const updatedUserInfo = await getUserByEmail(formData.email);

      if (updatedUserInfo) {
        dispatch(setFormData(updatedUserInfo));
        dispatch(updateUserInfo(updatedUserInfo));
        toast.success("Info updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user information");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-5">
          <div className="form-control w-full">
            <label htmlFor="firstName" className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              disabled
              readOnly
              type="text"
              id="firstName"
              name="firstName"
              className="input input-bordered w-full"
              value={formData.firstName}
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="lastName" className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              disabled
              readOnly
              type="text"
              id="lastName"
              name="lastName"
              className="input input-bordered w-full"
              value={formData.lastName}
            />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            disabled
            readOnly
            type="email"
            id="email"
            name="email"
            className="input input-bordered"
            value={formData.email}
          />
        </div>
        <div className="form-control">
          <label htmlFor="phone" className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            required
            type="number"
            id="phone"
            name="phone"
            className="input input-bordered"
            value={formData.phone ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="country">
            <span className="label-text">Your Country</span>
          </label>
          <select
            required
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
        <div className="form-control">
          <label className="label" htmlFor="address">
            <span className="label-text">Your Full Address</span>
          </label>
          <input
            required
            type="text"
            id="address"
            name="address"
            className="input input-bordered"
            value={formData.address ?? ""}
            onChange={handleChange}
          />
        </div>
        {isLoading ? (
          <button disabled className="btn btn-primary no-animation w-full">
            <span className="loading loading-spinner"></span>
            Saving..
          </button>
        ) : (
          <button type="submit" className="btn btn-primary w-full">
            Save Checkout Information
          </button>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
