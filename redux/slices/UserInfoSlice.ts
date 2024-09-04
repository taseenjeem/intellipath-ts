import { ILearnerInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILearnerInfo = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  profileImageUrl: "",
  gender: "",
  birthDate: "",
  country: "",
  email: "",
  phone: "",
  address: "",
  role: "",
  courses: [],
  createdAt: null,
  updatedAt: null,
};

const userInfoSlice = createSlice({
  name: "learnerInfo",
  initialState,
  reducers: {
    updateLearnerInfo: (
      state,
      action: PayloadAction<Partial<ILearnerInfo>>
    ) => {
      return { ...state, ...action.payload };
    },
    resetLearnerInfo: () => initialState,
  },
});

export const { updateLearnerInfo, resetLearnerInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
