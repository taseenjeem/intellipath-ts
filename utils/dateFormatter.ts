export const formatDate = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
};

export function formatDateInFullForm(dateInput: string | Date): string {
  let date: Date;

  if (typeof dateInput === "string") {
    date = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    throw new Error("Invalid date input");
  }

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };

  return date.toLocaleString("en-US", options);
}
