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

export {
  capitalize,
  formatName,
};
