import { ICountry, IUserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  formData: IUserInfo;
  allCountries: ICountry[];
  newExpertise: string;
  isLoading: boolean;
  education: {
    degree: string;
    institution: string;
    location: string;
    yearOfCompletion: string;
  };
  certifications: {
    title: string;
    issuer: string;
    dateOfIssue: string;
    url: string;
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
    yearOfCompletion: "",
  },
  certifications: {
    title: "",
    issuer: "",
    dateOfIssue: "",
    url: "",
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
    addEducation(state) {
      state.formData.education = [
        ...(state.formData.education || []),
        state.education,
      ];
      state.education = {
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
        title: "",
        issuer: "",
        dateOfIssue: "",
        url: "",
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
  addEducation,
  addCertification,
  addSkill,
  removeEducation,
  removeCertification,
  removeSkill,
} = profileInfoSlice.actions;

export default profileInfoSlice.reducer;
