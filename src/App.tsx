import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

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

function App() {
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [convertedNumber, setConvertedNumber] = useState("");

  const findConvertedNumberInData = (digits: number)=>{
    return (data.digits.find((item) => item.digits === digits) as {
      digits: number;
      digitsConverted: string;
    }).digitsConverted
  }

  const convertOneDigit = (digits: number, zeroIncluded: boolean = true)=>{
    if(zeroIncluded) return findConvertedNumberInData(digits)
    else return ""
  }

  const convertTwoDigits = (digits: number)=>{
    if(digits >= 11 && digits < 20) return findConvertedNumberInData(digits);
    
    const digitsAsString = digits.toString();
    const firstDigit = digitsAsString[0];
    const secondDigit = digitsAsString[1]; 
    let result : string
    result = findConvertedNumberInData(+firstDigit * 10)  + (+secondDigit === 0 ? "" : "-" + convertOneDigit(+secondDigit));
    return result
  }

  const convertThreeDigits = (digits: number)=>{
    const digitsAsString = digits.toString();
    const firstDigit = digitsAsString[0];
    const secondDigit = digitsAsString[1];
    const thirdDigit = digitsAsString[2];
    let result : string
    result = findConvertedNumberInData(+firstDigit * 10)
  }

  const showNumber = (numberasString: string | number) => {
    numberasString = (numberasString as string).trim();
    const numberasNumber = +numberasString;
    if (isNaN(numberasNumber)) return setError("Podaj liczbę");
    if(numberasNumber < 0 || Math.round(numberasNumber) !== numberasNumber){
      return setError("Not a proper number!")
    }

    if (numberasString.toString().length === 1)
      return setConvertedNumber(
       convertOneDigit(+numberasString)
      );

    if (numberasString.toString().length === 2){
      return setConvertedNumber(convertTwoDigits(numberasNumber))
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) {
      setError("");
    }
  };
  return (
    <div className="App">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={() => showNumber(inputValue)}>Convert number</button>
        {error && <p>{error}</p>}
        {convertedNumber && <div>Your number is {convertedNumber}</div>}
      </form>
    </div>
  );
}

export default App;
