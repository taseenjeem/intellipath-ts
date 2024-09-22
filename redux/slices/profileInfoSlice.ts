import { ICountry, IUserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  formData: IUserInfo;
  allCountries: ICountry[];
  newExpertise: string;
  isLoading: boolean;
  education: {
    _id: string;
    degree: string;
    institution: string;
    location: string;
    yearOfCompletion: string;
  };
  certifications: {
    _id: string;
    title: string;
    issuer: string;
    dateOfIssue: string;
    url: string;
  };
  experience: {
    _id: string;
    companyName: string;
    designation: string;
    location: string;
    period: string;
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
    _id: "",
    degree: "",
    institution: "",
    location: "",
    yearOfCompletion: "",
  },
  certifications: {
    _id: "",
    title: "",
    issuer: "",
    dateOfIssue: "",
    url: "",
  },
  experience: {
    _id: "",
    companyName: "",
    designation: "",
    location: "",
    period: "",
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
    initializeFormData(state, action: PayloadAction<IUserInfo>) {
      state.formData = action.payload;
    },
    setFormData(state, action: PayloadAction<IUserInfo>) {
      state.formData = action.payload;
    },
    setAllCountries(state, action: PayloadAction<ICountry[]>) {
      state.allCountries = action.payload;
    },
    setNewExpertise(state, action: PayloadAction<string>) {
      state.newExpertise = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setEducation(state, action: PayloadAction<ProfileState["education"]>) {
      state.education = action.payload;
    },
    setCertifications(
      state,
      action: PayloadAction<ProfileState["certifications"]>
    ) {
      state.certifications = action.payload;
    },
    setExperience(state, action: PayloadAction<ProfileState["experience"]>) {
      state.experience = action.payload;
    },
    addEducation(state) {
      state.formData.education = [
        ...(state.formData.education || []),
        state.education,
      ];
      state.education = {
        _id: "",
        degree: "",
        institution: "",
        location: "",
        yearOfCompletion: "",
      };
    },
    addCertification(state) {
      state.formData.certifications = [
        ...(state.formData.certifications || []),
        state.certifications,
      ];
      state.certifications = {
        _id: "",
        title: "",
        issuer: "",
        dateOfIssue: "",
        url: "",
      };
    },
    addExperience(state) {
      state.formData.experience = [
        ...(state.formData.experience || []),
        state.experience,
      ];
      state.experience = {
        _id: "",
        companyName: "",
        designation: "",
        location: "",
        period: "",
      };
    },
    addSkill(state) {
      if (state.newExpertise.trim()) {
        state.formData.expertise = [
          ...(state.formData.expertise || []),
          state.newExpertise.trim(),
        ];
        state.newExpertise = "";
      }
    },
    removeEducation(state, action: PayloadAction<string>) {
      state.formData.education = state.formData.education?.filter(
        (edu) => edu.degree !== action.payload
      );
    },
    removeCertification(state, action: PayloadAction<string>) {
      state.formData.certifications = state.formData.certifications?.filter(
        (item) => item.title !== action.payload
      );
    },
    removeExperience(state, action: PayloadAction<string>) {
      state.formData.experience = state.formData.experience?.filter(
        (item) => item.companyName !== action.payload
      );
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.formData.expertise = state.formData.expertise?.filter(
        (skill) => skill !== action.payload
      );
    },
  },
});

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

export default profileInfoSlice.reducer;
