import { IPublishCourse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IPublishCourse = {
  title: null,
  slug: null,
  instructor: null,
  category: null,
  thumbnail: null,
  price: null,
  discount: null,
  language: null,
  duration: null,
  requirements: null,
  level: null,
  lessons: [],
  short_description: null,
  full_description: null,
};

const publishCourseSlice = createSlice({
  name: "publishCourse",
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateSlug: (state, action) => {
      state.slug = action.payload;
    },
    updateInstructor: (state, action) => {
      state.instructor = action.payload;
    },
    updateCategory: (state, action) => {
      state.category = action.payload;
    },
    updateThumbnail: (state, action) => {
      state.thumbnail = action.payload;
    },
    updatePrice: (state, action) => {
      state.price = action.payload;
    },
    updateDiscount: (state, action) => {
      state.discount = action.payload;
    },
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
    updateDuration: (state, action) => {
      state.duration = action.payload;
    },
    updateRequirements: (state, action) => {
      state.requirements = action.payload;
    },
    updateLevel: (state, action) => {
      state.level = action.payload;
    },
    updateShortDescription: (state, action) => {
      state.short_description = action.payload;
    },
    updateFullDescription: (state, action) => {
      state.full_description = action.payload;
    },
    addLesson: (state, action) => {
      state.lessons.push(action.payload);
    },
    removeLesson: (state, action) => {
      state.lessons = state.lessons.filter(
        (lesson) => lesson.title !== action.payload
      );
    },
    resetPublishCourseForm: (state) => {
      return (state = initialState);
    },
  },
});

export const {
  updateTitle,
  updateSlug,
  updateInstructor,
  updateCategory,
  updateThumbnail,
  updatePrice,
  updateDiscount,
  updateLanguage,
  updateDuration,
  updateRequirements,
  updateLevel,
  updateShortDescription,
  updateFullDescription,
  addLesson,
  removeLesson,
  resetPublishCourseForm,
} = publishCourseSlice.actions;

export default publishCourseSlice.reducer;
