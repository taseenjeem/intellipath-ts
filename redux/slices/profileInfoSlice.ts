import { ICountry, IUserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  formData: IUserInfo;
  allCountries: ICountry[];
  newExpertise: string;
  isLoading: boolean;
  education: {
    _id?: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  certifications: {
    _id?: string;
    title: string;
    issuer: string;
    dateOfIssue: string;
    url: string;
  };
  experience: {
    _id?: string;
    companyName: string;
    designation: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  socialLinks: {
    linkedin: string | null;
    twitter: string | null;
    facebook: string | null;
    github: string | null;
    website: string | null;
  };
}

const initialState: ProfileState = {
  formData: {} as IUserInfo,
  allCountries: [],
  newExpertise: "",
  isLoading: false,
  education: {
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
  },
  certifications: {
    title: "",
    issuer: "",
    dateOfIssue: "",
    url: "",
  },
  experience: {
    companyName: "",
    designation: "",
    location: "",
    startDate: "",
    endDate: "",
  },
  socialLinks: {
    linkedin: null,
    twitter: null,
    facebook: null,
    github: null,
    website: null,
  },
};

const profileInfoSlice = createSlice({
  name: "profileInfo",
  initialState,
  reducers: {
    // Initializes the form data with user information
    initializeFormData(state, action: PayloadAction<IUserInfo>) {
      state.formData = action.payload;
    },
    // Updates the form data with the provided user info
    setFormData(state, action: PayloadAction<IUserInfo>) {
      state.formData = action.payload;
    },
    // Sets the list of countries in the state
    setAllCountries(state, action: PayloadAction<ICountry[]>) {
      state.allCountries = action.payload;
    },
    // Updates the new expertise field
    setNewExpertise(state, action: PayloadAction<string>) {
      state.newExpertise = action.payload;
    },
    // Toggles the loading state
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    // Updates the education field with new values
    setEducation(state, action: PayloadAction<ProfileState["education"]>) {
      state.education = action.payload;
    },
    // Updates the certification field with new values
    setCertifications(
      state,
      action: PayloadAction<ProfileState["certifications"]>
    ) {
      state.certifications = action.payload;
    },
    // Updates the experience field with new values
    setExperience(state, action: PayloadAction<ProfileState["experience"]>) {
      state.experience = action.payload;
    },
    // Adds a new education entry to the form data
    addEducation(state) {
      state.formData.education = [
        ...(state.formData.education || []), // Retain existing education entries
        state.education, // Add the new education entry
      ];
      // Reset the education field after adding
      state.education = {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
      };
    },
    // Adds a new certification entry to the form data
    addCertification(state) {
      state.formData.certifications = [
        ...(state.formData.certifications || []), // Retain existing certification entries
        state.certifications, // Add the new certification entry
      ];
      // Reset the certification field after adding
      state.certifications = {
        title: "",
        issuer: "",
        dateOfIssue: "",
        url: "",
      };
    },
    // Adds a new experience entry to the form data
    addExperience(state) {
      state.formData.experience = [
        ...(state.formData.experience || []), // Retain existing experience entries
        state.experience, // Add the new experience entry
      ];
      // Reset the experience field after adding
      state.experience = {
        companyName: "",
        designation: "",
        location: "",
        startDate: "",
        endDate: "",
      };
    },
    // Adds a new skill to the expertise list if it's not empty
    addSkill(state) {
      if (state.newExpertise.trim()) {
        state.formData.expertise = [
          ...(state.formData.expertise || []), // Retain existing expertise entries
          state.newExpertise.trim(), // Add the new expertise skill
        ];
        state.newExpertise = ""; // Reset new expertise field after adding
      }
    },
    // Removes an education entry based on the degree
    removeEducation(state, action: PayloadAction<string>) {
      state.formData.education = state.formData.education?.filter(
        (edu) => edu._id !== action.payload // Filter out the education entry with the specified degree
      );
    },
    // Removes a certification entry based on the title
    removeCertification(state, action: PayloadAction<string>) {
      state.formData.certifications = state.formData.certifications?.filter(
        (item) => item._id !== action.payload // Filter out the certification entry with the specified title
      );
    },
    // Removes an experience entry based on the company name
    removeExperience(state, action: PayloadAction<string>) {
      state.formData.experience = state.formData.experience?.filter(
        (item) => item._id !== action.payload // Filter out the experience entry with the specified company name
      );
    },
    // Removes a skill from the expertise list
    removeSkill(state, action: PayloadAction<string>) {
      state.formData.expertise = state.formData.expertise?.filter(
        (skill) => skill !== action.payload // Filter out the skill with the specified name
      );
    },
  },
});

// Exporting all actions for the profile slice
export const {
  initializeFormData,
  setFormData,
  setAllCountries,
  setNewExpertise,
  setIsLoading,
  setEducation,
  setCertifications,
  setExperience,
  addEducation,
  addCertification,
  addExperience,
  addSkill,
  removeEducation,
  removeCertification,
  removeExperience,
  removeSkill,
} = profileInfoSlice.actions;

// Exporting the reducer function for the profile slice
export default profileInfoSlice.reducer;
