import { Children } from 'react'
import { Text } from 'theme-ui'

export const getDate = (timestamp) => {
  const date = new Date(timestamp)
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (t) => parts.find(p => p.type === t).value
  return `${get("year")}-${get("month")}-${get("day")}`
}

export const getTime = (timestamp) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

export const getLongDate = (timestamp) => {
  const date = new Date(timestamp)
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).formatToParts(date);

  const get = (t) => parts.find(p => p.type === t).value;

  const day = Number(get("day"));

  function ordinal(n) {
    if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  }

  return `${get("weekday")} ${get("month")} ${ordinal(day)}`;
}

export const sortEvents = (events) => {
  return events.sort((a, b) => {
    const tA = new Date(a.start_time).getTime();
    const tB = new Date(b.start_time).getTime();

    if (tA !== tB) {
      return tA - tB; // earlier first
    }

    return a.location_name.localeCompare(b.location_name);
  });
}