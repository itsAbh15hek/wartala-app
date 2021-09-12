export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');
  let initials = '';
  splitName.forEach(el => {
    initials += el[0];
  });
  return initials;
}
