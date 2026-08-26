export const getDateAfter = (day: number) => {
  const max = new Date();
  max.setDate(max.getDate() + day);
  return max.toISOString().split("T")[0];
};

export const getDayFromString = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDay();
};
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};
export const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "م" : "ص";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${String(mins).padStart(2, "0")} ${period}`;
};
export const generateSlots = (
  from: string,
  to: string,
  duration: number,
  selectedDate?: string, // Pass the selected date
): { time: string; label: string }[] => {
  const slots: { time: string; label: string }[] = [];
  const [startHour, startMinute] = from.split(":").map(Number);
  const [endHour, endMinute] = to.split(":").map(Number);

  let currentMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  // Get current date and time
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentMinutesNow = now.getHours() * 60 + now.getMinutes();

  while (currentMinutes < endMinutes) {
    const hour = Math.floor(currentMinutes / 60);
    const minute = currentMinutes % 60;
    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    // If the selected date is today, skip slots that have already passed
    if (selectedDate === todayStr && currentMinutes <= currentMinutesNow) {
      currentMinutes += duration;
      continue;
    }

    slots.push({ time, label: formatTime(currentMinutes) });
    currentMinutes += duration;
  }

  return slots;
};
