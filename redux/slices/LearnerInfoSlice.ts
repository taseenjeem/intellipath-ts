import { ILearnerInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILearnerInfo = {
  _id: "",
  name: "",
  username: "",
  gender: "",
  birthDate: "",
  country: "",
  email: "",
  phone: "",
  address: "",
  courses: [],
};

const learnerInfoSlice = createSlice({
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

export const { updateLearnerInfo, resetLearnerInfo } = learnerInfoSlice.actions;
export default learnerInfoSlice.reducer;
