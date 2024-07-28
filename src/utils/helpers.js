import { formatDistance, parseISO, differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const binarySearch = (arr, predicate) => {
  if (!arr.length) {
    return 0;
  }
  let low = 0;
  let high = arr.length;
  while (low < high) {
    const half = Math.ceil((low + high) / 2) - 1;
    switch (predicate(arr[half])) {
      case 0:
        return half;
      case 1:
        low = half + 1;
        break;
      case -1:
        high = half - 1;
        break;
      default:
        throw new Error("invalid returned value. Accepted values: -1, 0, 1");
    }
  }
  return high;
};
