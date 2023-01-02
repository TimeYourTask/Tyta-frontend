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

export {
  capitalize,
  formatName,
  formatDate,
};
