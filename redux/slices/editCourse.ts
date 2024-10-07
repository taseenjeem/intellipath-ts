import { ICourse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  courseData: {} as ICourse,
};

const editCourseSlice = createSlice({
  name: "editCourse",
  initialState,
  reducers: {
    initializeCourseData(state, action: PayloadAction<ICourse>) {
      state.courseData = action.payload;
    },
  },
});

export const { initializeCourseData } = editCourseSlice.actions;

export default editCourseSlice.reducer;
