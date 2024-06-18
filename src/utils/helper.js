export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  };

  return date.toLocaleString("en-GB", options);
};
