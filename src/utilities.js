export const convertTo12HourFormat = (time24) => {
  // Parse hours and minutes from the 24-hour time string
  const [hours, minutes] = time24.split(':').map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const hours12 = (hours % 12) || 12;

  // Format the time in 12-hour format with AM/PM
  const time12 = `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

  return time12;
}

export const convertDateFormat = (dateString) => {
  // Split the date string into year, month, and day
  const [year, month, day] = dateString.split('-');

  // Rearrange the components in the desired format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
