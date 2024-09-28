"use client";
import { useEffect, useState } from "react";
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
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { IUserInfo } from "@/types";

// Function to fetch country data from a JSON file
const getCountries = async () => {
  return import("@/database/json/countries.json").then(
    (module) => module.default
  );
};

const ProfileInfoForm = () => {
  const dispatch = useAppDispatch(); // Hook to dispatch actions to Redux
  const {
    formData,
    allCountries,
    newExpertise,
    isLoading,
    education,
    certifications,
    experience,
  } = useAppSelector((state) => state.editProfileInfo); // Selecting relevant state from Redux

  const userInfo = useAppSelector((state) => state.userInfo); // Selecting user info from Redux

  const [initialFormData, setInitialFormData] = useState<IUserInfo | null>(
    null
  ); // Local state for initial form data
  const [isFormChanged, setIsFormChanged] = useState(false); // Local state to track if form data has changed

  // Effect to fetch countries and initialize form data on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries(); // Fetching countries
      dispatch(setAllCountries(countries)); // Storing countries in Redux state
    };

    fetchCountries();
    dispatch(initializeFormData(userInfo)); // Initializing form data with user info
    setInitialFormData(userInfo); // Setting initial form data state
  }, [dispatch, userInfo]);

  // Effect to compare current form data with initial data to check for changes
  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      setIsFormChanged(true); // Mark form as changed
    } else {
      setIsFormChanged(false); // Mark form as not changed
    }
  }, [formData, initialFormData]);

  // Handler to add education
  const handleAddEducation = () => {
    const { degree, institution, location, startDate, endDate } = education;

    // Validation check for required fields
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
      dispatch(addEducation()); // Dispatching action to add education
    }
  };

  // Handler to add certification
  const handleAddCertification = () => {
    const { issuer, dateOfIssue, title, url } = certifications;

    // Validation check for required fields
    if (issuer === "" || dateOfIssue === "" || title === "" || url === "") {
      toast.error("Please fill in all required fields for certification.");
      return;
    } else {
      dispatch(addCertification()); // Dispatching action to add certification
    }
  };

  // Handler to add work experience
  const handleAddExperience = () => {
    const { companyName, designation, location, startDate, endDate } =
      experience;

    // Validation check for required fields
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
      dispatch(addExperience()); // Dispatching action to add experience
    }
  };

  // Handler to add expertise/skills
  const handleAddExpertise = (newExpertise: string) => {
    // Checking if skill already exists
    const alreadyExisted = formData.expertise?.find(
      (item) => item.toLowerCase === newExpertise.toLowerCase
    );

    if (alreadyExisted) {
      toast.warning("Skill already exists.");
      return;
    } else {
      dispatch(addSkill()); // Dispatching action to add skill
    }
  };

  // Handler for input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target; // Destructuring name and value from the event target

    // Checking if the changed input is a social link
    if (formData?.socialLinks && name in formData.socialLinks) {
      dispatch(
        setFormData({
          ...formData,
          socialLinks: {
            ...formData.socialLinks,
            [name]: value, // Updating the specific social link
          },
        })
      );
    } else {
      dispatch(setFormData({ ...formData, [name]: value })); // Updating other form fields
    }
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    try {
      // Checking if the username is available
      const isUsernameTaken = await checkUsernameAvailability(
        formData.username
      );

      // Conditional warning if username is taken
      if (isUsernameTaken && userInfo.username !== formData.username) {
        toast.warning("Username is already taken. Please choose another one.");
        dispatch(setIsLoading(false));
        return;
      }

      await updateUserDetails(formData._id, formData); // Updating user details in the database
      const updatedUserInfo = await getUserByEmail(formData.email); // Fetching updated user info

      // Updating Redux state with new user info
      if (updatedUserInfo) {
        dispatch(setFormData(updatedUserInfo));
        dispatch(updateUserInfo(updatedUserInfo));
        toast.success("User updated successfully");
      }
    } catch (error) {
      console.log(error); // Logging error
      toast.error("Failed to update user information"); // Error toast
    } finally {
      dispatch(setIsLoading(false)); // Resetting loading state
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
          onRemove={(_id) => dispatch(removeEducation(_id))} // Dispatching action to remove education
          onChange={(e) =>
            dispatch(
              setEducation({ ...education, [e.target.name]: e.target.value }) // Updating education fields
            )
          }
        />
        <EditCertifications
          certifications={certifications}
          formData={formData}
          onAdd={handleAddCertification}
          onRemove={(_id) => dispatch(removeCertification(_id))} // Dispatching action to remove certification
          onChange={(e) =>
            dispatch(
              setCertifications({
                ...certifications,
                [e.target.name]: e.target.value, // Updating certification fields
              })
            )
          }
        />
        {formData.role === "instructor" && ( // Conditional rendering based on user role
          <EditExperience
            formData={formData}
            experience={experience}
            onAdd={handleAddExperience}
            onRemove={(_id) => dispatch(removeExperience(_id))} // Dispatching action to remove experience
            onChange={(e) =>
              dispatch(
                setExperience({
                  ...experience,
                  [e.target.name]: e.target.value, // Updating experience fields
                })
              )
            }
          />
        )}
        <EditExpertise
          formData={formData}
          onAdd={handleAddExpertise}
          onRemove={(skill) => dispatch(removeSkill(skill))} // Dispatching action to remove skill
          newExpertise={newExpertise}
          setNewExpertise={(value) => dispatch(setNewExpertise(value))} // Dispatching action to set new expertise
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
