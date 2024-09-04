import { ILearnerInfo, IInstructorInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialLearnerState: ILearnerInfo = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  profileImageUrl: "",
  gender: null,
  birthDate: null,
  country: null,
  email: "",
  phone: null,
  address: null,
  role: "learner",
  courses: [],
  createdAt: null,
  updatedAt: null,
};

const initialInstructorState: IInstructorInfo = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  profileImageUrl: null,
  gender: null,
  birthDate: null,
  country: null,
  email: "",
  phone: null,
  address: null,
  role: "instructor",
  expertise: [],
  courses: [],
  biography: null,
  education: [],
  teachingExperience: null,
  certifications: [],
  socialLinks: {
    linkedin: "",
    twitter: "",
    website: "",
  },
  createdAt: null,
  updatedAt: null,
};

type UserInfoState = ILearnerInfo | IInstructorInfo;

const initialState: UserInfoState = initialLearnerState;

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<Partial<UserInfoState>>) => {
      return { ...state, ...action.payload };
    },
    resetUserInfo: (state, action: PayloadAction<{ role: string }>) => {
      return action.payload.role === "learner"
        ? initialLearnerState
        : initialInstructorState;
    },
  },
});

export const { updateUserInfo, resetUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
