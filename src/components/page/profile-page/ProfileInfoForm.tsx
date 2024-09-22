"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  checkUsernameAvailability,
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

const getCountries = async () => {
  return import("@/database/json/countries.json").then(
    (module) => module.default
  );
};

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

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      dispatch(setAllCountries(countries));
    };

    fetchCountries();
    dispatch(initializeFormData(userInfo));
  }, [dispatch, userInfo]);

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

  const handleAddExpertise = () => {
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
    <div className="bg-base-200 p-3 md:p-6 mt-5 rounded-3xl">
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mb-5">
        Personal information
      </h3>
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
          onChange={(e) =>
            dispatch(
              setEducation({ ...education, [e.target.name]: e.target.value })
            )
          }
          onRemove={(degree) => dispatch(removeEducation(degree))}
        />

        <EditCertifications
          certifications={certifications}
          formData={formData}
          onAdd={handleAddCertification}
          onChange={(e) =>
            dispatch(
              setCertifications({
                ...certifications,
                [e.target.name]: e.target.value,
              })
            )
          }
          onRemove={(title) => dispatch(removeCertification(title))}
        />

        {formData.role === "instructor" && (
          <EditExperience
            formData={formData}
            experience={experience}
            onAdd={handleAddExpertise}
            onRemove={(companyName) => dispatch(removeExperience(companyName))}
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
          onAdd={() => dispatch(addSkill())}
          onRemove={(skill) => dispatch(removeSkill(skill))}
          newExpertise={newExpertise}
          setNewExpertise={(value) => dispatch(setNewExpertise(value))}
        />

        <EditSocialLinks formData={formData} onChange={handleChange} />

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
