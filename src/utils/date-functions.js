export const timeConverter = (t) => {
  const newDate = new Date(t * 1000);
  const date = newDate.getDate();
  const time = newDate.toLocaleTimeString("default");
  return date + ", " + time;
};

export const weekDay = (t) => {
  const newDate = new Date(t * 1000);
  const weekday = newDate.toLocaleString("en-us", {
    weekday: "long",
  });
  return weekday;
};

export const getWeekDayAndTime = (t) => {
  return weekDay(t) + " " + timeConverter(t);
};
