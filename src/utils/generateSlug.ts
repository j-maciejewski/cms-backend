export default (text: string = '') => {
  return encodeURI(text.toLocaleLowerCase().replace(/\s+/g, '-'));
};
