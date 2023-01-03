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

const formatDate = (date) => `${(`0${date.getUTCDate()}`).slice(-2)}/${(`0${date.getUTCMonth() + 1}`).slice(-2)}/${date.getUTCFullYear()} ${(`0${date.getUTCHours()}`).slice(-2)}:${(`0${date.getUTCMinutes()}`).slice(-2)}:${(`0${date.getUTCSeconds()}`).slice(-2)}`;

function timeDifference(date1, date2) {
  const diff = Math.abs(date1 - date2);
  const secs = Math.floor(diff / 1000);

  const hours = Math.floor(secs / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const remainingSecs = secs % 60;

  return `${hours}h ${mins}m ${remainingSecs}s`;
}

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
  formatDate,
  timeDifference,
  convertMsToTime,
};
