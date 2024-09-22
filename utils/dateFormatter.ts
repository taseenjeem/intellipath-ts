export const formatDate = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
};
