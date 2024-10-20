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

export const getCourseBySlug = async (slug: string) => {
  const course = await import("@/database/json/top-courses.json").then(
    (module) => module.default
  );

  return course.find((c) => c.slug === slug);
};

export const getTestimonials = async () => {
  return import("@/database/json/testimonials.json").then(
    (module) => module.default
  );
};
