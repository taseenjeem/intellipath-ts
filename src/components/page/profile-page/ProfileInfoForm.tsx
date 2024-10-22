"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  checkUsernameAvailability,
  getCountries,
  getUserByEmail,
  updateUserDetails,
} from "@/database/server-actions";
import { toast } from "react-toastify";
import {
  initializeFormData,
  setAllCountries,
  setIsLoading,
  setFormData,
  setNewExpertise,
  setEducation,
  setCertifications,
  addEducation,
  addCertification,
  addSkill,
  removeEducation,
  removeCertification,
  removeSkill,
  addExperience,
  removeExperience,
  setExperience,
} from "@/redux/slices/profileInfoSlice";
import EditPersonalInfo from "./EditPersonalInfo";
import EditContactInfo from "./EditContactInfo";
import EditAcademicInfo from "./EditAcademicInfo";
import EditCertifications from "./EditCertifications";
import EditExpertise from "./EditExpertise";
import EditExperience from "./EditExperience";
import EditSocialLinks from "./EditSocialLinks";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { IUserInfo } from "@/types";

const ProfileInfoForm = () => {
  const dispatch = useAppDispatch();
  const {
    formData,
    allCountries,
    newExpertise,
    isLoading,
    education,
    certifications,
    experience,
  } = useAppSelector((state) => state.editProfileInfo);

  const userInfo = useAppSelector((state) => state.userInfo);

  const [initialFormData, setInitialFormData] = useState<IUserInfo | null>(
    null
  );
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      dispatch(setAllCountries(countries));
    };

    fetchCountries();
    dispatch(initializeFormData(userInfo));
    setInitialFormData(userInfo);
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      setIsFormChanged(true);
    } else {
      setIsFormChanged(false);
    }
  }, [formData, initialFormData]);

  const handleAddEducation = () => {
    const { degree, institution, location, startDate, endDate } = education;

    if (
      degree === "" ||
      institution === "" ||
      location === "" ||
      startDate === "" ||
      endDate === ""
    ) {
      toast.error("Please fill in all required fields for education.");
      return;
    } else {
      dispatch(addEducation());
    }
  };

  const handleAddCertification = () => {
    const { issuer, dateOfIssue, title, url } = certifications;

    if (issuer === "" || dateOfIssue === "" || title === "" || url === "") {
      toast.error("Please fill in all required fields for certification.");
      return;
    } else {
      dispatch(addCertification());
    }
  };

  const handleAddExperience = () => {
    const { companyName, designation, location, startDate, endDate } =
      experience;

    if (
      companyName === "" ||
      designation === "" ||
      location === "" ||
      startDate === "" ||
      endDate === ""
    ) {
      toast.error("Please fill in all required fields for experience.");
      return;
    } else {
      dispatch(addExperience());
    }
  };

  const handleAddExpertise = (newExpertise: string) => {
    const alreadyExisted = formData.expertise?.find(
      (item) => item.toLowerCase() === newExpertise.toLowerCase()
    );

    if (alreadyExisted) {
      toast.warning("Skill already exists.");
      return;
    } else {
      dispatch(addSkill());
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (formData?.socialLinks && name in formData.socialLinks) {
      dispatch(
        setFormData({
          ...formData,
          socialLinks: {
            ...formData.socialLinks,
            [name]: value,
          },
        })
      );
    } else {
      dispatch(setFormData({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    try {
      const isUsernameTaken = await checkUsernameAvailability(
        formData.username
      );

      if (isUsernameTaken && userInfo.username !== formData.username) {
        toast.warning("Username is already taken. Please choose another one.");
        dispatch(setIsLoading(false));
        return;
      }

      await updateUserDetails(formData._id, formData);
      const updatedUserInfo = await getUserByEmail(formData.email);

      if (updatedUserInfo) {
        dispatch(setFormData(updatedUserInfo));
        dispatch(updateUserInfo(updatedUserInfo));
        toast.success("User updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user information");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="bg-base-200 p-4 md:p-6 mt-5 rounded-3xl">
      <form onSubmit={handleSubmit} className="">
        <EditPersonalInfo
          profileImageUrl={formData?.profileImageUrl}
          userEmail={formData?.email}
          userId={formData?._id}
          formData={formData}
          handleChange={handleChange}
        />
        <EditContactInfo
          formData={formData}
          onChange={handleChange}
          allCountries={allCountries}
        />
        <EditAcademicInfo
          education={education}
          formData={formData}
          onAdd={handleAddEducation}
          onRemove={(_id) => dispatch(removeEducation(_id))}
          onChange={(e) =>
            dispatch(
              setEducation({ ...education, [e.target.name]: e.target.value })
            )
          }
        />
        <EditCertifications
          certifications={certifications}
          formData={formData}
          onAdd={handleAddCertification}
          onRemove={(_id) => dispatch(removeCertification(_id))}
          onChange={(e) =>
            dispatch(
              setCertifications({
                ...certifications,
                [e.target.name]: e.target.value,
              })
            )
          }
        />
        {formData.role === "instructor" && (
          <EditExperience
            formData={formData}
            experience={experience}
            onAdd={handleAddExperience}
            onRemove={(_id) => dispatch(removeExperience(_id))}
            onChange={(e) =>
              dispatch(
                setExperience({
                  ...experience,
                  [e.target.name]: e.target.value,
                })
              )
            }
          />
        )}
        <EditExpertise
          formData={formData}
          onAdd={handleAddExpertise}
          onRemove={(skill) => dispatch(removeSkill(skill))}
          newExpertise={newExpertise}
          setNewExpertise={(value) => dispatch(setNewExpertise(value))}
        />

        <EditSocialLinks formData={formData} onChange={handleChange} />

        <div className="card-actions justify-end mt-5">
          {isLoading ? (
            <button
              disabled
              className="btn btn-primary no-animation max-w-96 w-full"
            >
              <span className="loading loading-spinner"></span>
              Saving..
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary max-w-96 w-full"
              disabled={!isFormChanged}
            >
              Save Information
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
