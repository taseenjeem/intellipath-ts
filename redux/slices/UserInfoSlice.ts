import { IUserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserInfo = {
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
  role: "",
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

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<Partial<IUserInfo>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
