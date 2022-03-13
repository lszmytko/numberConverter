const data = {
  digits: [
    { digits: 0, digitsConverted: "zero" },
    { digits: 1, digitsConverted: "one" },
    { digits: 2, digitsConverted: "two" },
    { digits: 3, digitsConverted: "three" },
    { digits: 4, digitsConverted: "four" },
    { digits: 5, digitsConverted: "five" },
    { digits: 6, digitsConverted: "six" },
    { digits: 7, digitsConverted: "seven" },
    { digits: 8, digitsConverted: "eight" },
    { digits: 9, digitsConverted: "nine" },
    { digits: 10, digitsConverted: "ten" },
    { digits: 11, digitsConverted: "eleven" },
    { digits: 12, digitsConverted: "twelve" },
    { digits: 13, digitsConverted: "thirteen" },
    { digits: 14, digitsConverted: "fourteen" },
    { digits: 15, digitsConverted: "fifteen" },
    { digits: 16, digitsConverted: "sixteen" },
    { digits: 17, digitsConverted: "seventeen" },
    { digits: 18, digitsConverted: "eighteen" },
    { digits: 19, digitsConverted: "nineteen" },
    { digits: 20, digitsConverted: "twenty" },
    { digits: 30, digitsConverted: "thirty" },
    { digits: 40, digitsConverted: "forty" },
    { digits: 50, digitsConverted: "fifty" },
    { digits: 60, digitsConverted: "sixty" },
    { digits: 70, digitsConverted: "seventy" },
    { digits: 80, digitsConverted: "eighty" },
    { digits: 90, digitsConverted: "ninety" },
    { digits: 100, digitsConverted: "hundred" },
  ],
};

const findConvertedNumberInData = (digits: number) => {
  return (
    data.digits.find((item) => item.digits === digits) as {
      digits: number;
      digitsConverted: string;
    }
  ).digitsConverted;
};

const convertOneDigit = (digit: number, zeroIncluded: boolean = true) => {
  // zeroIncluded - if we want to show zero or not (f.e. 2000)
  if (zeroIncluded || digit) return findConvertedNumberInData(digit);
  return "";
};

const convertTwoDigits = (digits: number) => {
  if (digits >= 11 && digits < 20) return findConvertedNumberInData(digits);
  if (digits.toString().length === 1) return convertOneDigit(digits, false);

  const digitsAsString = digits.toString();
  const firstDigit = +digitsAsString[0];
  const secondDigit = +digitsAsString[1];
  if (firstDigit === 0) return convertOneDigit(secondDigit, false);
  const result =
    findConvertedNumberInData(firstDigit * 10) +
    (!secondDigit ? "" : "-") +
    (secondDigit === 0 ? "" : convertOneDigit(secondDigit, false));
  return result;
};

const convertHundreds = (digits: number, ifHigher: boolean = false) => {
  // ifHigher - if we convert number >= 1000
  const digitsAsString = digits.toString();
  if (ifHigher && digits === 0) return "";
  if (digitsAsString.length === 1) return convertOneDigit(digits);
  if (digitsAsString.length === 2) return convertTwoDigits(digits);
  if (digitsAsString.length === 3) {
    const firstDigit = digitsAsString[0];
    const otherDigits = digitsAsString.slice(1);
    const otherDigitsConversionResult = convertTwoDigits(+otherDigits);
    const result =
      convertOneDigit(+firstDigit, false) +
      " hundred" +
      (otherDigitsConversionResult.length > 0 ? " and " : "") +
      otherDigitsConversionResult;
    return result;
  }
  return "";
};

const convertThousandBetween = (digits: number) => {
  // >=1000 && <=2000
  let digitsAsString = digits.toString();
  const firstPart = +digitsAsString.slice(0, 2);
  const secondPart = +digitsAsString.slice(2, 4);
  return convertTwoDigits(firstPart) + " " + convertTwoDigits(secondPart);
};

const convertThousands = (digits: number, isHigher = false) => {
  if (digits.toString()[2] !== "0" && digits > 1000 && digits < 2000)
    return convertThousandBetween(digits);
  const digitsAsString = digits.toString();
  const hundreds = digitsAsString.toString().slice(-3);
  const thousands = digitsAsString.slice(0, digits.toString().length - 3);
  const hundredsToString = convertHundreds(+hundreds, true);
  const thousandsToString = convertHundreds(+thousands);
  if (digits.toString().length < 4) return hundredsToString;
  return (
    thousandsToString +
    " thousand " +
    (Number(digitsAsString.slice(-3)) < 100 ? "and " : "") +
    hundredsToString
  );
};

const convertMillions = (digits: number) => {
  const digitsAsString = digits.toString();
  const millions = digitsAsString.slice(0, digits.toString().length - 6);
  const restDigits = digitsAsString.slice(digits.toString().length - 6);
  const restString = convertThousands(+restDigits, true);
  const millionsString = convertHundreds(+millions);
  if (restString) return millionsString + " million " + restString;
  return millionsString + " million";
};

export const showNumber = (numberasNumber: number) => {
  const numberasString = +numberasNumber;

  if (numberasNumber === 0) return "zero";

  if (numberasString.toString().length <= 3)
    return convertHundreds(numberasNumber);

  if (numberasString.toString().length <= 6)
    return convertThousands(numberasNumber);

  if (numberasString.toString().length <= 9)
    return convertMillions(numberasNumber);

  return "";
};
