const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const formatName = (user) => {
  let name = '';
  if (user.firstName) name += `${capitalize(user.firstName)} `;
  if (user.lastName) name += `${capitalize(user.lastName)} `;

  if (user.firstName || user.lastName) {
    name += `(${user.email})`;
  } else name += user.email;

  return name;
};

const normalizeTime = (num) => num.toString().padStart(2, '0');

const convertMsToTime = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  return `${normalizeTime(hours)}:${normalizeTime(minutes)}:${normalizeTime(
    seconds
  )}`;
};

export {
  capitalize,
  formatName,
  convertMsToTime,
};
