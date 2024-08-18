export const getCategories = async () => {
  return import("/database/json/category-list.json").then(
    (module) => module.default
  );
};
