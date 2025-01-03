import { ICourse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  courseData: {} as ICourse,
};

const editCourseSlice = createSlice({
  name: "editCourse",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    initializeCourseData(state, action: PayloadAction<ICourse>) {
      state.courseData = action.payload;
    },

    editThumbnail(state, action: PayloadAction<string>) {
      state.courseData.thumbnail = action.payload;
    },

    editTitle(state, action: PayloadAction<string>) {
      state.courseData.title = action.payload;
    },

    editCategory(state, action: PayloadAction<string>) {
      state.courseData.category = action.payload;
    },

    editPrice(state, action: PayloadAction<number>) {
      state.courseData.price = action.payload;
    },

    editDiscount(state, action: PayloadAction<number | null>) {
      state.courseData.discount = action.payload;
    },

    editLanguage(state, action: PayloadAction<string>) {
      state.courseData.language = action.payload;
    },

    editDuration(state, action: PayloadAction<number>) {
      state.courseData.duration = action.payload;
    },

    editRequirements(state, action: PayloadAction<string>) {
      state.courseData.requirements = action.payload;
    },

    editLevel(state, action: PayloadAction<string>) {
      state.courseData.level = action.payload;
    },

    addNewCoupon(state, action) {
      state.courseData.coupons?.push(action.payload);
    },

    removeCoupon(state, action: PayloadAction<string>) {
      const allCoupons = state.courseData.coupons;
      const existingCoupons = allCoupons?.filter((item) =>
        item._id ? item._id : item.code !== action.payload
      );
      state.courseData.coupons = existingCoupons;
    },

    addNewLesson(state, action) {
      state.courseData.lessons.push(action.payload);
    },

    removeLesson(state, action: PayloadAction<string | undefined>) {
      const allLessons = state.courseData.lessons;
      const existingLessons = allLessons?.filter(
        (item) => item._id !== action.payload
      );
      state.courseData.lessons = existingLessons;
    },

    editLessonTitle(state, action) {
      const lessonIndex = state.courseData.lessons.findIndex(
        (lesson) => lesson._id === action.payload.lessonId
      );
      if (lessonIndex !== -1) {
        state.courseData.lessons[lessonIndex].title = action.payload.newTitle;
      }
    },

    editLessonURL(state, action) {
      const lessonIndex = state.courseData.lessons.findIndex(
        (lesson) => lesson._id === action.payload.lessonId
      );
      if (lessonIndex !== -1) {
        state.courseData.lessons[lessonIndex].url = action.payload.newURL;
      }
    },

    editShortDescription(state, action: PayloadAction<string>) {
      state.courseData.short_description = action.payload;
    },

    editFullDescription(state, action: PayloadAction<string>) {
      state.courseData.full_description = action.payload;
    },
  },
});

export const {
  setIsLoading,
  initializeCourseData,
  editThumbnail,
  editTitle,
  editCategory,
  editPrice,
  editDiscount,
  editLanguage,
  editDuration,
  editRequirements,
  editLevel,
  addNewCoupon,
  removeCoupon,
  addNewLesson,
  removeLesson,
  editLessonTitle,
  editLessonURL,
  editShortDescription,
  editFullDescription,
} = editCourseSlice.actions;

export default editCourseSlice.reducer;
