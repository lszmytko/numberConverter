import React, { useState } from "react";
import "./App.css";
import { showNumber } from "./convertNumber";

function App() {
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [convertedNumber, setConvertedNumber] = useState("");

  const handleShowNumber = (numberasString: string | number) => {
    numberasString = (numberasString as string).trim();
    const numberasNumber = +numberasString;
    if (isNaN(numberasNumber) || !numberasString.length) {
      setConvertedNumber("");
      return setError("Please write a number");
    }
    if (numberasNumber < 0 || Math.round(numberasNumber) !== numberasNumber) {
      setConvertedNumber("");
      return setError("Not a proper number!");
    }
    if (numberasString.length > 9) setError("Numebr too big");
    setConvertedNumber(showNumber(numberasNumber));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError("");
    if (inputValue) setConvertedNumber("");
  };
  return (
    <div className="App">
      <div className="container">
        <form action="" onSubmit={(e) => e.preventDefault()} className="form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="form-input"
          />
          <button
            onClick={() => handleShowNumber(inputValue)}
            className="form-btn"
          >
            Convert number
          </button>
        </form>
        <div
          className="result"
          style={{
            color:
              convertedNumber.length && !error.length ? "black" : "#EEEEEE",
          }}
        >
          {convertedNumber ? convertedNumber : "Result here"}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
