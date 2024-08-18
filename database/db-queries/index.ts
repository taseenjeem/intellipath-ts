export const getCategories = async () => {
  return import("@/database/json/category-list.json").then(
    (module) => module.default
  );
};

export const getTopCourses = async () => {
  return import("@/database/json/top-courses.json").then(
    (module) => module.default
  );
};
