function doyToDate(doy, year = 2026) {
  // Jan 1 = DOY 1
  return new Date(Date.UTC(year, 0, doy));
}

function doyToString(doy, year = 2026) {
  const date = new Date(year, 0); // Jan 1
  date.setDate(doy);              // add day-of-year
  return date.toISOString().slice(0, 10);
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  })
}

function formatDateLong(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  })
}

export { doyToDate, doyToString, formatDate, formatDateLong }