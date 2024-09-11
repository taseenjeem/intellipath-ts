"use client";
import { useEffect, useState } from "react";
import { ICountry, IUserInfo } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { getUserByEmail, updateUserDetails } from "@/database/server-actions";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import EditPersonalInfo from "./EditPersonalInfo";
import EditContactInfo from "./EditContactInfo";
import EditAcademicInfo from "./EditAcademicInfo";
import EditCertifications from "./EditCertifications";

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
  const [education, setEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    yearOfCompletion: "",
  });
  const [certifications, setCertifications] = useState({
    title: "",
    issuer: "",
    dateOfIssue: "",
    url: "",
  });

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

  const handleAddEducation = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: [...(prevFormData.education ?? []), education],
    }));

    setEducation({
      degree: "",
      institution: "",
      location: "",
      yearOfCompletion: "",
    });
  };

  const handleAddCertification = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      certifications: [...(prevFormData.certifications ?? []), certifications],
    }));

    setCertifications({
      title: "",
      issuer: "",
      dateOfIssue: "",
      url: "",
    });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleCertificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCertifications((prevCertifications) => ({
      ...prevCertifications,
      [name]: value,
    }));
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prevData) => ({
      ...prevData,
      expertise: prevData.expertise?.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleRemoveEducation = (degree: string) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education?.filter((edu) => edu.degree !== degree),
    }));
  };

  const handleRemoveCertification = (title: string) => {
    setFormData((prevData) => ({
      ...prevData,
      certifications: prevData.certifications?.filter(
        (item) => item.title !== title
      ),
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
          <EditPersonalInfo formData={formData} handleChange={handleChange} />
          <EditContactInfo
            formData={formData}
            handleChange={handleChange}
            allCountries={allCountries}
          />
          <EditAcademicInfo
            education={education}
            formData={formData}
            handleAddEducation={handleAddEducation}
            handleEducationChange={handleEducationChange}
            handleRemoveEducation={handleRemoveEducation}
          />
          <EditCertifications
            certifications={certifications}
            formData={formData}
            handleAddCertification={handleAddCertification}
            handleCertificationChange={handleCertificationChange}
            handleRemoveCertification={handleRemoveCertification}
          />
          <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mt-16 mb-5">
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
