const format = 'application/xml';

const DOMParserInst = new DOMParser();

export default (text) => {
  const obj = DOMParserInst.parseFromString(text, format);

  return obj;
};
