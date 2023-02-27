export const sanitizeName = name => {
  /*
   convert to lowercase and remove spaces, + and brackets
  */
  return name.toLowerCase().replace(/[+ )(]/g, '');
};
