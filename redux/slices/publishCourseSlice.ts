import { createSlice } from "@reduxjs/toolkit";

interface publishCourse {
  title: string;
  slug: string;
  category: string;
  price: number;
  discount: number;
  language: string;
  duration: number;
  requirements: string;
  level: string;
  lessons: [{ title: string; url: string }];
  short_description: string;
  full_description: string;
}

const initialState: publishCourse = {
  title: "",
  slug: "",
  category: "",
  price: 0,
  discount: 0,
  language: "",
  duration: 0,
  requirements: "",
  level: "",
  lessons: [{ title: "", url: "" }],
  short_description: "",
  full_description: "",
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
    updateCategory: (state, action) => {
      state.category = action.payload;
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
    resetPublishCourseForm: (state) => {
      return (state = initialState);
    },
  },
});

export const {
  updateTitle,
  updateSlug,
  updateCategory,
  updatePrice,
  updateDiscount,
  updateLanguage,
  updateDuration,
  updateRequirements,
  updateLevel,
  updateShortDescription,
  updateFullDescription,
  resetPublishCourseForm,
} = publishCourseSlice.actions;

export default publishCourseSlice.reducer;
