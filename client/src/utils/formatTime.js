export function convertTo12HourFormat(time) {
  // Extracting hours, minutes, and seconds
  const [hours, minutes, seconds] = time.split(":").map(Number);

  // Determine AM or PM
  const meridiem = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  let formattedHours = hours % 12;
  formattedHours = formattedHours ? formattedHours : 12; // If 0, set it to 12

  // Format the time
  const formattedTime = `${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${meridiem}`;

  return formattedTime;
}
