function doyToDate(doy, year = 2026) {
  // Jan 1 = DOY 1
  return new Date(Date.UTC(year, 0, doy));
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

export { doyToDate, formatDate, formatDateLong }