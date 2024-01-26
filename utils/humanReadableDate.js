const humanReadableDate = (date) => {
  const originalDate = new Date(date);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  // Convert the date to a human-readable format with Indian time zone
  const formatter = new Intl.DateTimeFormat("en-IN", options);
  const formattedDate = formatter.format(originalDate);

  return formattedDate;
};

module.exports = {
  humanReadableDate,
};
