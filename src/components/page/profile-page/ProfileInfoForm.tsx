"use client";
import { useEffect, useState } from "react";
import { ICountry, IUserInfo } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { getUserByEmail, updateUserDetails } from "@/database/server-actions";
import { toast } from "react-toastify";
import EditPersonalInfo from "./EditPersonalInfo";
import EditContactInfo from "./EditContactInfo";
import EditAcademicInfo from "./EditAcademicInfo";
import EditCertifications from "./EditCertifications";
import EditExpertise from "./EditExpertise";

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

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleRemoveEducation = (degree: string) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education?.filter((edu) => edu.degree !== degree),
    }));
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

  const handleCertificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCertifications((prevCertifications) => ({
      ...prevCertifications,
      [name]: value,
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
        <EditPersonalInfo formData={formData} handleChange={handleChange} />
        <EditContactInfo
          formData={formData}
          onChange={handleChange}
          allCountries={allCountries}
        />
        <EditAcademicInfo
          education={education}
          formData={formData}
          onAdd={handleAddEducation}
          onChange={handleEducationChange}
          onRemove={handleRemoveEducation}
        />
        <EditCertifications
          certifications={certifications}
          formData={formData}
          onAdd={handleAddCertification}
          onChange={handleCertificationChange}
          onRemove={handleRemoveCertification}
        />
        <EditExpertise
          formData={formData}
          onAdd={handleAddSkill}
          onRemove={handleRemoveSkill}
          newExpertise={newExpertise}
          setNewExpertise={setNewExpertise}
        />

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
