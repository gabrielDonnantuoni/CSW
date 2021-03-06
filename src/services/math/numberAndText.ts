const E10 = 10;
const NEGATIVE_MULTIPLIER = -1;
const POSITIVE_MULTIPLIER = 1;

const formatByLanguage = (num: string, language: string) => {
  const arrOfNum = num.split(',');

  if (arrOfNum.length === 1) {
    if (arrOfNum[0] === '') return '';
    if (arrOfNum[0] === '-') return '-';
    return parseInt(arrOfNum[0], 10).toLocaleString(language);
  }

  // const arrOfNumParsed = arrOfNum.map((value) => {
  //   if (value.length < 1) return '';
  //   return value;
  // });
  let integer = arrOfNum[0];
  const decimal = arrOfNum[1];
  if (!integer || integer !== '-') {
    integer = parseInt(integer, 10).toLocaleString(language);
  }

  return `${integer},${decimal}`;
};

const removeNonNumeric = (num: string) => num.replace(/[^0-9,-]/g, '');

export const formatInputNumber = (num: string, language: string) => {
  const justNumeric = removeNonNumeric(num);
  return formatByLanguage(justNumeric, language);
};

export const toNumericValue = (str: string) => {
  const arrOfNum = removeNonNumeric(str).split(',');

  if (arrOfNum.length === 1) {
    if (arrOfNum[0] === '') return 0;
    return parseInt(arrOfNum[0], 10);
  }

  const arrOfNumParsed = arrOfNum.map((value) => {
    if (value.length < 1) return [0, 0];
    if (/-\d*/g.test(value)) {
      const valueWithoutDash = value.replace('-', '0');
      return [parseInt(valueWithoutDash, 10) * NEGATIVE_MULTIPLIER,
        valueWithoutDash.length];
    }
    return [parseInt(value, 10), value.length];
  });
  const integer = arrOfNumParsed[0][0];
  const decimal = arrOfNumParsed[1][0];
  const nToDivide = E10 ** arrOfNumParsed[1][1];
  const isNegative = integer < 0 ? NEGATIVE_MULTIPLIER : POSITIVE_MULTIPLIER;
  return integer + (decimal / nToDivide) * isNegative;
};
