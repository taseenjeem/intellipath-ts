import { IUserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserInfo = {
  status: false,
  _id: "",
  firstName: "",
  lastName: "",
  fullName: "",
  username: "",
  password: "",
  email: "",
  authenticationMethod: "",
  profileImageUrl: null,
  gender: null,
  birthDate: null,
  country: null,
  phone: null,
  address: null,
  role: "",
  expertise: [],
  courses: [],
  biography: null,
  education: [],
  teachingExperience: {
    details: [],
    totalExperience: 0,
  },
  certifications: [],
  socialLinks: {
    linkedin: "",
    twitter: "",
    website: "",
  },
  createdAt: null,
  updatedAt: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<Partial<IUserInfo>>) => {
      return { ...state, ...action.payload, status: true };
    },
    resetUserInfo: () => initialState,
  },
});

export const { updateUserInfo, resetUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
